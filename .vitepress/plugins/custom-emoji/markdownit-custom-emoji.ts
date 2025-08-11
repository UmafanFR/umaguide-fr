import type MarkdownIt from 'markdown-it';
type RuleInline = (state: any, silent: boolean) => boolean;

// ------------------ Defaults ------------------
const DEFAULT_BASE_PUBLIC_PATH = '/assets/custom-emoji/';
const DEFAULT_CLASS_NAME = 'custom-emoji';
const DEFAULT_MAX_NAME_LEN = 64;
const DEFAULT_ALLOWED_EXTS = ['svg', 'png', 'webp', 'gif'] as const;

export interface CustomEmojiOptions {
  /** Map { name -> filename } Required. */
  map: Record<string, string>;
  /** Prefix applied to the filename (public folder), e.g. "/assets/custom-emoji/" */
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
  if (idx <= 0 || idx === file.length - 1) return false; // no extension or trailing '.'
  const ext = file.slice(idx + 1).toLowerCase();
  return allowed.includes(ext);
}

function makeRule(
  map: Record<string, string>,
  opts: Required<Omit<CustomEmojiOptions, 'map'>>
): RuleInline {
  return function (state, silent) {
    const src = state.src;
    const pos = state.pos;
    const max = state.posMax;

    if (src.charCodeAt(pos) !== 0x3a) return false; // must start with ':'

    const nameStart = pos + 1;
    if (nameStart >= max) return false; // ':' at end of line

    const end = src.indexOf(':', nameStart);
    if (end === -1) return false; // no closing ':'

    const nameLen = end - nameStart;
    if (nameLen <= 0 || nameLen > opts.maxNameLen) return false; // empty or too long

    const name = src.slice(nameStart, end);

    const file = map[name];
    if (!file) return false; // not found → keep text

    // Reject any path/URL or traversal attempts
    if (file.includes('/') || file.includes('\\') || file.includes('..')) return false;

    // Enforce extension whitelist
    if (!hasAllowedExtension(file, opts.allowedExts)) return false;

    const finalSrc = `${opts.basePublicPath}${file}`;

    if (!silent) {
      const token = state.push('custom_emoji', '', 0);
      token.attrSet('src', finalSrc);
      token.attrSet('alt', `:${name}:`);
      token.attrSet('class', opts.className);
      token.attrSet('draggable', 'false');
      token.attrSet('loading', 'lazy');
      token.attrSet('decoding', 'async');
      token.content = name;
    }

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
    const loading = t.attrGet('loading') || 'lazy';
    const decoding = t.attrGet('decoding') || 'async';
    const draggable = t.attrGet('draggable') || 'false';
    return `<img class="${cls}" src="${src}" alt="${alt}" draggable="${draggable}" loading="${loading}" decoding="${decoding}">`;
  };
}
