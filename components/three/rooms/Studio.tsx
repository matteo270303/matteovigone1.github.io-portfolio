'use client';

import { ROOMS, roomCenter } from '@/lib/rooms';
import { usePortfolioStore } from '@/lib/store';
import VoxelBlock from '../primitives/VoxelBlock';
import Interactable from '../primitives/Interactable';
import HoverGlow from '../primitives/HoverGlow';

export default function Studio() {
  const room = ROOMS.studio;
  const [cx, cz] = roomCenter(room);
  const open = usePortfolioStore((s) => s.openModal);

  return (
    <group position={[cx, 0, cz]}>
      {/* Desk along north wall */}
      <group position={[0, 0, -6]}>
        <VoxelBlock position={[0, 0.95, 0]} size={[5, 0.2, 1.6]} color="#7B5E48" />
        <VoxelBlock position={[-2.3, 0.45, 0]} size={[0.3, 0.9, 1.4]} color="#5C4F66" />
        <VoxelBlock position={[2.3, 0.45, 0]} size={[0.3, 0.9, 1.4]} color="#5C4F66" />
        {/* Drawer */}
        <VoxelBlock position={[1.2, 0.65, 0]} size={[1.6, 0.4, 1.4]} color="#8B5A36" />
        <VoxelBlock position={[1.2, 0.65, 0.72]} size={[0.2, 0.08, 0.05]} color="#FFD9B7" />
      </group>

      {/* Computer monitor (interactive — projects) */}
      <group position={[0, 0, -6]}>
        <HoverGlow position={[-1.4, 0.05, 0]} color="#D8C7F0" radius={1.2} />
        <Interactable label="Progetti" onActivate={() => open('projects')}>
          <VoxelBlock position={[-1.4, 1.7, 0]} size={[1.6, 1.1, 0.15]} color="#3D3346" />
          <VoxelBlock position={[-1.4, 1.7, 0.08]} size={[1.4, 0.9, 0.04]} color="#BEE7F5" emissive="#BEE7F5" emissiveIntensity={0.4} />
          <VoxelBlock position={[-1.4, 1.05, 0]} size={[0.15, 0.3, 0.15]} color="#5C4F66" />
          <VoxelBlock position={[-1.4, 1.0, 0.05]} size={[0.7, 0.05, 0.4]} color="#5C4F66" />
        </Interactable>
        {/* Keyboard */}
        <VoxelBlock position={[-1.4, 1.06, 0.55]} size={[1.2, 0.1, 0.4]} color="#2A2233" />
        {/* Mouse */}
        <VoxelBlock position={[-0.4, 1.06, 0.55]} size={[0.3, 0.1, 0.4]} color="#5C4F66" />
        {/* Mug */}
        <VoxelBlock position={[1.5, 1.18, -0.2]} size={[0.4, 0.45, 0.4]} color="#FF9C8A" />
      </group>

      {/* Office chair */}
      <group position={[0, 0, -3.4]} rotation={[0, Math.PI, 0]}>
        <VoxelBlock position={[0, 0.05, 0]} size={[1.0, 0.1, 1.0]} color="#3D3346" />
        <VoxelBlock position={[0, 0.6, 0]} size={[0.1, 1.1, 0.1]} color="#5C4F66" />
        <VoxelBlock position={[0, 1.0, 0]} size={[1.1, 0.25, 0.9]} color="#3D3346" />
        <VoxelBlock position={[0, 1.7, -0.4]} size={[1.1, 1.4, 0.2]} color="#3D3346" />
      </group>

      {/* Bookshelf right wall */}
      <group position={[6, 0, -3]}>
        <VoxelBlock position={[0, 1.5, 0]} size={[0.4, 3, 4]} color="#8B5A36" />
        {[0.5, 1.5, 2.5].map((y, i) => (
          <VoxelBlock key={i} position={[-0.2, y, 0]} size={[0.4, 0.05, 4]} color="#7B5E48" />
        ))}
        {[-1.4, -0.4, 0.6, 1.6].map((z, i) => (
          <VoxelBlock key={i} position={[-0.15, 1, z]} size={[0.3, 0.7, 0.3]} color={['#FF9C8A', '#A7C796', '#BEE7F5', '#D8C7F0'][i]} />
        ))}
        {[-1.4, -0.4, 0.6].map((z, i) => (
          <VoxelBlock key={i} position={[-0.15, 2, z]} size={[0.3, 0.7, 0.3]} color={['#F7B2C2', '#F4C18C', '#A7C796'][i]} />
        ))}
      </group>

      {/* Poster on left wall */}
      <group position={[-6.7, 0, -4]}>
        <VoxelBlock position={[0, 3, 0]} size={[0.1, 1.6, 1.2]} color="#FFFCEF" />
        <VoxelBlock position={[0.05, 3.1, 0]} size={[0.05, 0.4, 1]} color="#FF9C8A" />
        <VoxelBlock position={[0.05, 2.7, 0]} size={[0.05, 0.4, 0.6]} color="#3D3346" />
      </group>
    </group>
  );
}
