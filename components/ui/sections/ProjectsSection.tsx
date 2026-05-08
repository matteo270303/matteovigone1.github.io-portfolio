'use client';

import projects from '@/content/projects.json';
import type { Project } from '@/types';
import { asset } from '@/lib/utils';

export default function ProjectsSection() {
  const items = projects as Project[];
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {items.map((p) => (
        <article
          key={p.title}
          className="panel-pixel p-4 flex flex-col gap-2 bg-cream"
        >
          {p.image && (
            <div className="w-full h-32 border-2 border-ink overflow-hidden bg-peach">
              <img
                src={asset(p.image)}
                alt=""
                className="w-full h-full object-cover"
                style={{ imageRendering: 'pixelated' }}
              />
            </div>
          )}
          <h3 className="title-pixel text-[11px]">{p.title}</h3>
          <p className="text-base">{p.summary}</p>
          <div className="flex flex-wrap gap-1">
            {p.tags.map((t) => (
              <span
                key={t}
                className="title-pixel text-[8px] bg-lavender border-2 border-ink px-1.5 py-0.5"
              >
                {t}
              </span>
            ))}
          </div>
          {p.link && (
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="btn-pixel self-start mt-1"
            >
              Vedi progetto ↗
            </a>
          )}
        </article>
      ))}
      <p className="md:col-span-2 text-sm text-cocoa border-t-2 border-dashed border-cocoa pt-3 mt-1">
        Aggiungi/modifica i progetti in <code>/content/projects.json</code>.
        Le immagini vanno in <code>/public/uploads/projects/</code>.
      </p>
    </div>
  );
}
