<script setup lang="ts">
const props = defineProps<{
  slug: string;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
}>();
</script>

<template>
  <UmaImage kind="stand" v-bind="props" />
</template>
