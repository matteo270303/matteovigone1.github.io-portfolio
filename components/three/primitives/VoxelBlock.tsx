'use client';

import { forwardRef } from 'react';
import type { Mesh } from 'three';

interface VoxelBlockProps {
  position: [number, number, number];
  size?: [number, number, number];
  color: string;
  flat?: boolean;
  emissive?: string;
  emissiveIntensity?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
  onClick?: (event: React.PointerEvent) => void;
  onPointerOver?: (event: React.PointerEvent) => void;
  onPointerOut?: (event: React.PointerEvent) => void;
}

/**
 * Single voxel cuboid with a flat-shaded look. The default lighting
 * (lambert) gives a clean Minecraft-like vibe without per-pixel shading noise.
 */
const VoxelBlock = forwardRef<Mesh, VoxelBlockProps>(function VoxelBlock(
  {
    position,
    size = [1, 1, 1],
    color,
    flat = true,
    emissive,
    emissiveIntensity = 0.6,
    castShadow = true,
    receiveShadow = true,
    onClick,
    onPointerOver,
    onPointerOut,
  },
  ref,
) {
  return (
    <mesh
      ref={ref}
      position={position}
      castShadow={castShadow}
      receiveShadow={receiveShadow}
      onClick={onClick}
      onPointerOver={onPointerOver}
      onPointerOut={onPointerOut}
    >
      <boxGeometry args={size} />
      {flat ? (
        <meshLambertMaterial
          color={color}
          emissive={emissive ?? '#000'}
          emissiveIntensity={emissive ? emissiveIntensity : 0}
        />
      ) : (
        <meshStandardMaterial
          color={color}
          emissive={emissive ?? '#000'}
          emissiveIntensity={emissive ? emissiveIntensity : 0}
          roughness={0.85}
          metalness={0}
        />
      )}
    </mesh>
  );
});

export default VoxelBlock;
