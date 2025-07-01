// scripts/fetch-contributors.ts
const REPO = "UmafanFR/umaguide-fr";
const OUTPUT_PATH = "contributors.json";

async function fetchContributors() {
  const url = `https://api.github.com/repos/${REPO}/contributors?per_page=100`;

  const response = await fetch(url);

  if (!response.ok) {
    throw Error(`❌ Failed to fetch contributors: ${response.statusText}`);
  }

  const data = await response.json();

  await Bun.write(OUTPUT_PATH, JSON.stringify(data, null, 2));
  console.log(`✅ Contributors saved to ${OUTPUT_PATH}`);
}

fetchContributors();
