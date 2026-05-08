'use client';

import hobbies from '@/content/hobbies.json';
import type { Hobby } from '@/types';

export default function HobbiesSection() {
  const list = hobbies as Hobby[];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {list.map((h) => (
        <div key={h.name} className="panel-pixel p-4 bg-cream flex gap-3">
          <div className="text-3xl select-none animate-bob">{h.icon}</div>
          <div>
            <div className="title-pixel text-[10px] mb-1">{h.name}</div>
            <p className="text-sm leading-relaxed">{h.description}</p>
          </div>
        </div>
      ))}
      <p className="sm:col-span-2 md:col-span-3 text-sm text-cocoa border-t-2 border-dashed border-cocoa pt-3 mt-1">
        Vibe extra: nascosti in casa ci sono diversi easter-egg. Trova il
        rubber duck 🦆 nel bagno!
      </p>
    </div>
  );
}
