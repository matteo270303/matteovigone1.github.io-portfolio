'use client';

import { usePortfolioStore } from '@/lib/store';
import { ROOM_LIST, ROOMS } from '@/lib/rooms';

const COLS = 4;
const ROWS = 2;

export default function Minimap() {
  const activeRoomId = usePortfolioStore((s) => s.activeRoom);
  const teleport = usePortfolioStore((s) => s.requestTeleport);

  return (
    <div className="panel-pixel p-2">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
          gridTemplateRows: `repeat(${ROWS}, 1fr)`,
        }}
      >
        {ROOM_LIST.sort((a, b) => a.gridZ * COLS + a.gridX - (b.gridZ * COLS + b.gridX)).map(
          (room) => {
            const active = room.id === activeRoomId;
            return (
              <button
                key={room.id}
                onClick={() => teleport(room.id)}
                title={`${room.name} – ${room.subtitle}`}
                className="relative w-12 h-12 border-2 border-ink flex items-center justify-center text-xl transition-all"
                style={{
                  background: active ? room.color : `${room.wallColor}`,
                  boxShadow: active ? '2px 2px 0 0 #2A2233' : 'inset 0 0 0 1px rgba(0,0,0,0.06)',
                }}
                aria-pressed={active}
              >
                <span aria-hidden>{room.icon}</span>
                <span
                  className="absolute -top-1.5 -left-1.5 title-pixel text-[8px] bg-ink text-cream px-1 py-0.5"
                >
                  {room.shortcut}
                </span>
              </button>
            );
          },
        )}
      </div>
      <div className="title-pixel text-[8px] mt-2 text-cocoa text-center">
        MINIMAPPA
      </div>
    </div>
  );
}
