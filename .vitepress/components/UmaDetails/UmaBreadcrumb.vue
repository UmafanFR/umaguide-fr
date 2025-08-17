<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vitepress';
import { getActiveUmas } from '../../helpers/UmaDataHelper';

import MdiChevronDown from '../icons/mdiChevronDown.vue';

const props = defineProps<{ md: string }>();
const router = useRouter();

const options = getActiveUmas().map(u => ({
  value: u.md,
  name: u.name,
  version: u.version,
  rarity: u.rarity,
  icon: `/assets/characters/icons/${u.md}.png`,
}));

const selectedMd = ref(props.md);
const shown = ref(false);

const current = computed(
  () =>
    options.find(o => o.value === selectedMd.value) ?? {
      value: props.md,
      name: '—',
      version: '',
      icon: '/assets/placeholder.png',
    }
);

function goTo(name: string) {
  if (name !== props.md) router.go(`/guides/Gameplay/characters/${name}`);
}
</script>

<template>
  <nav class="breadcrumb">
    <a href="../characters">Liste des personnages</a>
    <span class="separator">›</span>

    <div class="uma-select">
      <VDropdown theme="umaguide" v-model:shown="shown" :auto-hide="true" placement="bottom-start">
        <!-- Trigger -->
        <button type="button" :aria-expanded="shown">
          <span class="name">{{ current.name }}</span>
          <span v-if="current.version" class="uma-version">{{ current.version }}</span>
          <MdiChevronDown class="chevron" />
        </button>

        <!-- Popper -->
        <template #popper="{ hide }">
          <ul class="menu" role="listbox" :aria-activedescendant="`opt-${current.value}`">
            <li
              v-for="opt in options"
              :key="opt.value"
              class="item"
              role="option"
              :id="`opt-${opt.value}`"
              :aria-selected="opt.value === current.value"
              @click="goTo(opt.value)"
            >
              <img class="icon" :src="opt.icon" :alt="opt.name" />
              <div class="meta">
                <div class="line">
                  <span class="name">{{ opt.name }}</span>
                  <span v-if="opt.version" class="uma-version">{{ opt.version }}</span>
                </div>
                <div class="rarity">
                  <img
                    class="star"
                    v-for="i in opt.rarity"
                    :key="i"
                    src="/assets/sprites/star.png"
                  />
                </div>
              </div>
            </li>
          </ul>
        </template>
      </VDropdown>
    </div>
  </nav>
</template>

<style src="./UmaBreadcrumb.css" scoped></style>
