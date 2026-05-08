'use client';

import { ROOMS, roomCenter } from '@/lib/rooms';
import { usePortfolioStore } from '@/lib/store';
import VoxelBlock from '../primitives/VoxelBlock';
import Interactable from '../primitives/Interactable';
import HoverGlow from '../primitives/HoverGlow';

export default function Bedroom() {
  const room = ROOMS.bedroom;
  const [cx, cz] = roomCenter(room);
  const open = usePortfolioStore((s) => s.openModal);

  return (
    <group position={[cx, 0, cz]}>
      {/* Bed against west wall */}
      <group position={[-5, 0, -4]}>
        {/* Frame */}
        <VoxelBlock position={[0, 0.4, 0]} size={[3, 0.5, 4.6]} color="#7B5E48" />
        {/* Mattress */}
        <VoxelBlock position={[0, 0.85, 0]} size={[2.8, 0.45, 4.4]} color="#FCD5DD" />
        {/* Sheets */}
        <VoxelBlock position={[0, 1.05, 0.3]} size={[2.7, 0.06, 3.4]} color="#FFFCEF" />
        {/* Pillow */}
        <VoxelBlock position={[0, 1.15, -1.7]} size={[2.4, 0.3, 0.8]} color="#FFFCEF" />
        {/* Headboard */}
        <VoxelBlock position={[0, 1.6, -2.35]} size={[3, 1.6, 0.25]} color="#8B5A36" />
        {/* Plushie */}
        <VoxelBlock position={[1, 1.4, -1.5]} size={[0.5, 0.5, 0.5]} color="#FF9C8A" />
        <VoxelBlock position={[1, 1.75, -1.5]} size={[0.4, 0.3, 0.4]} color="#FFD9B7" />
      </group>

      {/* Nightstand */}
      <group position={[-2.8, 0, -6]}>
        <VoxelBlock position={[0, 0.6, 0]} size={[1.2, 1.2, 1.2]} color="#7B5E48" />
        <VoxelBlock position={[0, 0.65, 0.61]} size={[0.2, 0.08, 0.04]} color="#FFD9B7" />

        {/* Notebook — interactive (notes) */}
        <HoverGlow position={[0, 1.25, 0]} color="#FF9C8A" radius={1.0} />
        <Interactable label="Appunti" onActivate={() => open('notes')}>
          <VoxelBlock position={[0, 1.3, 0]} size={[0.9, 0.12, 1.1]} color="#FF9C8A" />
          <VoxelBlock position={[0, 1.36, 0]} size={[0.85, 0.04, 1.05]} color="#FFFCEF" />
          <VoxelBlock position={[0, 1.4, 0]} size={[0.05, 0.04, 0.9]} color="#5C4F66" />
        </Interactable>
        {/* Pen */}
        <VoxelBlock position={[0.35, 1.32, 0.2]} size={[0.06, 0.06, 0.4]} color="#3D3346" />
      </group>

      {/* Wardrobe */}
      <group position={[5.2, 0, -6.55]} rotation={[0, -Math.PI / 2, 0]}>
        <VoxelBlock position={[0, 1.7, 0]} size={[0.5, 3.4, 2.4]} color="#8B5A36" />
        <VoxelBlock position={[-0.05, 1.7, -0.6]} size={[0.4, 3.2, 1]} color="#7B5E48" />
        <VoxelBlock position={[-0.05, 1.7, 0.6]} size={[0.4, 3.2, 1]} color="#7B5E48" />
        <VoxelBlock position={[-0.18, 1.7, -0.05]} size={[0.05, 0.18, 0.05]} color="#FFD9B7" />
        <VoxelBlock position={[-0.18, 1.7, 0.05]} size={[0.05, 0.18, 0.05]} color="#FFD9B7" />
      </group>

      {/* Rug */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0.5, 0.015, 1.5]}>
        <planeGeometry args={[5, 3.5]} />
        <meshBasicMaterial color="#F7B2C2" transparent opacity={0.7} />
      </mesh>

      
    </group>
  );
}
