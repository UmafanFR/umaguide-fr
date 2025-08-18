import type { UserConfig } from 'vitepress';
// Dev plugins
import imagePresets, { widthPreset } from 'vite-plugin-image-presets'; // Create different size version (or format) for images

const presets = {
  // preset for characters square-icon
  squareicon: widthPreset({
    widths: [64, 128, 256],
    formats: {
      webp: {},
      png: {},
    },
  }),
  // preset for characters stand
  stand: widthPreset({
    widths: [128, 256, 512],
    formats: {
      webp: {},
      png: {},
    },
  }),
};

const viteConfig: UserConfig['vite'] = {
  server: {
    port: 3000,
    allowedHosts: true as true,
  },
  plugins: [imagePresets(presets)],
};

export default viteConfig;
