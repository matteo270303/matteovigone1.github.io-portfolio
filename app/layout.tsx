import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Matteo Vigone · Portfolio 3D',
  description:
    'Un portfolio 3D voxel-style: esplora una piccola casa fatta di stanze, ognuna con una sezione del mio lavoro.',
  authors: [{ name: 'Matteo' }],
  openGraph: {
    title: 'Matteo Vigone · Portfolio 3D',
    description:
      'Esplora una casa voxel interattiva con progetti, paper, appunti e altro.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#FFD9B7',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it">
      <body>{children}</body>
    </html>
  );
}
