import type { MarkdownOptions } from 'vitepress';
import customEmoji from './plugins/custom-emoji/markdownit-custom-emoji';
import emojiMap from './data/custom-emoji.json' assert { type: 'json' };

const markdownConfig: MarkdownOptions = {
  toc: { level: [3, 3] },

  config: md => {
    md.use(customEmoji, { map: emojiMap as Record<string, string> });
  },
};

export default markdownConfig;
