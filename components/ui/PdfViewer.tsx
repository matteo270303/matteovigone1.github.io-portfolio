'use client';

import { asset } from '@/lib/utils';

/**
 * Lightweight PDF viewer. Uses the browser's native PDF rendering via
 * `<iframe>` so it works perfectly with Next.js static export — no worker
 * scripts, no SSR issues, and fully accessible.
 */
export default function PdfViewer({
  src,
  title,
  height = 460,
}: {
  src: string;
  title: string;
  height?: number;
}) {
  const url = asset(src);
  return (
    <div className="flex flex-col gap-2">
      <iframe
        title={title}
        src={`${url}#zoom=page-fit`}
        className="w-full border-2 border-ink bg-cream"
        style={{ height }}
      />
      <div className="flex gap-2">
        <a className="btn-pixel" href={url} target="_blank" rel="noreferrer">
          Apri in tab
        </a>
        <a className="btn-pixel" href={url} download>
          Scarica PDF
        </a>
      </div>
    </div>
  );
}
