import { join } from 'path';
import { getFromWithRetry } from 'scripts/fetchHelper';
import nextbanners from '.vitepress/data/nextbanners.json';

const UMAPYOINET_API = 'https://umapyoi.net/api/v1/';
const ASSETS_FOLDER = join(process.cwd(), 'public', 'assets');

const keysByStar = {
  2: 'two_star_stats',
  3: 'three_star_stats',
  4: 'four_star_stats',
  5: 'five_star_stats',
} as const;

async function downloadCharacterImage(filename: string, url: string) {
  const folder = join(ASSETS_FOLDER, 'characters');
  const filePath = join(folder, filename);

  if (await Bun.file(filePath).exists()) return;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status} lors du téléchargement de ${url}`);
  }

  const arrayBuffer = await res.arrayBuffer();

  await Bun.write(filePath, new Uint8Array(arrayBuffer));
  console.log(`✅ Enregistré : ${filePath}`);
}

async function fetchUmas(gametoraApi: string): Promise<UmaData[]> {
  const umapyoiUmasOutfit = await getFromWithRetry<any[]>(UMAPYOINET_API, 'outfit');
  const umapyoiUmasInfo = await getFromWithRetry<any[]>(UMAPYOINET_API, 'character/info');

  const umas: UmaData[] = [];

  for (const uma of umapyoiUmasOutfit) {
    let gametoraRes;
    try {
      gametoraRes = await getFromWithRetry<any>(
        gametoraApi,
        `umamusume/characters/${uma.gametora}.json`,
        { timeoutMs: 5000, retries: 3 }
      );
    } catch {
      console.error(`❌ Skip ${uma.gametora} après 3 tentatives`);
      continue;
    }

    if (!gametoraRes.pageProps) {
      console.log('No Gametora data found for ' + uma.gametora);
      continue;
    }

    const umaData = gametoraRes.pageProps.itemData;

    const umaInfo = umapyoiUmasInfo.find((umapyoiUma: any) => umapyoiUma.id === uma.chara_web_id);
    if (!umaInfo) continue;

    const imageUrl = `https://gametora.com/images/umamusume/characters/chara_stand_${umaData.char_id}_${umaData.card_id}.png`;
    const md =
      umaInfo.name_en_internal + (umaData.version ? '-' + umaData.version.replace(/_/g, '-') : '');

    try {
      await downloadCharacterImage(`${md}.png`, imageUrl);
    } catch (err) {
      console.warn(`⚠️ Impossible de télécharger ${md}:`, err);
    }

    umas.push({
      id: uma.id,
      name: umaInfo.name_en,
      slugname: umaInfo.name_en_internal,
      char_id: uma.chara_game_id,
      costume: umaData.costume,
      colors: [umaInfo.color_main, umaInfo.color_sub],
      gametora: uma.gametora,
      version: umaData.version ? umaData.version.replace(/_/g, ' ') : undefined,
      title: umaData.title,
      rarity: umaData.rarity,
      aptitudes: umaData.aptitude,
      stats: [
        umaData.base_stats,
        ...([2, 3, 4, 5] as const) // Iterate all uncap
          .slice(umaData.rarity - 1) // Remove (or not) lower level to start at rarity
          .map(star => umaData[keysByStar[star]]), // getting data thanks to keysByStar
      ],
      stat_bonus: umaData.stat_bonus,
      skills_unique: umaData.skills_unique,
      skills_innate: umaData.skills_innate,
      skills_awakening: umaData.skills_awakening,
      skills_event: umaData.skills_event,
      released: umaData.release_en,
      md: md,
    });
  }

  return umas;
}

function getCharacterDefaultContent(uma: UmaData) {
  const content = `# ${uma.name}${
    uma.version ? '(' + uma.version + ')' : ''
  }\n\nContenu initial pour ${uma.name}`;
  return content;
}

async function createCharactersMD(uma: UmaData) {
  const fileName = `${uma.md}.md`;
  const filePath = join('./guides/Gameplay/Characters', fileName);

  if (!(await Bun.file(filePath).exists())) {
    await Bun.write(filePath, getCharacterDefaultContent(uma), { createPath: true });
    console.log(`✅ Nouveau fichier créé : ${filePath}`);
  }
}

export default async function buildUmas(gametoraApi: string) {
  const umas = await fetchUmas(gametoraApi);

  await Bun.write('.vitepress/data/umas.json', JSON.stringify(umas, null, 2), {
    createPath: true,
  });

  for (const uma of umas)
    if (uma.released !== undefined || nextbanners[0].characters.includes(uma.id))
      // Create only if undefined or next banner inc
      createCharactersMD(uma);

  console.log(`✅ Écrit ${umas.length} Umas dans .vitepress/data/umas.json`);
}
