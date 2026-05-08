import type { RoomConfig, RoomId } from '@/types';

/**
 * House layout (top-down view, +X right, +Z forward):
 *
 *      x = 0          x = 1          x = 2          x = 3
 *  ┌──────────────┬──────────────┬──────────────┬──────────────┐
 *  │   GARDEN     │   KITCHEN    │   LIVING     │    STUDIO    │  z = 0
 *  │   giardino   │    cucina    │   soggiorno  │    studio    │
 *  ├──────────────┼──────────────┼──────────────┼──────────────┤
 *  │   BATHROOM   │   BEDROOM    │   LIBRARY    │    GARAGE    │  z = 1
 *  │    bagno     │    camera    │  biblioteca  │    garage    │
 *  └──────────────┴──────────────┴──────────────┴──────────────┘
 *
 * Each cell is ROOM_SIZE wide and deep. Walls are 1 unit thick, ROOM_HEIGHT tall.
 */

export const ROOM_SIZE = 14;
export const ROOM_HEIGHT = 5;
export const WALL_THICKNESS = 0.4;
export const DOOR_WIDTH = 4;
export const DOOR_HEIGHT = 4;

export const ROOMS: Record<RoomId, RoomConfig> = {
  garden: {
    id: 'garden',
    name: 'Giardino',
    subtitle: 'Esperienze & Timeline',
    section: 'timeline',
    shortcut: 1,
    color: '#A7C796',
    wallColor: '#C8E0B5',
    floorColor: '#86B777',
    gridX: 0,
    gridZ: 0,
    width: ROOM_SIZE,
    depth: ROOM_SIZE,
    doors: ['kitchen', 'bathroom'],
    icon: '🌿',
  },
  kitchen: {
    id: 'kitchen',
    name: 'Cucina',
    subtitle: 'Skills & Tech Stack',
    section: 'skills',
    shortcut: 2,
    color: '#FFD9B7',
    wallColor: '#FFE6CB',
    floorColor: '#E2A877',
    gridX: 1,
    gridZ: 0,
    width: ROOM_SIZE,
    depth: ROOM_SIZE,
    doors: ['garden', 'living', 'bedroom'],
    icon: '🍳',
  },
  living: {
    id: 'living',
    name: 'Soggiorno',
    subtitle: 'Chi sono',
    section: 'about',
    shortcut: 3,
    color: '#F7B2C2',
    wallColor: '#FCD5DD',
    floorColor: '#C39060',
    gridX: 2,
    gridZ: 0,
    width: ROOM_SIZE,
    depth: ROOM_SIZE,
    doors: ['kitchen', 'studio', 'library'],
    icon: '🛋️',
  },
  studio: {
    id: 'studio',
    name: 'Studio',
    subtitle: 'Progetti',
    section: 'projects',
    shortcut: 4,
    color: '#D8C7F0',
    wallColor: '#EAD9F7',
    floorColor: '#8B5A36',
    gridX: 3,
    gridZ: 0,
    width: ROOM_SIZE,
    depth: ROOM_SIZE,
    doors: ['living', 'garage'],
    icon: '💻',
  },
  bathroom: {
    id: 'bathroom',
    name: 'Bagno',
    subtitle: 'Hobby & Curiosità',
    section: 'hobbies',
    shortcut: 5,
    color: '#BEE7F5',
    wallColor: '#D9F1F8',
    floorColor: '#7FBCD0',
    gridX: 0,
    gridZ: 1,
    width: ROOM_SIZE,
    depth: ROOM_SIZE,
    doors: ['garden', 'bedroom'],
    icon: '🛁',
  },
  bedroom: {
    id: 'bedroom',
    name: 'Camera',
    subtitle: 'Appunti',
    section: 'notes',
    shortcut: 6,
    color: '#FF9C8A',
    wallColor: '#FFC7BD',
    floorColor: '#C39060',
    gridX: 1,
    gridZ: 1,
    width: ROOM_SIZE,
    depth: ROOM_SIZE,
    doors: ['kitchen', 'bathroom', 'library'],
    icon: '🛏️',
  },
  library: {
    id: 'library',
    name: 'Biblioteca',
    subtitle: 'Articoli & Paper',
    section: 'papers',
    shortcut: 7,
    color: '#F4C18C',
    wallColor: '#FCDBB7',
    floorColor: '#8B5A36',
    gridX: 2,
    gridZ: 1,
    width: ROOM_SIZE,
    depth: ROOM_SIZE,
    doors: ['living', 'bedroom', 'garage'],
    icon: '📚',
  },
  garage: {
    id: 'garage',
    name: 'Garage',
    subtitle: 'Esperimenti & Lab',
    section: 'experiments',
    shortcut: 8,
    color: '#3D3346',
    wallColor: '#5C4F66',
    floorColor: '#2A2233',
    gridX: 3,
    gridZ: 1,
    width: ROOM_SIZE,
    depth: ROOM_SIZE,
    doors: ['studio', 'library'],
    icon: '🚗',
  },
};

export const ROOM_LIST: RoomConfig[] = Object.values(ROOMS).sort(
  (a, b) => a.shortcut - b.shortcut,
);

/** Convert top-down grid coords to world center coordinates (X,Z). */
export function roomCenter(room: RoomConfig): [number, number] {
  const totalCols = 4;
  const totalRows = 2;
  const offsetX = -((totalCols * ROOM_SIZE) / 2) + ROOM_SIZE / 2;
  const offsetZ = -((totalRows * ROOM_SIZE) / 2) + ROOM_SIZE / 2;
  return [offsetX + room.gridX * ROOM_SIZE, offsetZ + room.gridZ * ROOM_SIZE];
}

/** Returns the room a given world position falls into, or null. */
export function roomAt(x: number, z: number): RoomConfig | null {
  for (const room of ROOM_LIST) {
    const [cx, cz] = roomCenter(room);
    if (
      x >= cx - room.width / 2 &&
      x <= cx + room.width / 2 &&
      z >= cz - room.depth / 2 &&
      z <= cz + room.depth / 2
    ) {
      return room;
    }
  }
  return null;
}
