# Voxel Portfolio

Un portfolio 3D voxel-style costruito con **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** e **React Three Fiber**. Esplora una piccola casa con 8 stanze: ognuna contiene una sezione del portfolio (chi sono, progetti, paper, appunti, skills, timeline, hobby ed esperimenti).

> Stile: pastel cozy con palette calda. Ispirazione Minecraft + cottagecore. Niente texture esterne pesanti — tutto generato in voxel.

## Avvio in locale

```bash
# 1. Installare le dipendenze
npm install

# 2. Avviare il dev server
npm run dev

# Apri http://localhost:3000
```

Richiede Node.js 18+.

## Comandi principali

| Comando | Descrizione |
| --- | --- |
| `npm run dev` | Server di sviluppo con hot-reload |
| `npm run build` | Build di produzione + export statico in `out/` |
| `npm run lint` | Lint con ESLint (config Next) |

## Struttura del progetto

```
portfolio/
├── app/                # Next.js App Router (entry point)
├── components/
│   ├── three/          # Tutto il 3D (Scene, House, Player, rooms, primitives)
│   └── ui/             # HUD, modali, sezioni di contenuto, viewer PDF
├── content/            # JSON con i contenuti del portfolio (modificabili)
├── lib/                # Logica condivisa (rooms, store, geometria, hook)
├── public/uploads/     # Cartella per PDF, immagini, paper, appunti
└── types/              # Tipi TypeScript condivisi
```

## Modificare i contenuti

I contenuti sono in `/content/*.json`. Modifica liberamente:

| File | Stanza | Sezione |
| --- | --- | --- |
| `about.json` | Soggiorno | Chi sono, bio, social, palette dell'avatar |
| `projects.json` | Studio | Progetti realizzati |
| `papers.json` | Biblioteca | Paper / articoli pubblicati (con PDF) |
| `notes.json` | Camera | Appunti per materia (con PDF) |
| `skills.json` | Cucina | Tech stack e livelli (1-5) |
| `timeline.json` | Giardino | Esperienze e formazione |
| `hobbies.json` | Bagno | Interessi e curiosità |
| `experiments.json` | Garage | Prototipi e lab |

Per aggiungere PDF/immagini, mettili in `/public/uploads/<sottocartella>/` e referenzia il path con `/uploads/...` nei JSON.

## Personalizzare lo stile

Le palette sono definite in due posti che condividono i colori:

- `tailwind.config.ts` → utility CSS (`bg-coral`, `text-cocoa`, ecc.)
- `app/globals.css` → variabili CSS (`--color-coral`)

Le palette delle 8 stanze (colori muri/pavimenti/accent) sono in `lib/rooms.ts`.

## Comandi nel gioco

- **WASD** o **frecce direzionali** → movimento
- **1-8** → teletrasporto rapido a una stanza
- **Click** sugli oggetti che brillano → apre il contenuto della sezione
- **Doppio click** sulla minimappa o lista a sinistra → teletrasporto + apertura contenuto
- **Esc** → chiude i pannelli aperti
- **? / Aiuto** in alto a destra → mostra il pannello con tutti i comandi

## Deploy su GitHub Pages

Il progetto è già configurato per export statico (`output: 'export'` in `next.config.mjs`). Due scenari:

### A) Repository chiamato `<username>.github.io`

Il sito sarà servito alla root. Non serve impostare `NEXT_PUBLIC_BASE_PATH`.

```bash
npm run build      # genera la cartella out/
# Pubblica il contenuto di out/ sul branch gh-pages (oppure main / docs/)
```

### B) Repository qualunque (es. `voxel-portfolio`)

Il sito sarà servito su `https://<username>.github.io/voxel-portfolio/`.
Devi impostare il base path:

```bash
NEXT_PUBLIC_BASE_PATH=/voxel-portfolio npm run build
# Pubblica out/ sul branch gh-pages
```

> Il file `public/.nojekyll` è già incluso per evitare che GitHub Pages
> filtri le cartelle che iniziano con `_`.

### Esempio di workflow GitHub Actions

Crea `.github/workflows/deploy.yml` con:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: NEXT_PUBLIC_BASE_PATH=/${{ github.event.repository.name }} npm run build
      - uses: actions/upload-pages-artifact@v3
        with: { path: out }
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

## Licenza

MIT — usa, modifica, divertiti.
