// scripts/fetch-contributors.ts
const REPO = 'UmafanFR/umaguide-fr';
const OUTPUT_PATH = '.vitepress/data/contributors.json';
const GH_TOKEN = process.env.GH_TOKEN;

async function fetchContributors() {
  const url = `https://api.github.com/repos/${REPO}/contributors?per_page=100`;
  if (!GH_TOKEN) {
    console.warn('⚠️ No GitHub token provided. Fetching contributors may be limited.');
  }

  const params = {
    headers: {
      Authorization: `token ${GH_TOKEN}`,
      Accept: 'application/vnd.github.v3+json',
    },
  };
  const response = await fetch(url, GH_TOKEN ? params : {});

  if (!response.ok) {
    throw Error(`❌ Failed to fetch contributors: ${response.statusText}`);
  }

  const data = await response.json();

  await Bun.write(OUTPUT_PATH, JSON.stringify(data, null, 2));
  console.log(`✅ Contributors saved to ${OUTPUT_PATH}`);
}

fetchContributors();
