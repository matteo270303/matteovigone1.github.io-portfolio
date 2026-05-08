'use client';

import { usePortfolioStore } from '@/lib/store';
import { ROOMS } from '@/lib/rooms';
import Minimap from './Minimap';

export default function HUD() {
  const activeRoomId = usePortfolioStore((s) => s.activeRoom);
  const toggleHelp = usePortfolioStore((s) => s.toggleHelp);
  const openSection = usePortfolioStore((s) => s.openModal);
  const room = ROOMS[activeRoomId];

  return (
    <>
      {/* Top-center: room title */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 pointer-events-auto animate-fadeIn">
        <div className="panel-pixel px-4 py-2 flex items-center gap-3">
          <div className="text-2xl leading-none">{room.icon}</div>
          <div>
            <div className="title-pixel text-[11px]">
              {room.shortcut}. {room.name}
            </div>
            <div className="text-base leading-tight text-cocoa">
              {room.subtitle}
            </div>
          </div>
          <button
            className="btn-pixel ml-2"
            onClick={() => openSection(room.section)}
            title="Apri contenuto stanza"
          >
            Apri
          </button>
        </div>
      </div>

      {/* Top-right: minimap + help */}
      <div className="absolute top-4 right-4 pointer-events-auto flex flex-col items-end gap-3">
        <Minimap />
        <button
          className="btn-pixel"
          onClick={toggleHelp}
          aria-label="Mostra aiuto"
        >
          ? Aiuto
        </button>
      </div>

      {/* Bottom-left: control hints */}
      <div className="absolute bottom-4 left-4 pointer-events-none">
        <div className="panel-pixel px-3 py-2 flex flex-col gap-1 opacity-95">
          <ControlHint k="WASD" label="Movimento" />
          <ControlHint k="1-8" label="Teletrasporto" />
          <ControlHint k="Click" label="Interagisci" />
        </div>
      </div>
    </>
  );
}

function ControlHint({ k, label }: { k: string; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="title-pixel text-[9px] bg-peach border-2 border-ink px-1.5 py-1 min-w-[44px] text-center">
        {k}
      </span>
      <span className="text-base">{label}</span>
    </div>
  );
}
