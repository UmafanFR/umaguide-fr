import DefaultTheme from 'vitepress/theme';
import { VPTeamMembers } from 'vitepress/theme';
import contributors from '../../contributors.json';

import type { Theme } from 'vitepress';
import { h } from 'vue';
import highlightAnchor from './highlightAnchor';
import './custom.css';

function buildContributorsList(contributors) {
  return contributors.map(contributor => ({
    avatar: contributor.avatar_url,
    name: contributor.login,
    title: 'Contributor',
    links: [{ icon: 'github', link: contributor.html_url }],
  }));
}

const VPTeamMembersList = {
  name: 'VPTeamMembersList',
  render() {
    return h(VPTeamMembers, {
      members: buildContributorsList(contributors) || [],
    });
  },
};

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

    app.component('VPTeamMembersList', VPTeamMembersList);
  },
} satisfies Theme;
