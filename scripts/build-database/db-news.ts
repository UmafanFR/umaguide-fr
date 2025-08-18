import { getFromWithRetry } from 'scripts/fetchHelper';

export default async function getNews(gametoraApi: string) {
  const rateUps: RateUp[] = [];
  let gametoraRes;
  try {
    gametoraRes = await getFromWithRetry<any>(gametoraApi, `umamusume/gacha.json`, {
      timeoutMs: 5000,
      retries: 3,
    });
  } catch {
    console.error(`❌ Skip gacha build après 3 tentatives`);
    return;
  }

  if (!gametoraRes.pageProps) {
    console.log('No Gametora data found for gacha.json');
    return;
  }

  const curCharBanners = gametoraRes.pageProps.currentCharBanners.en;
  const curSupportBanners = gametoraRes.pageProps.currentSupportBanners.en;

  let i = 0; // Supposely find same data for support Banner
  for (const curCharBanner of curCharBanners) {
    const idsChar: number[] = [];
    const idsSupport: number[] = [];
    const curSupportBanner = curSupportBanners[i];

    for (const pickup of curCharBanner.pickups) idsChar.push(pickup[0]);

    for (const pickup of curSupportBanner.pickups) idsSupport.push(pickup[0]);

    rateUps.push({
      from: curCharBanner.start,
      to: curCharBanner.end,
      characters: {
        bannerImg: `https://gametora.com/images/umamusume/en/gacha/img_bnr_gacha_${curCharBanner.id}.png`,
        ids: idsChar,
      },
      supports: {
        bannerImg: `https://gametora.com/images/umamusume/en/gacha/img_bnr_gacha_${curSupportBanner.id}.png`,
        ids: idsSupport,
      },
    });
    i++;
  }

  await Bun.write('.vitepress/data/rateups.json', JSON.stringify(rateUps, null, 2), {
    createPath: true,
  });

  console.log(`✅ Écrit banner rate up dans .vitepress/data/rateups.json`);
}
