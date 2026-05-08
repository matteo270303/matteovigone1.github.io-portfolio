'use client';

import { useMemo } from 'react';
import * as THREE from 'three';

/**
 * Big grass/sand voxel ground around the house. Built from a single procedural
 * texture that tiles naturally.
 */
export default function Ground() {
  const tex = useMemo(() => {
    const c = document.createElement('canvas');
    c.width = 64;
    c.height = 64;
    const ctx = c.getContext('2d')!;
    ctx.fillStyle = '#A7C796';
    ctx.fillRect(0, 0, 64, 64);
    // Random dark dots
    for (let i = 0; i < 200; i++) {
      ctx.fillStyle = Math.random() > 0.7 ? '#86B777' : '#C8E0B5';
      const x = Math.floor(Math.random() * 64);
      const y = Math.floor(Math.random() * 64);
      ctx.fillRect(x, y, 2, 2);
    }
    const t = new THREE.CanvasTexture(c);
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
    t.magFilter = THREE.NearestFilter;
    t.minFilter = THREE.NearestFilter;
    t.repeat.set(40, 40);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);

  return (
    <>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[400, 400]} />
        <meshLambertMaterial map={tex} />
      </mesh>

      {/* Soft path circle around house */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <ringGeometry args={[34, 38, 64]} />
        <meshBasicMaterial color="#C39060" transparent opacity={0.5} />
      </mesh>
    </>
  );
}
