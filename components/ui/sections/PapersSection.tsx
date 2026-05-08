'use client';

import { useState } from 'react';
import papers from '@/content/papers.json';
import type { Paper } from '@/types';
import PdfViewer from '../PdfViewer';

export default function PapersSection() {
  const list = papers as Paper[];
  const [active, setActive] = useState(0);
  const current = list[active];

  return (
    <div className="flex flex-col gap-4">
      {/* List of papers */}
      <div className="flex flex-wrap gap-2">
        {list.map((p, i) => (
          <button
            key={p.title}
            onClick={() => setActive(i)}
            className={[
              'btn-pixel',
              i === active ? 'bg-peach' : 'bg-cream',
            ].join(' ')}
          >
            {p.year} · {p.title.length > 28 ? p.title.slice(0, 28) + '…' : p.title}
          </button>
        ))}
      </div>

      {current && (
        <article className="panel-pixel p-4 flex flex-col gap-3 bg-cream">
          <h3 className="title-pixel text-[12px]">{current.title}</h3>
          <div className="text-sm text-cocoa">
            <span>{current.authors.join(', ')}</span> ·{' '}
            <em>{current.venue}</em> · {current.year}
            {current.doi && (
              <>
                {' · '}
                <a
                  className="underline"
                  href={`https://doi.org/${current.doi}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  DOI
                </a>
              </>
            )}
          </div>
          <p className="leading-relaxed">{current.abstract}</p>

          {current.pdf ? (
            <PdfViewer src={current.pdf} title={current.title} />
          ) : (
            <div className="text-sm text-cocoa">
              Nessun PDF allegato. Carica il file in
              <code className="mx-1">/public/uploads/papers/</code>
              e aggiorna il campo <code>pdf</code> in
              <code className="mx-1">/content/papers.json</code>.
            </div>
          )}
        </article>
      )}
    </div>
  );
}
