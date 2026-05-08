'use client';

import about from '@/content/about.json';

export default function AboutSection() {
  const colors = about.avatarColors;

  return (
    <div className="flex flex-col gap-5">
      {/* Voxel-ish avatar (CSS only) */}
      <div className="flex flex-col md:flex-row items-center gap-5">
        <div className="shrink-0 grid grid-cols-3 grid-rows-5 gap-[2px] w-[120px] h-[200px]">
          {/* Hair row */}
          <span className="col-span-3" style={{ background: colors.hair }} />
          {/* Face row 1 */}
          <span style={{ background: colors.skin }} />
          <span style={{ background: colors.skin }} />
          <span style={{ background: colors.skin }} />
          {/* Face row 2 */}
          <span style={{ background: colors.skin }} />
          <span style={{ background: '#2A2233' }} />
          <span style={{ background: colors.skin }} />
          {/* Body */}
          <span style={{ background: colors.shirt }} />
          <span style={{ background: colors.shirt }} />
          <span style={{ background: colors.shirt }} />
          {/* Pants */}
          <span style={{ background: colors.pants }} />
          <span style={{ background: '#2A2233' }} />
          <span style={{ background: colors.pants }} />
        </div>
        <div className="flex-1">
          <h2 className="title-pixel text-[14px] mb-1">{about.name}</h2>
          <p className="text-cocoa mb-3">{about.tagline}</p>
          <div className="flex flex-wrap gap-2 text-sm">
            <Pill>📍 {about.location}</Pill>
            <Pill>
              ✉️ <a href={`mailto:${about.email}`}>{about.email}</a>
            </Pill>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3 leading-relaxed">
        {about.bio.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        {about.social.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noreferrer"
            className="btn-pixel"
          >
            {s.label} ↗
          </a>
        ))}
      </div>

      <div className="text-sm text-cocoa border-t-2 border-dashed border-cocoa pt-3 mt-3">
        Tip: i contenuti sono in <code>/content/about.json</code>. Modifica
        liberamente.
      </div>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="title-pixel text-[10px] bg-peach border-2 border-ink px-2 py-1">
      {children}
    </span>
  );
}
