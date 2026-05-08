/** Tailwind class merger – tiny implementation to avoid extra deps. */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(' ');
}

/** Clamp a number between min and max. */
export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

/** Lerp between a and b by t. */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

/** Resolve a path that lives in /public, accounting for basePath on GH Pages. */
export function asset(path: string): string {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || '';
  const clean = path.startsWith('/') ? path : `/${path}`;
  return `${base}${clean}`;
}
