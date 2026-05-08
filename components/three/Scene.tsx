'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';
import { usePortfolioStore } from '@/lib/store';

import Sky from './Sky';
import Ground from './Ground';
import House from './House';
import Player from './Player';

import LivingRoom from './rooms/LivingRoom';
import Studio from './rooms/Studio';
import Library from './rooms/Library';
import Bedroom from './rooms/Bedroom';
import Kitchen from './rooms/Kitchen';
import Garden from './rooms/Garden';
import Bathroom from './rooms/Bathroom';
import Garage from './rooms/Garage';

/**
 * Top-level R3F Canvas. Builds the world and the player. Locks input while
 * a UI modal is open so keys don't leak through.
 */
export default function Scene() {
  const openSection = usePortfolioStore((s) => s.openSection);
  const showWelcome = usePortfolioStore((s) => s.showWelcome);
  const showHelp = usePortfolioStore((s) => s.showHelp);
  const inputEnabled = !openSection && !showWelcome && !showHelp;

  // Pixel-snap canvas size for crisp voxel look.
  return (
    <div className="absolute inset-0 bg-gradient-to-b from-[#BEE7F5] via-[#FCD5DD] to-[#FFE9C9]">
      <Canvas
        shadows
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          toneMapping: THREE.ACESFilmicToneMapping,
        }}
        camera={{
          fov: 35,
          near: 0.1,
          far: 500,
          position: [16, 16, 16],
        }}
        dpr={[1, 1.5]}
      >
        <SceneContents inputEnabled={inputEnabled} />
      </Canvas>
    </div>
  );
}

function SceneContents({ inputEnabled }: { inputEnabled: boolean }) {
  return (
    <>
      <color attach="background" args={['#FCD5DD']} />
      <fog attach="fog" args={['#FCD5DD', 60, 160]} />

      {/* Lights */}
      <ambientLight intensity={0.55} color="#FFE9C9" />
      <hemisphereLight intensity={0.4} color="#FFE9C9" groundColor="#A7C796" />
      <directionalLight
        position={[20, 30, 12]}
        intensity={1.0}
        color="#FFFCEF"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={120}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />

      <Suspense fallback={null}>
        <Sky />
        <Ground />
        <House />

        {/* Furnished rooms */}
        <LivingRoom />
        <Studio />
        <Library />
        <Bedroom />
        <Kitchen />
        <Garden />
        <Bathroom />
        <Garage />

        <Player inputEnabled={inputEnabled} />
      </Suspense>
    </>
  );
}
