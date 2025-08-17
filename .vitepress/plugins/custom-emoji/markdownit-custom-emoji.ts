import type MarkdownIt from 'markdown-it';
type RuleInline = (state: any, silent: boolean) => boolean;

// ------------------ Defaults ------------------
const DEFAULT_BASE_PUBLIC_PATH = '/assets/';
const DEFAULT_CLASS_NAME = 'custom-emoji';
const DEFAULT_MAX_NAME_LEN = 64;
const DEFAULT_ALLOWED_EXTS = ['svg', 'png', 'webp', 'gif'] as const;

export interface CustomEmojiOptions {
  /** Map { name -> filename } Required. */
  map: Record<string, string>;
  /** Prefix applied to the filename (public folder), e.g. "/assets/" */
  basePublicPath?: string; // default: "/assets/custom-emoji/"
  /** CSS class applied to <img> */
  className?: string; // default: "custom-emoji"
  /** Max length for the emoji name (between the colons) */
  maxNameLen?: number; // default: 64
  /** Whitelist of allowed extensions (without the dot). */
  allowedExts?: readonly string[]; // default: [svg, png, webp, gif]
}

function normalizeBase(base: string): string {
  return base.endsWith('/') ? base : base + '/';
}

function hasAllowedExtension(file: string, allowed: ReadonlyArray<string>): boolean {
  const idx = file.lastIndexOf('.');
  if (idx <= 0 || idx === file.length - 1) return false;
  const ext = file.slice(idx + 1).toLowerCase();
  return allowed.includes(ext);
}
// When ":" is found we check surrounded, we accept these characters
function isBoundary(ch: number | undefined): boolean {
  if (ch === undefined) return true;
  return (
    ch <= 0x20 || // espace/contrôles
    ch === 0x2d || // -
    ch === 0x21 || // !
    ch === 0x2c || // ,
    ch === 0x2e || // .
    ch === 0x3b || // ;
    ch === 0x3f || // ?
    ch === 0x28 ||
    ch === 0x29 || // ( )
    ch === 0x5b ||
    ch === 0x5d || // [ ]
    ch === 0x7b ||
    ch === 0x7d // { }
  );
}

function makeRule(
  map: Record<string, string>,
  opts: Required<Omit<CustomEmojiOptions, 'map'>>
): RuleInline {
  // Build Emotes
  const lowerMap = Object.fromEntries(Object.entries(map).map(([k, v]) => [k.toLowerCase(), v]));

  // Allowing characters for emotes
  const NAME_RE = /^[A-Za-z0-9+_-]{1,64}$/;

  return function (state, silent) {
    const src = state.src;
    let pos = state.pos;
    const max = state.posMax;

    // Start with ":"
    if (src.charCodeAt(pos) !== 0x3a) return false;

    // Checking left ":" Boundaries
    const prevCh = pos > 0 ? src.charCodeAt(pos - 1) : undefined;
    if (!isBoundary(prevCh)) return false;

    const nameStart = pos + 1;
    if (nameStart >= max) return false;

    // Scan next ":"
    let end = nameStart;
    let found = false;
    while (end < max) {
      if (src.charCodeAt(end) === 0x3a) {
        found = true;
        break;
      }
      end++;
    }
    if (!found) return false;

    const rawName = src.slice(nameStart, end);
    if (!NAME_RE.test(rawName) || rawName.length > opts.maxNameLen) return false;

    // Checking right enclosing ":" Boundary
    const nextCh = end + 1 < max ? src.charCodeAt(end + 1) : undefined;
    if (!isBoundary(nextCh)) return false;

    const name = rawName.toLowerCase();
    const file = lowerMap[name];
    if (!file) return false;

    if (!hasAllowedExtension(file, opts.allowedExts)) return false;

    if (!silent) {
      const token = state.push('custom_emoji', '', 0);
      token.attrSet('src', `${opts.basePublicPath}${file}`);
      token.attrSet('alt', `:${name}:`);
      token.attrSet('title', `${name}`);
      token.attrSet('class', opts.className + ' ' + name);
      token.attrSet('draggable', 'false');
      token.attrSet('loading', 'lazy');
      token.attrSet('decoding', 'async');
      token.content = name;
    }

    // We continue to find others emotes
    state.pos = end + 1;
    return true;
  };
}

export default function markdownItCustomEmoji(md: MarkdownIt, options: CustomEmojiOptions): void {
  const map = options?.map;
  if (!map || Object.keys(map).length === 0) return;

  const resolved = {
    basePublicPath: normalizeBase(options?.basePublicPath ?? DEFAULT_BASE_PUBLIC_PATH),
    className: options?.className ?? DEFAULT_CLASS_NAME,
    maxNameLen: options?.maxNameLen ?? DEFAULT_MAX_NAME_LEN,
    allowedExts: options?.allowedExts ?? DEFAULT_ALLOWED_EXTS,
  } as Required<Omit<CustomEmojiOptions, 'map'>>;

  const rule = makeRule(map, resolved);

  // Try to place before 'emoji'; fallback to 'text' if 'emoji' is absent
  try {
    const ok = (md.inline.ruler as any).before('emoji', 'custom_emoji', rule);
    if (!ok) md.inline.ruler.before('text', 'custom_emoji', rule);
  } catch {
    md.inline.ruler.before('text', 'custom_emoji', rule);
  }

  md.renderer.rules.custom_emoji = (tokens, idx) => {
    const t = tokens[idx];
    const cls = t.attrGet('class') || resolved.className;
    const src = t.attrGet('src')!;
    const alt = t.attrGet('alt') || '';
    const title = t.attrGet('title') || '';
    const loading = t.attrGet('loading') || 'lazy';
    const decoding = t.attrGet('decoding') || 'async';
    const draggable = t.attrGet('draggable') || 'false';
    return `<img class="${cls}" src="${src}" alt="${alt}" title="${title}" draggable="${draggable}" loading="${loading}" decoding="${decoding}">`;
  };
}
