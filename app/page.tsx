'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import HUD from '@/components/ui/HUD';
import RoomMenu from '@/components/ui/RoomMenu';
import WelcomeOverlay from '@/components/ui/WelcomeOverlay';
import HelpPanel from '@/components/ui/HelpPanel';
import ContentModal from '@/components/ui/ContentModal';
import LoadingScreen from '@/components/ui/LoadingScreen';

// Three.js / R3F lives entirely on the client.
const Scene = dynamic(() => import('@/components/three/Scene'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function HomePage() {
  return (
    <main className="relative h-screen w-screen overflow-hidden">
      <Suspense fallback={<LoadingScreen />}>
        <Scene />
      </Suspense>

      {/* UI overlay — pointer-events targeted per-component */}
      <div className="pointer-events-none absolute inset-0 ui-chrome">
        <HUD />
        <RoomMenu />
        <HelpPanel />
        <ContentModal />
        <WelcomeOverlay />
      </div>
    </main>
  );
}
