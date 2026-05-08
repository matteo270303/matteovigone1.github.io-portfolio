/**
 * Next.js configuration tuned for static export to GitHub Pages.
 *
 * To deploy under https://<username>.github.io/<repo>/:
 *   - set the env var NEXT_PUBLIC_BASE_PATH to "/<repo>" before building.
 * To deploy at the root (e.g. <username>.github.io repo), leave NEXT_PUBLIC_BASE_PATH empty.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  reactStrictMode: true,
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true,
  },
  // Avoid SSR for three.js code paths; transpile drei for older toolchains.
  transpilePackages: ['three'],
};

export default nextConfig;
