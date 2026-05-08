'use client';

import { ROOMS, roomCenter } from '@/lib/rooms';
import { usePortfolioStore } from '@/lib/store';
import VoxelBlock from '../primitives/VoxelBlock';
import Interactable from '../primitives/Interactable';
import HoverGlow from '../primitives/HoverGlow';

const BOOK_COLORS = ['#FF9C8A', '#A7C796', '#BEE7F5', '#D8C7F0', '#F7B2C2', '#F4C18C', '#7B5E48'];

function Bookshelf({ position, scale = 1 }: { position: [number, number, number]; scale?: number }) {
  return (
    <group position={position} scale={[scale, scale, scale]}>
      {/* Frame */}
      <VoxelBlock position={[0, 1.6, 0]} size={[0.4, 3.2, 4.2]} color="#8B5A36" />
      <VoxelBlock position={[-0.05, 0.05, 0]} size={[0.5, 0.1, 4.4]} color="#5C4F66" />
      {/* Shelves */}
      {[0.7, 1.5, 2.3, 3.0].map((y, i) => (
        <VoxelBlock key={i} position={[-0.12, y, 0]} size={[0.3, 0.06, 4]} color="#7B5E48" />
      ))}
      {/* Books */}
      {[0.7, 1.5, 2.3].map((y, row) =>
        [-1.6, -1.2, -0.85, -0.5, -0.15, 0.2, 0.55, 0.9, 1.25, 1.55].map((z, col) => (
          <VoxelBlock
            key={`${row}-${col}`}
            position={[-0.1, y + 0.32, z]}
            size={[0.22, 0.55 + (col % 3) * 0.05, 0.32]}
            color={BOOK_COLORS[(row * 7 + col) % BOOK_COLORS.length]}
          />
        )),
      )}
    </group>
  );
}

export default function Library() {
  const room = ROOMS.library;
  const [cx, cz] = roomCenter(room);
  const open = usePortfolioStore((s) => s.openModal);

  return (
    <group position={[cx, 0, cz]}>
      {/* North wall bookshelves */}
      <group rotation={[0, Math.PI / 2, 0]}>
        <Bookshelf position={[6, 0, -4.5]} />
        <Bookshelf position={[6, 0, 4.5]} />
      </group>

      {/* South wall bookshelves */}
      <group rotation={[0, -Math.PI / 2, 0]}>
        <Bookshelf position={[-6, 0, -4.5]} />
        <Bookshelf position={[-6, 0, 4.5]} />
      </group>

      {/* Reading desk */}
      <group position={[0, 0, 0]}>
        <VoxelBlock position={[0, 0.95, 0]} size={[3, 0.2, 1.6]} color="#7B5E48" />
        <VoxelBlock position={[-1.3, 0.45, 0]} size={[0.2, 0.9, 1.4]} color="#5C4F66" />
        <VoxelBlock position={[1.3, 0.45, 0]} size={[0.2, 0.9, 1.4]} color="#5C4F66" />

        {/* Stack of papers — interactive */}
        <HoverGlow position={[0, 0.05, 0]} color="#F4C18C" radius={1.2} />
        <Interactable label="Articoli e Paper" onActivate={() => open('papers')}>
          <VoxelBlock position={[0, 1.1, -0.2]} size={[1.6, 0.1, 1.0]} color="#FFFCEF" />
          <VoxelBlock position={[0.05, 1.18, -0.15]} size={[1.5, 0.05, 0.9]} color="#FFF6E5" />
          <VoxelBlock position={[-0.1, 1.24, -0.2]} size={[1.4, 0.04, 0.85]} color="#FCD5DD" />
        </Interactable>

        {/* Lamp */}
        <VoxelBlock position={[1.0, 1.1, 0.4]} size={[0.15, 0.4, 0.15]} color="#5C4F66" />
        <VoxelBlock position={[1.0, 1.5, 0.4]} size={[0.5, 0.3, 0.5]} color="#FFE9C9" emissive="#FFE9C9" emissiveIntensity={0.6} />

        {/* Chair */}
        <group position={[0, 0, 1.5]}>
          <VoxelBlock position={[0, 0.5, 0]} size={[1.0, 0.15, 1.0]} color="#8B5A36" />
          <VoxelBlock position={[0, 0.25, 0]} size={[0.15, 0.5, 0.15]} color="#7B5E48" />
          <VoxelBlock position={[0, 1.1, 0.5]} size={[1.0, 1.2, 0.15]} color="#8B5A36" />
        </group>
      </group>

      {/* Globe in corner */}
      <group position={[5.2, 0, 5.2]}>
        <VoxelBlock position={[0, 0.6, 0]} size={[0.3, 1.2, 0.3]} color="#7B5E48" />
        <VoxelBlock position={[0, 1.6, 0]} size={[0.9, 0.9, 0.9]} color="#BEE7F5" />
        <VoxelBlock position={[0.4, 1.7, 0.1]} size={[0.2, 0.3, 0.2]} color="#A7C796" />
        <VoxelBlock position={[-0.3, 1.5, 0.3]} size={[0.3, 0.2, 0.2]} color="#A7C796" />
      </group>
    </group>
  );
}
