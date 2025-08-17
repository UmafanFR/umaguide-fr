declare global {
  interface UmaData {
    id: number;
    name: string;
    slug: string;
    version?: string;
    char_id: number;
    costume: number;
    colors: string[];
    gametora: string;
    title: string;
    rarity: number;
    aptitudes: string[];
    stats: number[][];
    stat_bonus: number[];
    skills_unique: number[];
    skills_innate: number[];
    skills_awakening: number[];
    skills_event: number[];
    released?: string;
  }

  interface RateUp {
    from: number;
    to: number;
    characters: {
      bannerImg: string;
      ids: number[];
    };
    supports: {
      bannerImg: string;
      ids: number[];
    };
  }

  interface NextBanner {
    characters: number[];
    supports: number[];
  }
}

export {};
