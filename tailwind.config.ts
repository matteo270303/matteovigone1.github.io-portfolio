import type { Config } from 'tailwindcss';

/**
 * Pastel cozy palette inspired by warm voxel art / cottagecore.
 * Used both by Tailwind classes and as CSS variables in the 3D scene.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './content/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'monospace'],
        body: ['"VT323"', 'monospace'],
      },
      colors: {
        cream: '#FFF6E5',
        peach: '#FFD9B7',
        coral: '#FF9C8A',
        sand: '#F4C18C',
        moss: '#A7C796',
        sage: '#C8E0B5',
        sky: '#BEE7F5',
        lavender: '#D8C7F0',
        rose: '#F7B2C2',
        cocoa: '#7B5E48',
        wood: '#C39060',
        woodDark: '#8B5A36',
        slate: '#3D3346',
        ink: '#2A2233',
      },
      boxShadow: {
        pixel: '4px 4px 0 0 rgba(42, 34, 51, 0.85)',
        pixelSm: '2px 2px 0 0 rgba(42, 34, 51, 0.85)',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        bob: 'bob 2s ease-in-out infinite',
        fadeIn: 'fadeIn 220ms ease-out both',
      },
    },
  },
  plugins: [],
};

export default config;
