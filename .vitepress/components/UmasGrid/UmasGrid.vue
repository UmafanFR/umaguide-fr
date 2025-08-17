<script setup lang="ts">
import { ref, computed } from 'vue';
import { getActiveUmas, isUmaInRateUp } from '../../helpers/UmaDataHelper';
import AscIcon from '../icons/mdiSortAscending.vue';
import DescIcon from '../icons/mdiSortDescending.vue';
import MdiChevronDown from '../icons/mdiChevronDown.vue';

const sortIcons = {
  asc: AscIcon,
  desc: DescIcon,
};

const q = ref('');
const sortKey = ref<'rarity' | 'released' | 'name'>('rarity');
const sortDir = ref<'asc' | 'desc'>('desc');

const sortLabel = computed(() => (sortDir.value === 'asc' ? 'Tri croissant' : 'Tri décroissant'));

function normalize(s: string) {
  return s
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase();
}

const sortByRelease = (a: UmaData, b: UmaData, direction: number) => {
  if (!a.released && b.released) return direction === 1 ? 1 : -1;
  if (!b.released && a.released) return direction === 1 ? -1 : 1;
  if (!a.released && !b.released) return 0;

  const da = new Date(a.released!).getTime();
  const db = new Date(b.released!).getTime();

  return (da - db) * direction;
};

const filtered = computed(() => {
  let list = getActiveUmas();

  const nq = normalize(q.value);
  if (nq) {
    list = list.filter(u => normalize(u.name + u.version).includes(nq));
  }

  const dir = sortDir.value === 'asc' ? 1 : -1;

  list = [...list].sort((a, b) => {
    if (sortKey.value === 'rarity') {
      if (a.rarity !== b.rarity) return (a.rarity - b.rarity) * dir;
      return sortByRelease(a, b, -1);
    }

    if (sortKey.value === 'released') return sortByRelease(a, b, dir);

    // Default : name
    return a.name.localeCompare(b.name) * dir;
  });

  return list;
});

function toggleDirection() {
  sortDir.value = sortDir.value === 'asc' ? 'desc' : 'asc';
}
</script>

<template>
  <div class="characters-grid">
    <div class="toolbar">
      <div class="search">
        <input
          v-model="q"
          type="search"
          placeholder="Rechercher un personnage"
          aria-label="Rechercher un personnage"
        />
        <button
          v-if="q"
          @click="q = ''"
          class="clear-btn"
          aria-label="Effacer la recherche"
          title="Effacer la recherche"
        >
          ✕
        </button>
      </div>

      <label class="sort">
        Trier par:
        <div class="select-wrapper">
          <select v-model="sortKey">
            <option value="rarity">Rareté</option>
            <option value="released">Date de sortie</option>
            <option value="name">Nom</option>
          </select>
          <MdiChevronDown class="chevron" />
        </div>
      </label>

      <button
        class="sortDirection"
        @click="toggleDirection"
        :aria-label="sortLabel"
        :title="sortLabel"
      >
        <component :is="sortIcons[sortDir]" class="icon" />
      </button>
    </div>

    <div class="grid">
      <article v-for="u in filtered" :key="u.md" class="card" :class="{ upcoming: !u.released }">
        <a :href="`/guides/Gameplay/characters/${u.md}`" :title="u.name">
          <div v-if="isUmaInRateUp(u.id)" class="badge" aria-hidden="true">↑ Rate up</div>
          <div v-if="!u.released" class="badge" aria-hidden="true">Prochainement</div>
          <div class="cover">
            <div class="overlay">
              <svg class="shape" style="z-index: 1" viewBox="0 0 200 200" aria-hidden="true">
                <path class="bg-shape-color1" :fill="u.colors[0]" />
              </svg>
              <svg class="shape" viewBox="0 0 200 200" aria-hidden="true">
                <path class="bg-shape-color2" :fill="u.colors[1]" />
              </svg>
            </div>

            <img :src="`/assets/characters/${u.md}.png`" :alt="u.name" />
          </div>
          <div class="meta">
            <div class="name">
              <div v-if="u.version" class="version" aria-hidden="true">{{ u.version }}</div>
              {{ u.name }}
            </div>
            <div class="rarity">
              <img class="star" v-for="i in u.rarity" :key="i" src="/assets/sprites/star.png" />
            </div>
          </div>
        </a>
      </article>
    </div>

    <p v-if="!filtered.length" style="opacity: 0.7">
      Aucun personnage ne correspond à votre recherche.
    </p>
  </div>
</template>

<style src="./UmasGrid.css" scoped></style>
