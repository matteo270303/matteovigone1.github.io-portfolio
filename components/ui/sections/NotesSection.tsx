'use client';

import { useMemo, useState } from 'react';
import notes from '@/content/notes.json';
import type { Note } from '@/types';
import PdfViewer from '../PdfViewer';

export default function NotesSection() {
  const list = notes as Note[];
  const fields = useMemo(() => {
    const set = new Set(list.map((n) => n.field));
    return ['Tutti', ...Array.from(set)];
  }, [list]);
  const [filter, setFilter] = useState('Tutti');
  const [active, setActive] = useState(0);
  const filtered = filter === 'Tutti' ? list : list.filter((n) => n.field === filter);
  const safeIdx = Math.min(active, Math.max(0, filtered.length - 1));
  const current = filtered[safeIdx];

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-2">
        {fields.map((f) => (
          <button
            key={f}
            onClick={() => {
              setFilter(f);
              setActive(0);
            }}
            className={[
              'btn-pixel text-[10px]',
              f === filter ? 'bg-peach' : 'bg-cream',
            ].join(' ')}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {filtered.map((n, i) => (
          <button
            key={n.title}
            onClick={() => setActive(i)}
            className={[
              'panel-pixel p-3 text-left flex flex-col gap-1 transition',
              i === safeIdx ? 'bg-rose' : 'bg-cream',
            ].join(' ')}
          >
            <span className="title-pixel text-[9px]">{n.title}</span>
            <span className="text-sm text-cocoa">{n.field}</span>
          </button>
        ))}
      </div>

      {current && (
        <article className="panel-pixel p-4 flex flex-col gap-3 bg-cream">
          <div>
            <h3 className="title-pixel text-[12px]">{current.title}</h3>
            <div className="text-sm text-cocoa">{current.field}</div>
          </div>
          <p>{current.description}</p>
          {current.pdf && <PdfViewer src={current.pdf} title={current.title} />}
        </article>
      )}
    </div>
  );
}
