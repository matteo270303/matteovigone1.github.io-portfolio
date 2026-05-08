'use client';

import { ROOMS, roomCenter } from '@/lib/rooms';
import { usePortfolioStore } from '@/lib/store';
import VoxelBlock from '../primitives/VoxelBlock';
import Interactable from '../primitives/Interactable';
import HoverGlow from '../primitives/HoverGlow';

export default function Garage() {
  const room = ROOMS.garage;
  const [cx, cz] = roomCenter(room);
  const open = usePortfolioStore((s) => s.openModal);

  return (
    <group position={[cx, 0, cz]}>
      {/* Workbench (right/east wall) */}
      <group position={[6.0, 0, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <VoxelBlock position={[0, 0.95, 0]} size={[6, 0.2, 1.6]} color="#7B5E48" />
        <VoxelBlock position={[-2.7, 0.45, 0]} size={[0.3, 0.9, 1.4]} color="#3D3346" />
        <VoxelBlock position={[2.7, 0.45, 0]} size={[0.3, 0.9, 1.4]} color="#3D3346" />

        {/* Tool rack — interactive (experiments) */}
        <HoverGlow position={[0, 0.05, 0]} color="#FFE9A0" radius={1.3} />
        <Interactable label="Esperimenti" onActivate={() => open('experiments')}>
          <VoxelBlock position={[0, 2.3, -0.55]} size={[3.6, 1.2, 0.15]} color="#8b898c" />
          {/* Hanging tools */}
          <VoxelBlock position={[-1.2, 2.0, -0.4]} size={[0.15, 0.8, 0.15]} color="#A7C796" />
          <VoxelBlock position={[-1.2, 1.6, -0.4]} size={[0.5, 0.2, 0.2]} color="#7B5E48" />
          <VoxelBlock position={[-0.4, 2.0, -0.4]} size={[0.15, 0.8, 0.15]} color="#FF9C8A" />
          <VoxelBlock position={[0.4, 2.1, -0.4]} size={[0.7, 0.15, 0.15]} color="#FFE9A0" />
          <VoxelBlock position={[1.2, 1.9, -0.4]} size={[0.4, 0.5, 0.2]} color="#5C4F66" />
        </Interactable>

        {/* Items on bench */}
        <VoxelBlock position={[-2, 1.15, 0]} size={[0.6, 0.4, 0.6]} color="#3D3346" />
        <VoxelBlock position={[-1, 1.1, 0]} size={[0.4, 0.3, 0.6]} color="#FFE9A0" />
        <VoxelBlock position={[1, 1.1, 0]} size={[0.5, 0.3, 0.4]} color="#A7C796" />
        <VoxelBlock position={[2, 1.15, 0]} size={[0.6, 0.4, 0.5]} color="#5C4F66" />
      </group>

      {/* Old contraption / car */}
      <group position={[0, 0, 0]}>
        <VoxelBlock position={[0, 0.8, 0]} size={[3, 1.2, 4.4]} color="#FF9C8A" />
        <VoxelBlock position={[0, 1.6, 0.5]} size={[2.4, 0.8, 2.6]} color="#FCD5DD" />
        {/* Wheels */}
        <VoxelBlock position={[-1.4, 0.4, -1.5]} size={[0.4, 0.8, 0.8]} color="#3D3346" />
        <VoxelBlock position={[1.4, 0.4, -1.5]} size={[0.4, 0.8, 0.8]} color="#3D3346" />
        <VoxelBlock position={[-1.4, 0.4, 1.5]} size={[0.4, 0.8, 0.8]} color="#3D3346" />
        <VoxelBlock position={[1.4, 0.4, 1.5]} size={[0.4, 0.8, 0.8]} color="#3D3346" />
        {/* Headlights */}
        <VoxelBlock position={[-1.0, 0.9, -2.2]} size={[0.4, 0.4, 0.05]} color="#FFE9C9" emissive="#FFE9C9" emissiveIntensity={0.4} />
        <VoxelBlock position={[1.0, 0.9, -2.2]} size={[0.4, 0.4, 0.05]} color="#FFE9C9" emissive="#FFE9C9" emissiveIntensity={0.4} />
      </group>

      {/* Stacked crates */}
      <group position={[5, 0, 5]}>
        <VoxelBlock position={[0, 0.5, 0]} size={[1.2, 1, 1.2]} color="#7B5E48" />
        <VoxelBlock position={[0, 1.5, 0]} size={[1.2, 1, 1.2]} color="#8B5A36" />
        <VoxelBlock position={[1.2, 0.5, 0]} size={[1.2, 1, 1.2]} color="#7B5E48" />
      </group>

      {/* Hanging bulb */}
      <VoxelBlock position={[0, 4.4, -2]} size={[0.5, 0.3, 0.5]} color="#FFE9C9" emissive="#FFE9C9" emissiveIntensity={0.7} />
      <VoxelBlock position={[0, 4.7, -2]} size={[0.05, 0.6, 0.05]} color="#3D3346" />
    </group>
  );
}
