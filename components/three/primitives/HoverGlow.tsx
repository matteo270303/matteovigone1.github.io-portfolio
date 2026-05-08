'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import type { Mesh } from 'three';

/**
 * A subtle pulsating glow ring drawn at ground level under interactive objects.
 * Helps players spot what is clickable.
 */
export default function HoverGlow({
  position,
  color = '#FFE9A0',
  radius = 0.9,
}: {
  position: [number, number, number];
  color?: string;
  radius?: number;
}) {
  const ref = useRef<Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    const s = 1 + Math.sin(state.clock.elapsedTime * 2.4) * 0.08;
    ref.current.scale.set(s, s, s);
  });
  return (
    <mesh ref={ref} rotation={[-Math.PI / 2, 0, 0]} position={position}>
      <ringGeometry args={[radius * 0.55, radius, 24]} />
      <meshBasicMaterial color={color} transparent opacity={0.55} />
    </mesh>
  );
}
