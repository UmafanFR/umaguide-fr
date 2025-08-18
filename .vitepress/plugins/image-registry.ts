type ImgObj = { src: string; sources?: Array<{ type: string; srcset: string }> };

const defaults = {
  squareicon: { width: 64, height: 64, sizes: '64px' },
  stand: { width: 256, height: 256, sizes: '(max-width: 480px) 256px, 384px' },
} as const;

const iconMapRaw = import.meta.glob('/.vitepress/assets/characters/square-icons/*.png', {
  eager: true,
  import: 'default',
  query: { preset: 'squareicon' },
}) as Record<string, ImgObj>;
const standMapRaw = import.meta.glob('/.vitepress/assets/characters/stand/*.png', {
  eager: true,
  import: 'default',
  query: { preset: 'stand' },
}) as Record<string, ImgObj>;

// Re-mapping to slug (filename)
function toSlug(path: string) {
  const fname = path.split('/').pop()!;
  return fname.replace(/\.(png|jpg|jpeg|webp|avif)$/i, '');
}

function remapBySlug(raw: Record<string, ImgObj>) {
  const out: Record<string, ImgObj> = {};
  for (const [k, v] of Object.entries(raw)) {
    const slug = toSlug(k);
    if (out[slug]) {
      console.warn(`[images] Duplicate slug "${slug}" for keys:`, k);
    }
    out[slug] = v;
  }
  return out;
}

export const iconBySlug = remapBySlug(iconMapRaw);
export const standBySlug = remapBySlug(standMapRaw);

export const maps = {
  squareicon: iconBySlug,
  stand: standBySlug,
} as const;

export type Kind = keyof typeof maps;

export function getImage(kind: Kind, slug: string) {
  return maps[kind][slug];
}

export function defaultsFor(kind: Kind) {
  return defaults[kind];
}
