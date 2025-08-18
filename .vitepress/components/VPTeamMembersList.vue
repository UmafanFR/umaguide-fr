<script setup lang="ts">
import { VPTeamMembers } from 'vitepress/theme';
import contributors from '../data/contributors.json';

function buildContributorsList(contributors: any[]) {
  return contributors.map(contributor => ({
    avatar: contributor.avatar_url,
    name: contributor.login,
    title: 'Contributor',
    links: [{ icon: 'github', link: contributor.html_url }],
  }));
}

const members = buildContributorsList(contributors);
</script>

<template>
  <VPTeamMembers :members="members" />
</template>
