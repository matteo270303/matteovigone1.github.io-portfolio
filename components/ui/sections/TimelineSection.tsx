'use client';

import timeline from '@/content/timeline.json';
import type { TimelineEntry } from '@/types';

export default function TimelineSection() {
  const entries = timeline as TimelineEntry[];

  return (
    <div className="relative pl-8">
      <div className="absolute left-3 top-2 bottom-2 w-1 bg-cocoa" />
      <ul className="flex flex-col gap-5">
        {entries.map((e) => (
          <li key={e.year + e.role} className="relative">
            <span
              className="absolute -left-[26px] top-1 w-5 h-5 border-2 border-ink bg-coral"
              aria-hidden
            />
            <div className="flex flex-wrap items-baseline gap-2 mb-1">
              <span className="title-pixel text-[10px] bg-peach border-2 border-ink px-2 py-1">
                {e.year}
              </span>
              <span className="title-pixel text-[11px]">{e.role}</span>
              <span className="text-cocoa">@ {e.org}</span>
            </div>
            <p className="leading-relaxed">{e.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
