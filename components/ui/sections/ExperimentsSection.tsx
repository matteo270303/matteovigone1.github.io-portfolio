'use client';

import experiments from '@/content/experiments.json';
import type { Experiment } from '@/types';

const STATUS_LABEL: Record<Experiment['status'], { text: string; bg: string }> = {
  'in-progress': { text: 'IN CORSO', bg: '#A7C796' },
  completed: { text: 'COMPLETO', bg: '#BEE7F5' },
  archived: { text: 'ARCHIVIATO', bg: '#D8C7F0' },
};

export default function ExperimentsSection() {
  const list = experiments as Experiment[];
  return (
    <div className="flex flex-col gap-3">
      {list.map((e) => {
        const status = STATUS_LABEL[e.status];
        return (
          <article
            key={e.title}
            className="panel-pixel p-4 bg-cream flex flex-col md:flex-row md:items-start gap-3"
          >
            <span
              className="title-pixel text-[8px] border-2 border-ink px-2 py-1 self-start"
              style={{ background: status.bg }}
            >
              {status.text}
            </span>
            <div className="flex-1">
              <h3 className="title-pixel text-[11px] mb-1">{e.title}</h3>
              <p className="text-base">{e.summary}</p>
            </div>
            {e.link && (
              <a
                href={e.link}
                target="_blank"
                rel="noreferrer"
                className="btn-pixel self-start"
              >
                Apri ↗
              </a>
            )}
          </article>
        );
      })}
    </div>
  );
}
