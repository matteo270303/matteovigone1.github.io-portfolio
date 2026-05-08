'use client';

import { ROOMS, roomCenter } from '@/lib/rooms';
import { usePortfolioStore } from '@/lib/store';
import VoxelBlock from '../primitives/VoxelBlock';
import Interactable from '../primitives/Interactable';
import HoverGlow from '../primitives/HoverGlow';

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <VoxelBlock position={[0, 1, 0]} size={[0.7, 2, 0.7]} color="#7B5E48" />
      <VoxelBlock position={[0, 2.6, 0]} size={[2.4, 1.5, 2.4]} color="#86B777" />
      <VoxelBlock position={[0, 3.6, 0]} size={[1.6, 0.9, 1.6]} color="#A7C796" />
    </group>
  );
}

function Flower({ position, color }: { position: [number, number, number]; color: string }) {
  return (
    <group position={position}>
      <VoxelBlock position={[0, 0.2, 0]} size={[0.1, 0.4, 0.1]} color="#86B777" />
      <VoxelBlock position={[0, 0.55, 0]} size={[0.35, 0.1, 0.35]} color={color} />
      <VoxelBlock position={[0, 0.6, 0]} size={[0.15, 0.1, 0.15]} color="#FFE9C9" />
    </group>
  );
}

export default function Garden() {
  const room = ROOMS.garden;
  const [cx, cz] = roomCenter(room);
  const open = usePortfolioStore((s) => s.openModal);

  return (
    <group position={[cx, 0, cz]}>
      {/* Replace floor with grass tone (already moss color but add patches) */}
      <Tree position={[-4, 0, -4]} />
      <Tree position={[4, 0, -4.5]} />
      <Tree position={[-4.5, 0, 4]} />

      <Flower position={[-2, 0, -2]} color="#FF9C8A" />
      <Flower position={[-1.4, 0, -2.5]} color="#F7B2C2" />
      <Flower position={[2.5, 0, 2]} color="#D8C7F0" />
      <Flower position={[3.2, 0, 2.4]} color="#FF9C8A" />
      <Flower position={[2.8, 0, 1.6]} color="#FFE9C9" />

      {/* Stone path leading to a sundial */}
      {[
        [0, -4],
        [0, -2.5],
        [0, -1],
        [0, 0.5],
        [0, 2],
      ].map((p, i) => (
        <VoxelBlock
          key={i}
          position={[p[0], 0.06, p[1]]}
          size={[1, 0.1, 1]}
          color="#C8E0B5"
          flat
          receiveShadow
        />
      ))}

      {/* Sundial / timeline plinth — interactive (timeline) */}
      <group position={[0, 0, 4]}>
        <HoverGlow position={[0, 0.05, 0]} color="#A7C796" radius={1.6} />
        <Interactable label="Timeline & Esperienze" onActivate={() => open('timeline')}>
          <VoxelBlock position={[0, 0.5, 0]} size={[2, 1, 2]} color="#7B5E48" />
          <VoxelBlock position={[0, 1.1, 0]} size={[1.6, 0.2, 1.6]} color="#8B5A36" />
          <VoxelBlock position={[0, 1.55, 0]} size={[0.18, 0.7, 0.18]} color="#3D3346" />
          <VoxelBlock position={[0, 1.85, 0]} size={[0.05, 0.05, 1.4]} color="#FFE9C9" />
        </Interactable>
      </group>

      {/* Bench */}
      <group position={[3.5, 0, -1]}>
        <VoxelBlock position={[0, 0.6, 0]} size={[0.6, 0.2, 2]} color="#7B5E48" />
        <VoxelBlock position={[0, 1.0, -0.7]} size={[0.6, 0.6, 0.18]} color="#7B5E48" />
        <VoxelBlock position={[0, 0.3, -0.9]} size={[0.5, 0.6, 0.15]} color="#5C4F66" />
        <VoxelBlock position={[0, 0.3, 0.9]} size={[0.5, 0.6, 0.15]} color="#5C4F66" />
      </group>

      {/* Mailbox */}
      <group position={[-5, 0, 5]}>
        <VoxelBlock position={[0, 0.7, 0]} size={[0.15, 1.4, 0.15]} color="#3D3346" />
        <VoxelBlock position={[0, 1.5, 0]} size={[0.5, 0.4, 0.8]} color="#FF9C8A" />
        <VoxelBlock position={[0.3, 1.5, 0]} size={[0.05, 0.18, 0.18]} color="#FFE9C9" />
      </group>
    </group>
  );
}
