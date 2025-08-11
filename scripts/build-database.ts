import * as cheerio from "cheerio";

async function main() {
  const url = "https://gametora.com/umamusume/characters";
  const res = await fetch(url);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);

  const html = await res.text();
  const $ = cheerio.load(html);

  const raw = $("#__NEXT_DATA__").html();
  if (!raw) throw new Error("__NEXT_DATA__ introuvable");
  const next = JSON.parse(raw);
  const data = next?.props?.pageProps ?? {};

  // Écrit le JSON et crée le dossier si besoin
  await Bun.write(".vitepress/data/characters.json", JSON.stringify(data, null, 2), {
    createPath: true,
  });

  console.log("Écrit -> data/mejiro-palmer.json");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
