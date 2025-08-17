import type { UserConfig } from 'vitepress';
import searchConfig from './searchConfig.mts';

const themeConfig: UserConfig['themeConfig'] = {
  outline: [2, 3],
  externalLinkIcon: true,
  outlineTitle: 'Table des matières',
  logo: '/assets/curren.webp',
  nav: [
    { text: 'Accueil', link: '/' },
    { text: 'Guides', link: '/guides' },
  ],

  search: searchConfig,

  socialLinks: [
    { icon: 'github', link: 'https://github.com/UmafanFR/umaguide-fr' },
    { icon: 'discord', link: 'https://discord.gg/cheval' },
  ],
  footer: {
    message: 'Made with ❤️ by UmafanFR',
  },
};

export default themeConfig;
