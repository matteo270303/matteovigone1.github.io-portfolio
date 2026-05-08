'use client';

import { useEffect, useMemo, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useKeyboard } from '@/lib/useKeyboard';
import { usePortfolioStore } from '@/lib/store';
import { ROOMS, ROOM_LIST, roomAt, roomCenter } from '@/lib/rooms';
import { buildHouse, canStandAt } from '@/lib/houseGeometry';
import about from '@/content/about.json';
import VoxelBlock from './primitives/VoxelBlock';

const MOVE_SPEED = 6.5;
const PLAYER_RADIUS = 0.55;
const CAMERA_OFFSET = new THREE.Vector3(0, 16, 16);
const CAMERA_LOOK_AHEAD = 0;

interface PlayerProps {
  /** Whether player input is enabled (false when modals are open) */
  inputEnabled: boolean;
}

export default function Player({ inputEnabled }: PlayerProps) {
  const ref = useRef<THREE.Group>(null);
  const torsoRef = useRef<THREE.Group>(null);
  const leftLegRef = useRef<THREE.Group>(null);
  const rightLegRef = useRef<THREE.Group>(null);
  const leftArmRef = useRef<THREE.Group>(null);
  const rightArmRef = useRef<THREE.Group>(null);

  const { camera } = useThree();
  const setActiveRoom = usePortfolioStore((s) => s.setActiveRoom);
  const requestTeleport = usePortfolioStore((s) => s.requestTeleport);
  const teleportTarget = usePortfolioStore((s) => s.teleportTarget);
  const consumeTeleport = usePortfolioStore((s) => s.consumeTeleport);

  const colors = about.avatarColors;
  const housing = useMemo(() => buildHouse(), []);
  const lastRoom = useRef<string | null>(null);
  const animPhase = useRef(0);
  const targetYaw = useRef(0);

  const keys = useKeyboard((digit) => {
    const room = ROOM_LIST.find((r) => r.shortcut === digit);
    if (room) requestTeleport(room.id);
  });

  // Initial position: living room center.
  useEffect(() => {
    if (!ref.current) return;
    const [cx, cz] = roomCenter(ROOMS.living);
    ref.current.position.set(cx, 0, cz);
    setActiveRoom('living');
    // Camera setup
    camera.position.set(cx + CAMERA_OFFSET.x, CAMERA_OFFSET.y, cz + CAMERA_OFFSET.z);
    camera.lookAt(cx, 1.5, cz);
  }, [camera, setActiveRoom]);

  useFrame((state, delta) => {
    if (!ref.current) return;
    const k = keys.current;

    // --- Teleport ---
    if (teleportTarget) {
      const room = ROOMS[teleportTarget];
      const [tx, tz] = roomCenter(room);
      ref.current.position.set(tx, 0, tz);
      // Snap camera too, to avoid a long swoosh across the house
      camera.position.set(tx + CAMERA_OFFSET.x, CAMERA_OFFSET.y, tz + CAMERA_OFFSET.z);
      consumeTeleport();
    }

    // --- Movement ---
    let dx = 0;
    let dz = 0;
    if (inputEnabled) {
      if (k.forward) dz -= 1;
      if (k.backward) dz += 1;
      if (k.left) dx -= 1;
      if (k.right) dx += 1;
    }
    const moving = dx !== 0 || dz !== 0;
    if (moving) {
      const len = Math.hypot(dx, dz);
      dx /= len;
      dz /= len;
      const step = MOVE_SPEED * delta;
      const cur = ref.current.position;
      // Try X then Z separately for sliding along walls
      let nextX = cur.x + dx * step;
      let nextZ = cur.z + dz * step;
      if (
        canStandAt(nextX, cur.z, PLAYER_RADIUS, housing.collisions, housing.perimeter)
      ) {
        cur.x = nextX;
      }
      if (
        canStandAt(cur.x, nextZ, PLAYER_RADIUS, housing.collisions, housing.perimeter)
      ) {
        cur.z = nextZ;
      }
      targetYaw.current = Math.atan2(dx, dz);
      animPhase.current += delta * 10;
    } else {
      animPhase.current *= 1 - Math.min(1, delta * 5);
    }

    // Smooth yaw rotation
    const yaw = ref.current.rotation.y;
    let diff = targetYaw.current - yaw;
    while (diff > Math.PI) diff -= Math.PI * 2;
    while (diff < -Math.PI) diff += Math.PI * 2;
    ref.current.rotation.y = yaw + diff * Math.min(1, delta * 14);

    // Limb animation (walking)
    const swing = Math.sin(animPhase.current) * 0.55;
    if (leftLegRef.current) leftLegRef.current.rotation.x = swing;
    if (rightLegRef.current) rightLegRef.current.rotation.x = -swing;
    if (leftArmRef.current) leftArmRef.current.rotation.x = -swing * 0.7;
    if (rightArmRef.current) rightArmRef.current.rotation.x = swing * 0.7;

    // Body bob
    if (torsoRef.current) {
      torsoRef.current.position.y = moving ? Math.abs(Math.sin(animPhase.current * 1)) * 0.06 : 0;
    }

    // --- Active room detection ---
    const room = roomAt(ref.current.position.x, ref.current.position.z);
    if (room && room.id !== lastRoom.current) {
      lastRoom.current = room.id;
      setActiveRoom(room.id);
    }

    // --- Camera follow ---
    const targetCamX = ref.current.position.x + CAMERA_OFFSET.x;
    const targetCamY = CAMERA_OFFSET.y;
    const targetCamZ = ref.current.position.z + CAMERA_OFFSET.z;
    camera.position.x += (targetCamX - camera.position.x) * Math.min(1, delta * 6);
    camera.position.y += (targetCamY - camera.position.y) * Math.min(1, delta * 6);
    camera.position.z += (targetCamZ - camera.position.z) * Math.min(1, delta * 6);
    camera.lookAt(
      ref.current.position.x,
      1.4 + CAMERA_LOOK_AHEAD,
      ref.current.position.z,
    );

    // Reset edge-trigger flags
    keys.current.interactJustPressed = false;
  });

  return (
    <group ref={ref}>
      {/* Ground shadow */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <circleGeometry args={[0.75, 32]} />
        <meshBasicMaterial color="#000" transparent opacity={0.14} />
      </mesh>

      <group ref={torsoRef}>
        {/* Left leg */}
        <group position={[-0.22, 1.2, 0]} ref={leftLegRef}>
          <VoxelBlock position={[0, -0.5, 0]} size={[0.4, 1.0, 0.45]} color={colors.pants} />
          <VoxelBlock position={[0, -1.05, 0.06]} size={[0.44, 0.2, 0.58]} color="#2A1F2D" />
          <VoxelBlock position={[0, -1.17, 0.07]} size={[0.46, 0.06, 0.6]} color="#1A1220" />
        </group>

        {/* Right leg */}
        <group position={[0.22, 1.2, 0]} ref={rightLegRef}>
          <VoxelBlock position={[0, -0.5, 0]} size={[0.4, 1.0, 0.45]} color={colors.pants} />
          <VoxelBlock position={[0, -1.05, 0.06]} size={[0.44, 0.2, 0.58]} color="#2A1F2D" />
          <VoxelBlock position={[0, -1.17, 0.07]} size={[0.46, 0.06, 0.6]} color="#1A1220" />
        </group>

        {/* Torso */}
        <VoxelBlock position={[0, 1.85, 0]} size={[0.9, 1.1, 0.55]} color={colors.shirt} />
        {/* Belt */}
        <VoxelBlock position={[0, 1.3, 0]} size={[0.92, 0.18, 0.57]} color="#5C4F66" />
        {/* Belt buckle */}
        <VoxelBlock position={[0, 1.3, 0.3]} size={[0.14, 0.14, 0.06]} color="#D4A96A" />
        {/* Collar */}
        <VoxelBlock position={[0, 2.37, 0.3]} size={[0.48, 0.14, 0.12]} color="#FFFCEF" />

        {/* Neck */}
        <VoxelBlock position={[0, 2.47, 0]} size={[0.3, 0.2, 0.3]} color={colors.skin} />

        {/* Head */}
        <group position={[0, 2.82, 0]}>
          <VoxelBlock position={[0, 0, 0]} size={[0.85, 0.85, 0.85]} color={colors.skin} />
          {/* Ears */}
          <VoxelBlock position={[-0.46, 0.02, 0]} size={[0.1, 0.26, 0.26]} color={colors.skin} />
          <VoxelBlock position={[0.46, 0.02, 0]} size={[0.1, 0.26, 0.26]} color={colors.skin} />
          {/* Hair top */}
          <VoxelBlock position={[0, 0.46, 0]} size={[0.92, 0.28, 0.92]} color={colors.hair} />
          {/* Hair back */}
          <VoxelBlock position={[0, 0.08, -0.44]} size={[0.9, 0.72, 0.1]} color={colors.hair} />
          {/* Hair sides */}
          <VoxelBlock position={[-0.44, 0.08, 0.05]} size={[0.1, 0.62, 0.82]} color={colors.hair} />
          <VoxelBlock position={[0.44, 0.08, 0.05]} size={[0.1, 0.62, 0.82]} color={colors.hair} />
          {/* Eyebrows */}
          <VoxelBlock position={[-0.18, 0.2, 0.43]} size={[0.16, 0.06, 0.05]} color={colors.hair} />
          <VoxelBlock position={[0.18, 0.2, 0.43]} size={[0.16, 0.06, 0.05]} color={colors.hair} />
          {/* Eyes */}
          <VoxelBlock position={[-0.18, 0.05, 0.43]} size={[0.14, 0.14, 0.05]} color="#fff" />
          <VoxelBlock position={[-0.14, 0.09, 0.46]} size={[0.05, 0.05, 0.02]} color="#2A2233" />
          <VoxelBlock position={[0.18, 0.05, 0.43]} size={[0.14, 0.14, 0.05]} color="#fff" />
          <VoxelBlock position={[0.22, 0.09, 0.46]} size={[0.05, 0.05, 0.02]} color="#2A2233" />
          {/* Nose */}
          <VoxelBlock position={[0, -0.05, 0.44]} size={[0.1, 0.12, 0.06]} color="#E5A875" />
          {/* Mouth — smile */}
          <VoxelBlock position={[-0, -0.2, 0.43]} size={[0.2, 0.07, 0.05]} color="#ebb281" />
        </group>

        {/* Left arm */}
        <group position={[-0.62, 2.3, 0]} ref={leftArmRef}>
          <VoxelBlock position={[0, -0.4, 0]} size={[0.32, 0.8, 0.38]} color={colors.shirt} />
          <VoxelBlock position={[0, -0.88, 0]} size={[0.34, 0.16, 0.4]} color="#FFFCEF" />
          <VoxelBlock position={[0, -1.1, 0]} size={[0.3, 0.24, 0.36]} color={colors.skin} />
        </group>

        {/* Right arm */}
        <group position={[0.62, 2.3, 0]} ref={rightArmRef}>
          <VoxelBlock position={[0, -0.4, 0]} size={[0.32, 0.8, 0.38]} color={colors.shirt} />
          <VoxelBlock position={[0, -0.88, 0]} size={[0.34, 0.16, 0.4]} color="#FFFCEF" />
          <VoxelBlock position={[0, -1.1, 0]} size={[0.3, 0.24, 0.36]} color={colors.skin} />
        </group>
      </group>
    </group>
  );
}
