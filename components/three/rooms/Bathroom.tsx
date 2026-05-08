'use client';

import { ROOMS, roomCenter } from '@/lib/rooms';
import { usePortfolioStore } from '@/lib/store';
import VoxelBlock from '../primitives/VoxelBlock';
import Interactable from '../primitives/Interactable';
import HoverGlow from '../primitives/HoverGlow';

export default function Bathroom() {
  const room = ROOMS.bathroom;
  const [cx, cz] = roomCenter(room);
  const open = usePortfolioStore((s) => s.openModal);

  return (
    <group position={[cx, 0, cz]}>
      {/* Bathtub */}
      <group position={[-5.5, 0, -4]}>
        <VoxelBlock position={[0, 0.55, 0]} size={[2.4, 1.1, 4.4]} color="#FFFCEF" />
        <VoxelBlock position={[0, 0.95, 0]} size={[2, 0.1, 4]} color="#BEE7F5" />
        <VoxelBlock position={[0, 0.05, 0]} size={[2.4, 0.1, 4.4]} color="#7BCBE0" />
        {/* Faucet */}
        <VoxelBlock position={[0, 1.4, -1.8]} size={[0.15, 0.8, 0.15]} color="#5C4F66" />
        <VoxelBlock position={[0, 1.65, -1.5]} size={[0.15, 0.15, 0.6]} color="#5C4F66" />
        {/* Rubber duck — easter egg */}
        <group position={[0, 0, 1.0]} rotation={[0, Math.PI / 2, 0]}>
          <VoxelBlock position={[0, 1.05, 0.2]} size={[0.45, 0.3, 0.6]} color="#FFE9C9" />
          <VoxelBlock position={[0, 1.3, 0.0]} size={[0.4, 0.3, 0.4]} color="#FFE9C9" />
          <VoxelBlock position={[0, 1.35, -0.22]} size={[0.18, 0.1, 0.2]} color="#FF9C8A" />
        </group>
        {/* Foam */}
        <VoxelBlock position={[-0.4, 1.05, -0.5]} size={[0.4, 0.1, 0.4]} color="#FFFCEF" />
        <VoxelBlock position={[0.5, 1.05, -1.0]} size={[0.3, 0.1, 0.3]} color="#FFFCEF" />
      </group>

      {/* Sink */}
      <group position={[5.5, 0, -6]}>
        <VoxelBlock position={[0, 0.85, 0]} size={[2, 1.7, 1.2]} color="#FFFCEF" />
        <VoxelBlock position={[0, 1.7, 0]} size={[2, 0.1, 1.2]} color="#BEE7F5" />
        <VoxelBlock position={[0, 1.78, -0.3]} size={[1.4, 0.05, 0.6]} color="#5C4F66" />
        <VoxelBlock position={[0, 2.0, -0.3]} size={[0.12, 0.4, 0.12]} color="#7BCBE0" />

        {/* Mirror — interactive (hobbies) */}
        <HoverGlow position={[0, 0.05, 0.4]} color="#BEE7F5" radius={1.2} />
        <Interactable label="Hobby" onActivate={() => open('hobbies')}>
          <VoxelBlock position={[0, 3.0, -0.55]} size={[1.6, 1.6, 0.15]} color="#5C4F66" />
          <VoxelBlock position={[0, 3.0, -0.4]} size={[1.5, 1.5, 0.05]} color="#BEE7F5" emissive="#BEE7F5" emissiveIntensity={0.4} />
          {/* Gleam */}
          <VoxelBlock position={[0.5, 3.4, -0.49]} size={[0.2, 0.4, 0.02]} color="#FFFCEF" />
        </Interactable>
      </group>

      {/* Toilet */}
      <group position={[-5.5, 0, -0.5]} rotation={[0, Math.PI /2, 0]}>
        <VoxelBlock position={[0, 0.4, 0]} size={[1.2, 0.8, 1.2]} color="#FFFCEF" />
        <VoxelBlock position={[0, 0.9, 0]} size={[1.4, 0.2, 1.5]} color="#FFF6E5" />
        <VoxelBlock position={[0, 1.5, -0.5]} size={[1.4, 1.2, 0.5]} color="#FFFCEF" />
      </group>

      {/* Tile floor pattern overlay */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <planeGeometry args={[10, 10, 10, 10]} />
        <meshBasicMaterial color="#D9F1F8" transparent opacity={0.3} />
      </mesh>
    </group>
  );
}
