const searchConfig = {
  provider: 'local',
  options: {
    _render(src, env, md) {
      const file = env.relativePath || '';

      // Cas spécial pour la recherche des personnages, pour éviter énormément de redondances
      if (file.startsWith('guides/Gameplay/characters/')) {
        // Ne garde que le titre (frontmatter ou H1)
        const title = env.frontmatter?.title || '';
        return title ? md.render(`# ${title}`) : '';
      }

      // Comportement par défaut = tout le contenu
      return md.render(src, env);
    },
  },
};

export default searchConfig;
