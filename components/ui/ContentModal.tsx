'use client';

import { useEffect } from 'react';
import { usePortfolioStore } from '@/lib/store';
import { ROOM_LIST, ROOMS } from '@/lib/rooms';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import PapersSection from './sections/PapersSection';
import NotesSection from './sections/NotesSection';
import SkillsSection from './sections/SkillsSection';
import TimelineSection from './sections/TimelineSection';
import HobbiesSection from './sections/HobbiesSection';
import ExperimentsSection from './sections/ExperimentsSection';

const SECTIONS = {
  about: { component: AboutSection, title: 'Chi sono' },
  projects: { component: ProjectsSection, title: 'Progetti' },
  papers: { component: PapersSection, title: 'Articoli & Paper' },
  notes: { component: NotesSection, title: 'Appunti' },
  skills: { component: SkillsSection, title: 'Skills' },
  timeline: { component: TimelineSection, title: 'Timeline & Esperienze' },
  hobbies: { component: HobbiesSection, title: 'Hobby & Curiosità' },
  experiments: { component: ExperimentsSection, title: 'Esperimenti' },
} as const;

export default function ContentModal() {
  const open = usePortfolioStore((s) => s.openSection);
  const close = usePortfolioStore((s) => s.closeModal);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') close();
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [close]);

  if (!open) return null;
  const { component: Component, title } = SECTIONS[open];
  const room = ROOM_LIST.find((r) => r.section === open) ?? ROOMS.living;

  return (
    <div className="pointer-events-auto absolute inset-0 z-30 flex items-center justify-center bg-[rgba(42,34,51,0.55)] animate-fadeIn p-4 md:p-8">
      <div
        className="panel-pixel relative w-full max-w-3xl h-[88vh] md:h-[82vh] flex flex-col"
        style={{ background: '#FFF6E5' }}
      >
        {/* Header bar */}
        <div
          className="flex items-center justify-between px-5 py-3 border-b-2 border-ink"
          style={{ background: room.color }}
        >
          <div className="flex items-center gap-3">
            <span className="text-2xl leading-none">{room.icon}</span>
            <div>
              <div className="title-pixel text-[12px]">{title}</div>
              <div className="text-sm text-cocoa">
                Stanza: {room.name}
              </div>
            </div>
          </div>
          <button className="btn-pixel" onClick={close} aria-label="Chiudi">
            × Chiudi
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto scroll-pixel p-5 md:p-7">
          <Component />
        </div>
      </div>
    </div>
  );
}
