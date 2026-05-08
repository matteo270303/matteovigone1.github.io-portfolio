import {
  ROOMS,
  ROOM_LIST,
  ROOM_SIZE,
  ROOM_HEIGHT,
  WALL_THICKNESS,
  DOOR_WIDTH,
  DOOR_HEIGHT,
  roomCenter,
} from './rooms';
import type { RoomId } from '@/types';

const COLS = 4;
const ROWS = 2;

export interface WallSegment {
  /** World center X */
  x: number;
  /** World center Z */
  z: number;
  /** Y center is height/2 */
  width: number;
  depth: number;
  height: number;
  color: string;
}

export interface CollisionAABB {
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export interface DoorMarker {
  /** Center of the doorway opening */
  x: number;
  z: number;
  /** 'x' = doorway extends along X (wall runs along X), 'z' = doorway along Z */
  axis: 'x' | 'z';
}

export interface HouseGeometry {
  walls: WallSegment[];
  /** Walls' top horizontal pieces (above doors) for visual coherence */
  doorHeaders: WallSegment[];
  collisions: CollisionAABB[];
  doors: DoorMarker[];
  /** AABBs of each room's floor (used for outer perimeter) */
  perimeter: CollisionAABB;
}

function getRoomAt(gx: number, gz: number): RoomId | null {
  for (const r of ROOM_LIST) if (r.gridX === gx && r.gridZ === gz) return r.id;
  return null;
}

function pickWallColor(a: RoomId | null, b: RoomId | null): string {
  // Prefer the lighter accent for the wall facing players
  if (a && b) return ROOMS[a].wallColor;
  return (a && ROOMS[a].wallColor) || (b && ROOMS[b].wallColor) || '#FFE6CB';
}

/**
 * Build the full house geometry: walls (with door cut-outs), collisions, and door markers.
 * Walls between two rooms are shared (single segment).
 */
export function buildHouse(): HouseGeometry {
  const walls: WallSegment[] = [];
  const doorHeaders: WallSegment[] = [];
  const collisions: CollisionAABB[] = [];
  const doors: DoorMarker[] = [];

  const offsetX = -((COLS * ROOM_SIZE) / 2);
  const offsetZ = -((ROWS * ROOM_SIZE) / 2);

  // ----- Horizontal walls (along X axis), at row boundaries -----
  for (let gx = 0; gx < COLS; gx++) {
    for (let gz = 0; gz <= ROWS; gz++) {
      const topRoom = gz > 0 ? getRoomAt(gx, gz - 1) : null;
      const bottomRoom = gz < ROWS ? getRoomAt(gx, gz) : null;
      if (!topRoom && !bottomRoom) continue;

      // Garden is open-air — remove its exterior walls
      if ((!topRoom && bottomRoom === 'garden') || (topRoom === 'garden' && !bottomRoom)) continue;

      const hasDoor =
        !!topRoom &&
        !!bottomRoom &&
        (ROOMS[topRoom].doors.includes(bottomRoom) ||
          ROOMS[bottomRoom].doors.includes(topRoom));

      const wx = offsetX + gx * ROOM_SIZE + ROOM_SIZE / 2;
      const wz = offsetZ + gz * ROOM_SIZE;
      const color = pickWallColor(topRoom, bottomRoom);

      if (hasDoor) {
        const segWidth = (ROOM_SIZE - DOOR_WIDTH) / 2;
        // Left segment
        walls.push({
          x: wx - DOOR_WIDTH / 2 - segWidth / 2,
          z: wz,
          width: segWidth,
          depth: WALL_THICKNESS,
          height: ROOM_HEIGHT,
          color,
        });
        collisions.push({
          minX: wx - ROOM_SIZE / 2,
          maxX: wx - DOOR_WIDTH / 2,
          minZ: wz - WALL_THICKNESS / 2,
          maxZ: wz + WALL_THICKNESS / 2,
        });
        // Right segment
        walls.push({
          x: wx + DOOR_WIDTH / 2 + segWidth / 2,
          z: wz,
          width: segWidth,
          depth: WALL_THICKNESS,
          height: ROOM_HEIGHT,
          color,
        });
        collisions.push({
          minX: wx + DOOR_WIDTH / 2,
          maxX: wx + ROOM_SIZE / 2,
          minZ: wz - WALL_THICKNESS / 2,
          maxZ: wz + WALL_THICKNESS / 2,
        });
        // Header above door
        doorHeaders.push({
          x: wx,
          z: wz,
          width: DOOR_WIDTH,
          depth: WALL_THICKNESS,
          height: ROOM_HEIGHT - DOOR_HEIGHT,
          color,
        });
        doors.push({ x: wx, z: wz, axis: 'x' });
      } else {
        walls.push({
          x: wx,
          z: wz,
          width: ROOM_SIZE,
          depth: WALL_THICKNESS,
          height: ROOM_HEIGHT,
          color,
        });
        collisions.push({
          minX: wx - ROOM_SIZE / 2,
          maxX: wx + ROOM_SIZE / 2,
          minZ: wz - WALL_THICKNESS / 2,
          maxZ: wz + WALL_THICKNESS / 2,
        });
      }
    }
  }

  // ----- Vertical walls (along Z axis), at column boundaries -----
  for (let gz = 0; gz < ROWS; gz++) {
    for (let gx = 0; gx <= COLS; gx++) {
      const leftRoom = gx > 0 ? getRoomAt(gx - 1, gz) : null;
      const rightRoom = gx < COLS ? getRoomAt(gx, gz) : null;
      if (!leftRoom && !rightRoom) continue;

      // Garden is open-air — remove its exterior walls
      if ((!leftRoom && rightRoom === 'garden') || (leftRoom === 'garden' && !rightRoom)) continue;

      const hasDoor =
        !!leftRoom &&
        !!rightRoom &&
        (ROOMS[leftRoom].doors.includes(rightRoom) ||
          ROOMS[rightRoom].doors.includes(leftRoom));

      const wx = offsetX + gx * ROOM_SIZE;
      const wz = offsetZ + gz * ROOM_SIZE + ROOM_SIZE / 2;
      const color = pickWallColor(leftRoom, rightRoom);

      if (hasDoor) {
        const segDepth = (ROOM_SIZE - DOOR_WIDTH) / 2;
        walls.push({
          x: wx,
          z: wz - DOOR_WIDTH / 2 - segDepth / 2,
          width: WALL_THICKNESS,
          depth: segDepth,
          height: ROOM_HEIGHT,
          color,
        });
        collisions.push({
          minX: wx - WALL_THICKNESS / 2,
          maxX: wx + WALL_THICKNESS / 2,
          minZ: wz - ROOM_SIZE / 2,
          maxZ: wz - DOOR_WIDTH / 2,
        });
        walls.push({
          x: wx,
          z: wz + DOOR_WIDTH / 2 + segDepth / 2,
          width: WALL_THICKNESS,
          depth: segDepth,
          height: ROOM_HEIGHT,
          color,
        });
        collisions.push({
          minX: wx - WALL_THICKNESS / 2,
          maxX: wx + WALL_THICKNESS / 2,
          minZ: wz + DOOR_WIDTH / 2,
          maxZ: wz + ROOM_SIZE / 2,
        });
        doorHeaders.push({
          x: wx,
          z: wz,
          width: WALL_THICKNESS,
          depth: DOOR_WIDTH,
          height: ROOM_HEIGHT - DOOR_HEIGHT,
          color,
        });
        doors.push({ x: wx, z: wz, axis: 'z' });
      } else {
        walls.push({
          x: wx,
          z: wz,
          width: WALL_THICKNESS,
          depth: ROOM_SIZE,
          height: ROOM_HEIGHT,
          color,
        });
        collisions.push({
          minX: wx - WALL_THICKNESS / 2,
          maxX: wx + WALL_THICKNESS / 2,
          minZ: wz - ROOM_SIZE / 2,
          maxZ: wz + ROOM_SIZE / 2,
        });
      }
    }
  }

  const perimeter: CollisionAABB = {
    minX: offsetX,
    maxX: offsetX + COLS * ROOM_SIZE,
    minZ: offsetZ,
    maxZ: offsetZ + ROWS * ROOM_SIZE,
  };

  return { walls, doorHeaders, collisions, doors, perimeter };
}

/** Test whether a circular agent of radius `r` can stand at (x,z) without intersecting walls. */
export function canStandAt(
  x: number,
  z: number,
  r: number,
  collisions: CollisionAABB[],
  perimeter?: CollisionAABB,
): boolean {
  // Keep the player inside the perimeter (slightly inset)
  if (perimeter) {
    const inset = 0.1;
    if (
      x - r < perimeter.minX + inset ||
      x + r > perimeter.maxX - inset ||
      z - r < perimeter.minZ + inset ||
      z + r > perimeter.maxZ - inset
    ) {
      return false;
    }
  }
  for (const aabb of collisions) {
    if (
      x + r > aabb.minX &&
      x - r < aabb.maxX &&
      z + r > aabb.minZ &&
      z - r < aabb.maxZ
    ) {
      return false;
    }
  }
  return true;
}

/** Returns center coordinate as a tuple, plus useful bounds. */
export function getRoomBounds(roomId: RoomId) {
  const room = ROOMS[roomId];
  const [cx, cz] = roomCenter(room);
  return {
    cx,
    cz,
    minX: cx - room.width / 2 + 0.6,
    maxX: cx + room.width / 2 - 0.6,
    minZ: cz - room.depth / 2 + 0.6,
    maxZ: cz + room.depth / 2 - 0.6,
  };
}
