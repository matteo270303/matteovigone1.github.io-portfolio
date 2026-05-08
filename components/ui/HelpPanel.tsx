'use client';

import { usePortfolioStore } from '@/lib/store';

export default function HelpPanel() {
  const show = usePortfolioStore((s) => s.showHelp);
  const toggle = usePortfolioStore((s) => s.toggleHelp);
  if (!show) return null;

  return (
    <div className="pointer-events-auto absolute inset-0 flex items-center justify-center bg-[rgba(42,34,51,0.45)] animate-fadeIn">
      <div className="panel-pixel max-w-lg w-[92%] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="title-pixel text-[12px]">Come si gioca</div>
          <button className="btn-pixel" onClick={toggle}>×</button>
        </div>
        <ul className="grid grid-cols-1 gap-2 text-base">
          <li>
            <Key>W / A / S / D</Key> oppure le frecce direzionali per camminare
            tra le stanze.
          </li>
          <li>
            <Key>1 - 8</Key> teletrasportano l&apos;omino in una stanza specifica.
          </li>
          <li>
            <Key>Click</Key> sugli oggetti che <em>brillano</em> (alone giallo
            sotto) per aprire il contenuto della sezione.
          </li>
          <li>
            <Key>Doppio click</Key> sulla minimappa o sulla lista a sinistra per
            teletrasportarsi <em>e</em> aprire la sezione subito.
          </li>
          <li>
            <Key>Esc</Key> chiude i pannelli aperti.
          </li>
        </ul>
        <div className="mt-4 text-sm text-cocoa">
          Hai trovato l&apos;easter-egg in bagno? 🦆
        </div>
      </div>
    </div>
  );
}

function Key({ children }: { children: React.ReactNode }) {
  return (
    <span className="title-pixel text-[10px] bg-peach border-2 border-ink px-2 py-1 mr-2">
      {children}
    </span>
  );
}
