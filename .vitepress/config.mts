import { defineConfig, UserConfig, HeadConfig, MarkdownOptions } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';
import { VitePressSidebarOptions } from 'vitepress-sidebar/types';

const commonSidebarConfig: VitePressSidebarOptions = {
  collapsed: false,
  capitalizeFirst: true,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  sortMenusByFrontmatterOrder: true,
  excludeFilesByFrontmatterFieldName: 'exclude',
};

const vitePressSidebarConfig: VitePressSidebarOptions[] = [
  {
    ...commonSidebarConfig,
    documentRootPath: '/guides/',
    resolvePath: '/guides/',
    basePath: '/guides/',
  },
];

const themeConfig = {
  outline: [2, 3],
  outlineTitle: 'Table des matières',
  logo: '/assets/curren.webp',
  // https://vitepress.dev/reference/default-theme-config
  nav: [
    { text: 'Accueil', link: '/' },
    { text: 'Guides', link: '/guides' },
  ],

  search: {
    provider: 'local',
  },

  socialLinks: [
    { icon: 'github', link: 'https://github.com/UmafanFR/umaguide-fr' },
    { icon: 'discord', link: 'https://discord.gg/cheval' },
  ],

  footer: {
    message: 'Made with ❤️ by UmafanFR',
  },
};

const viteConfig = {
  server: {
    port: 3000,
    allowedHosts: true as true,
  },
};

const headerConfig: HeadConfig[] = [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  ['meta', { property: 'og:site_name', content: 'UmaGuide FR' }],
  ['meta', { property: 'og:image', content: '/assets/curren.png' }],
  ['meta', { property: 'theme-color', content: '#F86669' }],
];

const markdownConfig: MarkdownOptions = {
  toc: { level: [3, 3] },
};

const vitePressConfig: UserConfig = {
  lang: 'fr-FR',
  title: 'UmaGuide FR',
  description: 'Des guides en français pour Umamusume: Pretty Derby',

  cleanUrls: true,
  sitemap: {
    hostname: 'https://umaguide.fr',
  },
  transformHead: ({ pageData }) => {
    headerConfig.push(['meta', { property: 'og:title', content: pageData.title }]);
  },
  head: headerConfig,
  themeConfig: themeConfig,
  vite: viteConfig,
  markdown: markdownConfig,
};

export default defineConfig(withSidebar(vitePressConfig, vitePressSidebarConfig));
