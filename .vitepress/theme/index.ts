import DefaultTheme from 'vitepress/theme'

import { VPTeamMembers } from 'vitepress/theme'
import contributors from '../../contributors.json'

import type { Theme } from 'vitepress'
import { h } from 'vue'
import './custom.css'

function build_contributors_list(contributors) {
  return contributors.map(contributor => ({
    avatar: contributor.avatar_url,
    name: contributor.login,
    title: 'Contributor',
    links: [{ icon: 'github', link: contributor.html_url }]
  }));
}

let CustomComponent = {
  name: 'CustomComponent',
  render() {
    // return h('div', { class: 'custom-component' }, 'This is a custom component!')
    return h(VPTeamMembers, {
      members: build_contributors_list(contributors) || []
    })
  },
}

export default {
  ...DefaultTheme,
  enhanceApp({ app, router, siteData }) {
    app.component('CustomComponent', CustomComponent)
  }
} satisfies Theme