import type { VitePressSidebarOptions } from 'vitepress-sidebar/types';

const commonSidebarConfig: VitePressSidebarOptions = {
  collapsed: false,
  capitalizeFirst: true,
  useTitleFromFileHeading: true,
  useTitleFromFrontmatter: true,
  useFolderTitleFromIndexFile: true,
  sortMenusByFrontmatterOrder: true,
  frontmatterTitleFieldName: 'menuTitle',
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

export default vitePressSidebarConfig;
