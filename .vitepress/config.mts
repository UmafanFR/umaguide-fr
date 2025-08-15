import { defineConfig, UserConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';

import themeConfig from './themeConfig.mjs';
import viteConfig from './viteConfig.mjs';
import markdownConfig from './markdownConfig.mjs';
import sidebarConfig from './sidebarConfig.mjs';
import headConfig from './headConfig.mjs';

const vitePressConfig: UserConfig = {
  lang: 'fr-FR',
  title: 'UmaGuide FR',
  description: 'Des guides en français pour Umamusume: Pretty Derby',

  cleanUrls: true,
  sitemap: {
    hostname: 'https://umaguide.fr',
  },
  transformHead: ({ title, description }) => {
    return [
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
    ];
  },
  head: headConfig,
  themeConfig: themeConfig,
  vite: viteConfig,
  markdown: markdownConfig,
};

export default defineConfig(withSidebar(vitePressConfig, sidebarConfig));
