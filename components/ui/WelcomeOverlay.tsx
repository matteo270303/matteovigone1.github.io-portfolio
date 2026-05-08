'use client';

import { usePortfolioStore } from '@/lib/store';

export default function WelcomeOverlay() {
  const show = usePortfolioStore((s) => s.showWelcome);
  const dismiss = usePortfolioStore((s) => s.dismissWelcome);
  if (!show) return null;

  return (
    <div className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-[rgba(42,34,51,0.55)] animate-fadeIn">
      <div className="panel-pixel max-w-md w-[92%] p-6 md:p-8 text-center">
        <div className="title-pixel text-[14px] md:text-[16px] mb-4">
          Benvenutə nel Voxel Portfolio
        </div>
        <p className="mb-3">
          Esplora una piccola casa fatta di stanze. Ogni stanza contiene una
          sezione del mio portfolio.
        </p>
        <div className="grid grid-cols-2 gap-2 my-4 text-sm">
          <KeyHint k="WASD / ↑↓←→">Movimento</KeyHint>
          <KeyHint k="1 - 8">Teletrasporto</KeyHint>
          <KeyHint k="Click">Apri oggetti</KeyHint>
          <KeyHint k="? / H">Aiuto</KeyHint>
        </div>
        <button className="btn-pixel mt-2" onClick={dismiss}>
          Inizia →
        </button>
      </div>
    </div>
  );
}

function KeyHint({ k, children }: { k: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2 justify-center">
      <span className="title-pixel text-[10px] bg-peach border-2 border-ink px-2 py-1">
        {k}
      </span>
      <span className="text-base">{children}</span>
    </div>
  );
}
