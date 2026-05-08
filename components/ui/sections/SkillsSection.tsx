'use client';

import skills from '@/content/skills.json';
import type { SkillGroup } from '@/types';

export default function SkillsSection() {
  const groups = skills as SkillGroup[];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {groups.map((g) => (
        <section key={g.category} className="panel-pixel p-4 bg-cream">
          <h3 className="title-pixel text-[11px] mb-3">{g.category}</h3>
          <ul className="flex flex-col gap-2">
            {g.items.map((it) => (
              <li key={it.name}>
                <div className="flex items-baseline justify-between text-sm mb-1">
                  <span>{it.name}</span>
                  <span className="title-pixel text-[8px] text-cocoa">
                    {it.level} / 5
                  </span>
                </div>
                <div className="h-3 border-2 border-ink bg-peach">
                  <div
                    className="h-full bg-coral"
                    style={{ width: `${(it.level / 5) * 100}%` }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p className="md:col-span-2 text-sm text-cocoa border-t-2 border-dashed border-cocoa pt-3 mt-1">
        Modifica le competenze e i livelli (1-5) in
        <code className="mx-1">/content/skills.json</code>.
      </p>
    </div>
  );
}
