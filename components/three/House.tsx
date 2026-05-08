'use client';

import { useMemo } from 'react';
import {
  ROOMS,
  ROOM_LIST,
  ROOM_SIZE,
  ROOM_HEIGHT,
  roomCenter,
} from '@/lib/rooms';
import { buildHouse } from '@/lib/houseGeometry';
import VoxelBlock from './primitives/VoxelBlock';

/**
 * Renders the static house: floors per room, walls (with door cut-outs),
 * door headers, baseboards, and a small floor label per room.
 */
export default function House() {
  const geometry = useMemo(() => buildHouse(), []);

  return (
    <group>
      {/* Per-room floor */}
      {ROOM_LIST.map((room) => {
        const [cx, cz] = roomCenter(room);
        return (
          <group key={room.id}>
            {/* Floor */}
            <mesh
              position={[cx, 0, cz]}
              rotation={[-Math.PI / 2, 0, 0]}
              receiveShadow
            >
              <planeGeometry args={[room.width, room.depth]} />
              <meshLambertMaterial color={room.floorColor} />
            </mesh>

            {/* Floor accent rug under center */}
            <mesh
              position={[cx, 0.01, cz]}
              rotation={[-Math.PI / 2, 0, 0]}
              receiveShadow
            >
              <planeGeometry args={[room.width * 0.55, room.depth * 0.55]} />
              <meshBasicMaterial color={room.color} transparent opacity={0.45} />
            </mesh>

            {/* Floor label */}
            <FloorLabel
              text={`${room.shortcut}. ${room.name.toUpperCase()}`}
              position={[cx, 0.02, cz - room.depth / 2 + 1.6]}
              color={room.wallColor}
              accent={room.color}
            />
          </group>
        );
      })}

      {/* Walls */}
      {geometry.walls.map((w, i) => (
        <VoxelBlock
          key={`w${i}`}
          position={[w.x, w.height / 2, w.z]}
          size={[w.width, w.height, w.depth]}
          color={w.color}
          flat
          receiveShadow
        />
      ))}

      {/* Headers above doors */}
      {geometry.doorHeaders.map((w, i) => (
        <VoxelBlock
          key={`h${i}`}
          position={[w.x, ROOM_HEIGHT - w.height / 2, w.z]}
          size={[w.width, w.height, w.depth]}
          color={w.color}
          flat
          receiveShadow
        />
      ))}

      {/* Baseboards (darker stripe at bottom) */}
      {geometry.walls.map((w, i) => (
        <VoxelBlock
          key={`b${i}`}
          position={[w.x, 0.15, w.z]}
          size={[
            w.width + (w.width > w.depth ? 0.05 : 0.04),
            0.3,
            w.depth + (w.depth > w.width ? 0.05 : 0.04),
          ]}
          color="#7B5E48"
          flat
          receiveShadow
        />
      ))}

      {/* Door arches (decorative wooden frames around doors) */}
      {geometry.doors.map((d, i) => (
        <DoorArch key={`d${i}`} x={d.x} z={d.z} axis={d.axis} />
      ))}

      {/* Roof tiles per room (slightly transparent so we can still see inside in 3D) */}
      {ROOM_LIST.map((room) => {
        const [cx, cz] = roomCenter(room);
        return (
          <mesh
            key={`r-${room.id}`}
            position={[cx, ROOM_HEIGHT + 0.05, cz]}
            rotation={[-Math.PI / 2, 0, 0]}
            receiveShadow
          >
            <planeGeometry args={[room.width, room.depth]} />
            <meshBasicMaterial
              color={room.wallColor}
              transparent
              opacity={0.0}
            />
          </mesh>
        );
      })}
    </group>
  );
}

function DoorArch({ x, z, axis }: { x: number; z: number; axis: 'x' | 'z' }) {
  const wood = '#8B5A36';
  if (axis === 'x') {
    return (
      <group position={[x, 0, z]}>
        <VoxelBlock
          position={[-2.1, 2, 0]}
          size={[0.25, 4, 0.6]}
          color={wood}
        />
        <VoxelBlock
          position={[2.1, 2, 0]}
          size={[0.25, 4, 0.6]}
          color={wood}
        />
        <VoxelBlock
          position={[0, 4.05, 0]}
          size={[4.5, 0.25, 0.6]}
          color={wood}
        />
      </group>
    );
  }
  return (
    <group position={[x, 0, z]}>
      <VoxelBlock
        position={[0, 2, -2.1]}
        size={[0.6, 4, 0.25]}
        color={wood}
      />
      <VoxelBlock
        position={[0, 2, 2.1]}
        size={[0.6, 4, 0.25]}
        color={wood}
      />
      <VoxelBlock
        position={[0, 4.05, 0]}
        size={[0.6, 0.25, 4.5]}
        color={wood}
      />
    </group>
  );
}

function FloorLabel({
  text,
  position,
  color,
  accent,
}: {
  text: string;
  position: [number, number, number];
  color: string;
  accent: string;
}) {
  // Tiny voxel "rug" with accent stripe — used as a visual cue on the floor.
  return (
    <group position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[3, 0.6]} />
        <meshBasicMaterial color={color} transparent opacity={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <planeGeometry args={[2.7, 0.18]} />
        <meshBasicMaterial color={accent} />
      </mesh>
    </group>
  );
}
