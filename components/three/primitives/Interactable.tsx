'use client';

import { useRef, useState, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';

interface InteractableProps {
  /** Children may include any 3D primitive */
  children: ReactNode;
  /** Tooltip-style label shown above the object on hover */
  label?: string;
  onActivate: () => void;
  /** When true, a small bobbing animation is applied */
  bob?: boolean;
}

/**
 * Wraps any sub-tree to make it clickable / hoverable. Applies a hover
 * scale-up + subtle bobbing animation to draw the player's eye.
 */
export default function Interactable({
  children,
  onActivate,
  label,
  bob = true,
}: InteractableProps) {
  const ref = useRef<Group>(null);
  const [hovered, setHovered] = useState(false);
  const t = useRef(Math.random() * 10);

  useFrame((_, dt) => {
    t.current += dt;
    if (!ref.current) return;
    const target = hovered ? 1.08 : 1;
    ref.current.scale.x += (target - ref.current.scale.x) * Math.min(1, dt * 12);
    ref.current.scale.y += (target - ref.current.scale.y) * Math.min(1, dt * 12);
    ref.current.scale.z += (target - ref.current.scale.z) * Math.min(1, dt * 12);
    if (bob) {
      ref.current.position.y = Math.sin(t.current * 1.6) * 0.05;
    }
  });

  return (
    <group
      ref={ref}
      // NB: native DOM attributes like `aria-label` cannot be passed to Three.js
      // primitives because R3F treats hyphenated props as nested setters
      // (e.g. `shadow-mapSize-width` => `obj.shadow.mapSize.width`).
      userData={{ label }}
      onClick={(e) => {
        e.stopPropagation();
        onActivate();
      }}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
        document.body.style.cursor = 'pointer';
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHovered(false);
        document.body.style.cursor = '';
      }}
    >
      {children}
    </group>
  );
}
