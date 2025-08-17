import matter from 'gray-matter';

const searchConfig = {
  provider: 'local',
  options: {
    _render(src, env, md) {
      const file = env.relativePath || '';
      const { data: frontmatter } = matter(src);
      if (frontmatter?.search === false) return '';

      // Cas spécial : personnages => n'indexer que le titre
      if (file.startsWith('guides/Gameplay/characters/')) {
        const title = frontmatter?.title || '';
        return title ? md.render(`# ${title}`) : '';
      }

      // Le reste
      return md.render(src, env);
    },
  },
};

export default searchConfig;
