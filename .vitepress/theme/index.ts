import DefaultTheme from 'vitepress/theme';
import type { Theme } from 'vitepress';
import 'floating-vue/dist/style.css';
import './css/tooltip.custom.css';
import './css/custom.css';

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
import UmaImage from '../components/UmaImage/UmaImage.vue';
import UmaIcon from '../components/UmaImage/UmaSquareIcon.vue';
import UmaStand from '../components/UmaImage/UmaStand.vue';

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

    app.component('VPTeamMembersList', VPTeamMembersList); // Component to build Contributors on Home Page
    app.component('UmaImage', UmaImage); // Component to get specific image size depending on device (generate thanks to imagetools)
    app.component('UmaIcon', UmaIcon); // Component Wrapper to easily get Icon from "UmaImage"
    app.component('UmaStand', UmaStand); // Component Wrapper to easily get Stand from "UmaImage"
    app.component('UmasGrid', UmasGrid); // Component to show Characters grid based on generated JSON data
    app.component('UmaDetails', UmaDetails); // Component to show specific Details Characters from JSON data
    app.component('UmaBreadcrumb', UmaBreadcrumb); // Component to switch to other characters when on Character Details Page
  },
} satisfies Theme;
