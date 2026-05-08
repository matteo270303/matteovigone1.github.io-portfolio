'use client';

import { ROOMS, roomCenter } from '@/lib/rooms';
import { usePortfolioStore } from '@/lib/store';
import VoxelBlock from '../primitives/VoxelBlock';
import Interactable from '../primitives/Interactable';
import HoverGlow from '../primitives/HoverGlow';

export default function Kitchen() {
  const room = ROOMS.kitchen;
  const [cx, cz] = roomCenter(room);
  const open = usePortfolioStore((s) => s.openModal);

  return (
    <group position={[cx, 0, cz]}>
      {/* Counter along north wall */}
      <group position={[0, 0, -5]}>
        <VoxelBlock position={[0, 0.5, 0]} size={[8, 1, 1.4]} color="#FCDBB7" />
        <VoxelBlock position={[0, 1.05, 0]} size={[8.05, 0.1, 1.45]} color="#7B5E48" />

        {/* Sink */}
        <VoxelBlock position={[-2.5, 1.0, 0]} size={[1.5, 0.1, 1.0]} color="#BEE7F5" />
        <VoxelBlock position={[-2.5, 1.3, -0.4]} size={[0.1, 0.55, 0.1]} color="#7BCBE0" />

        {/* Stove */}
        <VoxelBlock position={[2.5, 1.05, 0]} size={[1.5, 0.05, 1.2]} color="#3D3346" />
        {[
          [-0.4, -0.3],
          [0.4, -0.3],
          [-0.4, 0.3],
          [0.4, 0.3],
        ].map(([dx, dz], i) => (
          <VoxelBlock key={i} position={[2.5 + dx, 1.07, dz]} size={[0.5, 0.08, 0.5]} color="#5C4F66" />
        ))}

        {/* Pot on stove */}
        <VoxelBlock position={[2.5, 1.4, -0.3]} size={[0.6, 0.5, 0.6]} color="#7B5E48" />
        <VoxelBlock position={[2.5, 1.7, -0.3]} size={[0.7, 0.08, 0.7]} color="#5C4F66" />
      </group>

      {/* Recipe book on counter — interactive (skills) */}
      <group position={[-0.5, 0.1, -5]}>
        <HoverGlow position={[0, 1.1, 0]} color="#FFD9B7" radius={1.1} />
        <Interactable label="Skills" onActivate={() => open('skills')}>
          <VoxelBlock position={[0, 1.2, 0]} size={[1, 0.18, 1.4]} color="#A7C796" />
          <VoxelBlock position={[0, 1.3, 0]} size={[0.92, 0.04, 1.32]} color="#FFFCEF" />
          <VoxelBlock position={[0, 1.34, -0.3]} size={[0.5, 0.02, 0.5]} color="#FF9C8A" />
        </Interactable>
      </group>

      {/* Fridge */}
      <group position={[5, 0, -5]}>
        <VoxelBlock position={[0, 1.8, 0]} size={[1.5, 3.6, 1.4]} color="#FFFCEF" />
        <VoxelBlock position={[-0.05, 2.7, 0]} size={[1.5, 1.6, 1.45]} color="#FFF6E5" />
        <VoxelBlock position={[0.65, 2.7, 0.4]} size={[0.05, 0.4, 0.05]} color="#5C4F66" />
        <VoxelBlock position={[0.65, 1.0, 0.4]} size={[0.05, 0.4, 0.05]} color="#5C4F66" />
        {/* Magnets */}
        <VoxelBlock position={[-0.1, 3.4, 0.72]} size={[0.05, 0.2, 0.2]} color="#FF9C8A" />
        <VoxelBlock position={[-0.1, 3.4, 0.4]} size={[0.05, 0.2, 0.2]} color="#A7C796" />
      </group>

      {/* Dining table */}
      <group position={[2.5, 0, 2]}>
        <VoxelBlock position={[0, 1.0, 0]} size={[3, 0.2, 1.6]} color="#7B5E48" />
        <VoxelBlock position={[-1.3, 0.5, -0.6]} size={[0.18, 1, 0.18]} color="#5C4F66" />
        <VoxelBlock position={[1.3, 0.5, -0.6]} size={[0.18, 1, 0.18]} color="#5C4F66" />
        <VoxelBlock position={[-1.3, 0.5, 0.6]} size={[0.18, 1, 0.18]} color="#5C4F66" />
        <VoxelBlock position={[1.3, 0.5, 0.6]} size={[0.18, 1, 0.18]} color="#5C4F66" />
        {/* Plates */}
        <VoxelBlock position={[-0.7, 1.13, 0]} size={[0.6, 0.06, 0.6]} color="#FFFCEF" />
        <VoxelBlock position={[0.7, 1.13, 0]} size={[0.6, 0.06, 0.6]} color="#FFFCEF" />
        {/* Vase */}
        <VoxelBlock position={[0, 1.25, 0]} size={[0.3, 0.4, 0.3]} color="#FF9C8A" />
        <VoxelBlock position={[0, 1.55, 0]} size={[0.5, 0.3, 0.5]} color="#A7C796" />
      </group>

      {/* Pendant lamp */}
      <group position={[2.5, 0, 2]}>
        <VoxelBlock position={[0, 4.5, 0]} size={[0.05, 1, 0.05]} color="#3D3346" />
        <VoxelBlock position={[0, 3.9, 0]} size={[0.8, 0.4, 0.8]} color="#FFE9C9" emissive="#FFE9C9" emissiveIntensity={0.6} />
      </group>
    </group>
  );
}
