import type { HeadConfig } from 'vitepress';

const headConfig: HeadConfig[] = [
  ['link', { rel: 'icon', href: '/favicon.ico' }],
  ['meta', { property: 'og:site_name', content: 'UmaGuide FR' }],
  ['meta', { property: 'og:image', content: '/assets/curren.png' }],
  ['meta', { property: 'theme-color', content: '#F86669' }],
];

export default headConfig;
