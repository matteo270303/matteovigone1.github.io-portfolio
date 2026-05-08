'use client';

import { ROOMS, roomCenter } from '@/lib/rooms';
import { usePortfolioStore } from '@/lib/store';
import VoxelBlock from '../primitives/VoxelBlock';
import Interactable from '../primitives/Interactable';
import HoverGlow from '../primitives/HoverGlow';

export default function LivingRoom() {
  const room = ROOMS.living;
  const [cx, cz] = roomCenter(room);
  const open = usePortfolioStore((s) => s.openModal);

  return (
    <group position={[cx, 0, cz]}>
      {/* Sofa (against west wall) */}
      <group position={[-5.5, 0, -4.5]}>
        <VoxelBlock position={[0, 0.7, 0]} size={[1.4, 1.4, 4.4]} color="#FF9C8A" />
        <VoxelBlock position={[-0.55, 1.4, 0]} size={[0.3, 1.4, 4.4]} color="#FF7E69" />
        <VoxelBlock position={[0.5, 1.45, -1.6]} size={[0.6, 0.6, 0.8]} color="#FCD5DD" />
        <VoxelBlock position={[0.5, 1.45, 1.6]} size={[0.6, 0.6, 0.8]} color="#FCD5DD" />
        {/* Legs */}
        <VoxelBlock position={[-0.4, 0.1, -2]} size={[0.2, 0.2, 0.2]} color="#5C4F66" />
        <VoxelBlock position={[0.4, 0.1, -2]} size={[0.2, 0.2, 0.2]} color="#5C4F66" />
        <VoxelBlock position={[-0.4, 0.1, 2]} size={[0.2, 0.2, 0.2]} color="#5C4F66" />
        <VoxelBlock position={[0.4, 0.1, 2]} size={[0.2, 0.2, 0.2]} color="#5C4F66" />
      </group>

      {/* Coffee table */}
      <group position={[-2.5, 0, -4.5]}>
        <VoxelBlock position={[0, 0.65, 0]} size={[1.4, 0.2, 2.4]} color="#7B5E48" />
        <VoxelBlock position={[-0.5, 0.3, -1]} size={[0.18, 0.6, 0.18]} color="#5C4F66" />
        <VoxelBlock position={[0.5, 0.3, -1]} size={[0.18, 0.6, 0.18]} color="#5C4F66" />
        <VoxelBlock position={[-0.5, 0.3, 1]} size={[0.18, 0.6, 0.18]} color="#5C4F66" />
        <VoxelBlock position={[0.5, 0.3, 1]} size={[0.18, 0.6, 0.18]} color="#5C4F66" />
        {/* Cup on table */}
        <VoxelBlock position={[0, 0.85, -0.6]} size={[0.25, 0.25, 0.25]} color="#FFFCEF" />
      </group>

      {/* Plant in corner */}
      <group position={[-5.8, 0, 3.5]}>
        <VoxelBlock position={[0, 0.5, 0]} size={[1, 1, 1]} color="#7B5E48" />
        <VoxelBlock position={[0, 1.6, 0]} size={[1.2, 1.4, 1.2]} color="#A7C796" />
        <VoxelBlock position={[0, 2.5, 0]} size={[0.8, 0.6, 0.8]} color="#86B777" />
      </group>

      {/* Lamp */}
      <group position={[5.5, 0, -5.2]}>
        <VoxelBlock position={[0, 0.1, 0]} size={[0.6, 0.2, 0.6]} color="#5C4F66" />
        <VoxelBlock position={[0, 1.3, 0]} size={[0.15, 2.4, 0.15]} color="#5C4F66" />
        <VoxelBlock position={[0, 2.7, 0]} size={[1, 0.8, 1]} color="#FFE9C9" emissive="#FFE9C9" emissiveIntensity={0.5} />
      </group>

      {/* TV & Stand — interactive (About me) */}
      <group position={[2.5, 1, -4.5]}>
        <HoverGlow position={[-1, 0.05, 0]} color="#FF9C8A" radius={1.4} />

        {/* TV Stand — corpo principale */}
        <VoxelBlock position={[-0.45, -0.2, 0]} size={[0.75, 1.6, 4.2]} color="#5C4033" flat receiveShadow />
        {/* Piano superiore leggermente sporgente */}
        <VoxelBlock position={[-0.44, 0.67, 0]} size={[0.78, 0.1, 4.4]} color="#7B5E48" flat />
        {/* Anta sinistra */}
        <VoxelBlock position={[-0.84, -0.2, -1.35]} size={[0.07, 1.5, 1.45]} color="#6B4F3A" flat />
        {/* Anta destra */}
        <VoxelBlock position={[-0.84, -0.2, 1.35]} size={[0.07, 1.5, 1.45]} color="#6B4F3A" flat />
        {/* Maniglie */}
        <VoxelBlock position={[-0.89, -0.2, -0.65]} size={[0.04, 0.14, 0.04]} color="#D4A96A" flat />
        <VoxelBlock position={[-0.89, -0.2, 0.65]} size={[0.04, 0.14, 0.04]} color="#D4A96A" flat />
        {/* Mensola centrale */}
        <VoxelBlock position={[-0.84, 0.15, 0]} size={[0.06, 0.05, 0.9]} color="#8B6B50" flat />

        {/* TV */}
        <Interactable label="Chi sono" onActivate={() => open('about')}>
          {/* Cornice/bezel */}
          <VoxelBlock position={[-0.6, 2.5, 0]} size={[0.2, 2.8, 4.0]} color="#111111" />
          {/* Schermo — sporge leggermente dal bezel per essere visibile */}
          <VoxelBlock position={[-0.72, 2.5, 0]} size={[0.04, 2.4, 3.6]} color="#0D0D1A" emissive="#1A1A3E" emissiveIntensity={0.4} />
          {/* Contenuto — foto placeholder */}
          <VoxelBlock position={[-0.75, 2.8, 0]} size={[0.02, 1.0, 1.0]} color="#FFD9B7" />
          <VoxelBlock position={[-0.75, 2.0, 0]} size={[0.02, 0.4, 2.2]} color="#F7B2C2" />
          {/* Fascia inferiore (chin) */}
          <VoxelBlock position={[-0.65, 1.2, 0]} size={[0.12, 0.2, 3.8]} color="#1A1A1A" />
          {/* LED power */}
          <VoxelBlock position={[-0.71, 1.2, 1.85]} size={[0.04, 0.07, 0.1]} color="#22EE88" emissive="#22EE88" emissiveIntensity={1.0} />
        </Interactable>
      </group>

      {/* Carpet stripe */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.015, 0]}>
        <planeGeometry args={[5, 3]} />
        <meshBasicMaterial color="#F4C18C" transparent opacity={0.6} />
      </mesh>
    </group>
  );
}
