'use client';

import { usePortfolioStore } from '@/lib/store';
import { ROOM_LIST } from '@/lib/rooms';

/**
 * Vertical room list on the left edge of the viewport. Click a row to teleport.
 * Hidden on small screens where the minimap is the primary navigation.
 */
export default function RoomMenu() {
  const activeRoomId = usePortfolioStore((s) => s.activeRoom);
  const teleport = usePortfolioStore((s) => s.requestTeleport);
  const openModal = usePortfolioStore((s) => s.openModal);

  return (
    <div className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 flex-col gap-2 pointer-events-auto">
      {ROOM_LIST.map((room) => {
        const active = room.id === activeRoomId;
        return (
          <button
            key={room.id}
            onClick={() => teleport(room.id)}
            onDoubleClick={() => openModal(room.section)}
            title={`Vai a ${room.name} (tasto ${room.shortcut})`}
            className={[
              'panel-pixel flex items-center gap-2 px-3 py-2 transition-transform',
              active ? 'translate-x-1' : 'hover:translate-x-1',
            ].join(' ')}
            style={{ background: active ? room.color : '#FFF6E5' }}
          >
            <span className="title-pixel text-[9px] bg-ink text-cream px-1.5 py-0.5">
              {room.shortcut}
            </span>
            <span className="text-2xl leading-none">{room.icon}</span>
            <span className="flex flex-col items-start">
              <span className="title-pixel text-[10px]">{room.name}</span>
              <span className="text-sm text-cocoa">{room.subtitle}</span>
            </span>
          </button>
        );
      })}
    </div>
  );
}
