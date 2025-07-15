import { defineConfig, UserConfig } from 'vitepress';
import { withSidebar } from 'vitepress-sidebar';
import { VitePressSidebarOptions } from 'vitepress-sidebar/types';

const commonSidebarConfig: VitePressSidebarOptions = {
  collapsed: false,
  capitalizeFirst: true,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  sortMenusByFrontmatterOrder: true,
};

const vitePressSidebarConfig = [
  {
    ...commonSidebarConfig,
    documentRootPath: '/guides/',
    resolvePath: '/guides/',
    basePath: '/guides/',
    aside: true
  }
]


const vitePressConfig: UserConfig = {
  title: "UmaGuide FR",
  description: "Des guides en français pour Umamusume: Pretty Derby",
  head: [
    ['link', { rel: "shortcut icon", href: "/favicon.ico"}]
  ],
  themeConfig: {
    outline: [2, 3],
    outlineTitle: 'Table des matières',
    logo: '/assets/curren.png',
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Acceuil', link: '/' },
      { text: 'Guides', link: '/guides' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/UmafanFR/umaguide-fr', },
      { icon: 'discord', link: 'https://discord.gg/kuKGHzgjv5' },
    ],

    footer: {
      message: 'Made with ❤️ by UmafanFR',
    }
  },
  vite: {
    server: {
      port: 3000, // Specify your desired port here
      allowedHosts: true
    }
  }
};

export default defineConfig(
  withSidebar(vitePressConfig, vitePressSidebarConfig)
);