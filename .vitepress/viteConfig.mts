import type { UserConfig } from 'vitepress';

const viteConfig: UserConfig['vite'] = {
  server: {
    port: 3000,
    allowedHosts: true as true,
  },
};

export default viteConfig;
