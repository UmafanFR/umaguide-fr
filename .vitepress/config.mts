import { defineConfig, UserConfig, HeadConfig } from 'vitepress';
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


const themeConfig = {
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
};

const ViteConfig = {
  server: {
    port: 3000,
    allowedHosts: true as true
  }
}

const headerConfig: HeadConfig[] = [
  ["link", { rel: "icon", href: "/favicon.ico" }],
  ["meta", { property: "og:site_name", content: "UmaGuide FR" }],
  ["meta", { property: "og:image", content: "/assets/curren.png" }],
  ["meta", { property: "og:color", content: "#F86669" }],
];

const vitePressConfig: UserConfig = {
  title: "UmaGuide FR",
  description: "Des guides en français pour Umamusume: Pretty Derby",

  transformHead: ({ pageData }) => {
    headerConfig.push(
      ["meta", { property: "og:title", content: pageData.title }],
    );
  },
  head: headerConfig,
  themeConfig: themeConfig,
  vite: ViteConfig,
}

export default defineConfig(
  withSidebar(vitePressConfig, vitePressSidebarConfig)
);