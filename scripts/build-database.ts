import * as cheerio from 'cheerio';
import getNews from './build-database/db-news';
import buildUmas from './build-database/db-umas';

async function loadCheerio(url: string) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  return cheerio.load(html);
}

async function getGametoraBuild() {
  const $ = await loadCheerio(`https://gametora.com/umamusume/`);
  const raw = $('#__NEXT_DATA__').html();
  if (!raw) throw new Error('__NEXT_DATA__ introuvable');

  const next = JSON.parse(raw);
  const buildId = next?.buildId ?? '';
  if (!buildId) throw new Error('❌ Next Build Id vide');

  return `https://gametora.com/_next/data/${buildId}`;
}

async function main() {
  const gametoraApi = await getGametoraBuild();
  await getNews(gametoraApi);

  buildUmas(gametoraApi);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
