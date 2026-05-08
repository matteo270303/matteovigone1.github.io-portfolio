'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Cozy pastel sky: a large inverted sphere with a vertical gradient.
 * Plus a couple of fluffy voxel clouds.
 */
export default function Sky() {
  const gradient = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 4;
    canvas.height = 256;
    const ctx = canvas.getContext('2d')!;
    const grad = ctx.createLinearGradient(0, 0, 0, 256);
    grad.addColorStop(0, '#BEE7F5');
    grad.addColorStop(0.5, '#FCD5DD');
    grad.addColorStop(1, '#FFE9C9');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 4, 256);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);

  return (
    <>
      <mesh scale={[1, 1, 1]}>
        <sphereGeometry args={[200, 32, 16]} />
        <meshBasicMaterial map={gradient} side={THREE.BackSide} />
      </mesh>

      {/* Voxel clouds (just decorative, behind the action) */}
      <Cloud position={[-30, 22, -40]} />
      <Cloud position={[35, 28, -55]} />
      <Cloud position={[10, 24, 60]} />
      <Cloud position={[-45, 26, 35]} />
    </>
  );
}

function Cloud({ position }: { position: [number, number, number] }) {
  const blocks: [number, number, number][] = [
    [0, 0, 0],
    [2, 0, 0],
    [-2, 0, 0],
    [0, 0, 2],
    [2, 0, -1],
    [-1, 1, 0],
    [1, 1, 1],
  ];
  return (
    <group position={position}>
      {blocks.map((p, i) => (
        <mesh key={i} position={p}>
          <boxGeometry args={[2.6, 1.6, 2.6]} />
          <meshBasicMaterial color="#FFFCEF" />
        </mesh>
      ))}
    </group>
  );
}
