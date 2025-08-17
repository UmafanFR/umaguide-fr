import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import 'floating-vue/dist/style.css';
import './tooltip.custom.css';
import './custom.css';

// Plugins
import highlightAnchor from '../plugins/highlightAnchor';
import '../plugins/custom-emoji/custom-emoji.css';

// External Components
import FloatingVue from 'floating-vue';

// Internal Components
import VPTeamMembersList from '../components/VPTeamMembersList.vue';

import UmaDetails from '../components/UmaDetails/UmaDetails.vue';
import UmasGrid from '../components/UmasGrid/UmasGrid.vue';
import UmaBreadcrumb from '../components/UmaDetails/UmaBreadcrumb.vue';

export default {
  ...DefaultTheme,
  enhanceApp({ app, router }) {
    router.onAfterRouteChange = to => {
      highlightAnchor(to);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', () => {
        highlightAnchor(window.location.hash);
      });
    }

    // Components registrations
    app.use(FloatingVue, {
      themes: {
        umaguide: {
          $extend: 'dropdown',
          $resetCss: true,
        },
      },
    });

    app.component('VPTeamMembersList', VPTeamMembersList);
    app.component('UmasGrid', UmasGrid);
    app.component('UmaBreadcrumb', UmaBreadcrumb);
    app.component('UmaDetails', UmaDetails);
  },
} satisfies Theme;
