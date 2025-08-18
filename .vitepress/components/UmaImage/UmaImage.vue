<script setup lang="ts">
import { maps, defaultsFor, type Kind } from '../../plugins/image-registry';

type Source = { type: string; srcset: string };
type ImgObjNormalized = { src: string; sources: Source[] };

const props = defineProps<{
  slug: string;
  kind: Kind;
  alt?: string;
  width?: number;
  height?: number;
  sizes?: string;
  loading?: 'lazy' | 'eager';
  fetchpriority?: 'high' | 'low' | 'auto';
  preferFormat?: 'image/webp' | 'image/png';
}>();

// ---- normalisation
function pickLargestFromSrcset(srcset?: string) {
  if (!srcset) return undefined;
  const last = srcset.split(',').pop()?.trim();
  return last?.split(/\s+/)[0];
}
function normalize(mod: any): ImgObjNormalized | undefined {
  if (!mod) return undefined;
  if (typeof mod === 'object' && 'src' in mod && 'sources' in mod) {
    return mod as ImgObjNormalized;
  }
  if (Array.isArray(mod)) {
    const sources = mod as Source[];
    const png = sources.find(s => s.type === 'image/png');
    const src =
      pickLargestFromSrcset(png?.srcset) ?? pickLargestFromSrcset(sources.at(-1)?.srcset) ?? '';
    return { src, sources };
  }

  if (typeof mod === 'string') {
    return { src: mod, sources: [] };
  }
  return undefined;
}

const raw = maps[props.kind][props.slug];
const img = normalize(raw);

const def = defaultsFor(props.kind);
const displayWidth = props.width ?? def.width;
const displayHeight = props.height ?? def.height;
const sizesAttr = props.sizes ?? def.sizes;
const loadingAttr = props.loading ?? 'lazy';
const fetchPriority = props.fetchpriority ?? 'auto';
const altText = props.alt ?? `${props.slug} ${props.kind}`;

const preferredImgSrc = (() => {
  if (!img?.sources || !props.preferFormat) return undefined;
  const found = img.sources.find(s => s.type === props.preferFormat);
  return pickLargestFromSrcset(found?.srcset);
})();
</script>

<template>
  <picture class="uma-component" v-if="img">
    <source
      v-for="s in img.sources"
      :key="s.type + s.srcset"
      :type="s.type"
      :srcset="s.srcset"
      :sizes="sizesAttr"
    />
    <img
      class="uma-img"
      v-bind="$attrs"
      :src="preferredImgSrc || img.src"
      :alt="altText"
      :width="displayWidth"
      :height="displayHeight"
      :loading="loadingAttr"
      :fetchpriority="fetchPriority"
      decoding="async"
    />
  </picture>

  <span v-else :aria-label="altText" style="display: inline-block">{{ altText }}</span>
</template>

<style scoped>
.uma-img {
  all: inherit;
}
</style>
