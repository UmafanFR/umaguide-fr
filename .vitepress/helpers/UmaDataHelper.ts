import umasJson from '../data/umas.json';
import rateUpsJson from '../data/rateups.json';
import nextBannerJson from '../data/nextbanners.json';

export const umas = umasJson as UmaData[];
export const rateUps = rateUpsJson as RateUp[];

/* ----------------------- Indexes ----------------------- */

const byMd = new Map<string, UmaData>();
const byId = new Map<number, UmaData>();

for (const u of umas) {
  if (u?.md) byMd.set(u.md, u);
  if (typeof u?.id === 'number') byId.set(u.id, u);
}

export function getUmaByMd(md: string) {
  return byMd.get(md);
}

export function getUmaById(id: number) {
  return byId.get(id);
}

/* ----------------------- Next Banner helpers ----------------------- */

export function getFirstNextBanner(): NextBanner | undefined {
  return nextBannerJson[0] as NextBanner | undefined;
}

/** Cache en mémoire pour la liste des IDs de la prochaine bannière. */
let _nextBannerIdsCache: Set<number> | null = null;

function getNextBannerIdSet(): Set<number> {
  if (_nextBannerIdsCache) return _nextBannerIdsCache;
  const nb = getFirstNextBanner();
  _nextBannerIdsCache = new Set<number>(
    Array.isArray(nb?.characters)
      ? nb!.characters.filter((n): n is number => typeof n === 'number')
      : []
  );
  return _nextBannerIdsCache;
}

/* ----------------------- Umas actives ----------------------- */

// Retourne la liste des Umas actives et la prochaine Uma
export function getActiveUmas(): UmaData[] {
  const nextIds = getNextBannerIdSet();

  return umas.filter(u => {
    if (!u) return false;
    return u.released || nextIds.has(u.id);
  });
}

/* ----------------------- RateUp helpers ----------------------- */

type RateUpFilterOptions = {
  activeOnly?: boolean;
  now?: number | Date;
  unique?: boolean;
};

const toMs = (n: number) => (n < 1e12 ? n * 1000 : n);
const nowMs = (n?: number | Date) =>
  n instanceof Date ? n.getTime() : typeof n === 'number' ? n : Date.now();

export function isRateUpActive(r: RateUp, at: number | Date = Date.now()): boolean {
  const t = nowMs(at);
  return t >= toMs(r.from) && t <= toMs(r.to);
}

/** Toutes les bannières actives (à "now") */
export function getActiveRateUps(at: number | Date = Date.now()): RateUp[] {
  return rateUps.filter(r => isRateUpActive(r, at));
}

/** Aplatit tous les IDs "characters" */
export function getAllRateUpCharacterIds(opts: RateUpFilterOptions = {}): number[] {
  const { activeOnly = false, now, unique = true } = opts;
  const list = (activeOnly ? getActiveRateUps(now) : rateUps).flatMap(r => r.characters?.ids ?? []);
  return unique ? [...new Set(list)] : list;
}

/** Aplatit tous les IDs "supports" */
export function getAllRateUpSupportIds(opts: RateUpFilterOptions = {}): number[] {
  const { activeOnly = false, now, unique = true } = opts;
  const list = (activeOnly ? getActiveRateUps(now) : rateUps).flatMap(r => r.supports?.ids ?? []);
  return unique ? [...new Set(list)] : list;
}

/** True si l’ID Uma est présent dans (au moins) une bannière */
export function isUmaInRateUp(id: number, opts: RateUpFilterOptions = {}): boolean {
  const { activeOnly = false, now } = opts;
  const pool = activeOnly ? getActiveRateUps(now) : rateUps;
  return pool.some(r => r.characters?.ids?.includes(id));
}

/** True si l’ID Support est présent dans (au moins) une bannière */
export function isSupportInRateUp(id: number, opts: RateUpFilterOptions = {}): boolean {
  const { activeOnly = false, now } = opts;
  const pool = activeOnly ? getActiveRateUps(now) : rateUps;
  return pool.some(r => r.supports?.ids?.includes(id));
}
