<script setup lang="ts">
import { ref } from 'vue';
import { getUmaByMd } from '../../helpers/UmaDataHelper';
import UmaDetailsStats from './UmaDetailsStats.vue';
import UmaStand from '../UmaImage/UmaStand.vue';

const { slug } = defineProps<{ slug: string }>();
const u: UmaData | undefined = getUmaByMd(slug);

const activeTab = ref<'stats' | 'skills'>('stats');
const maxLvlStats: number = (u?.stats.length ?? 1) - 1;
const lvlStats = ref(0);
const hoverIndex = ref<number | null>(null);

// toggle détails
const showDetails = ref(false);

function changeLevelTo(to: number) {
  if (to < 0) {
    lvlStats.value = 0;
  } else if (to > maxLvlStats) {
    lvlStats.value = maxLvlStats;
  } else {
    lvlStats.value = to;
  }
}
</script>

<template>
  <div v-if="u" class="uma-component detail-card">
    <div class="meta">
      <div class="meta-content">
        <div class="basics" :class="{ 'with-version': u.version }">
          <div class="infos">
            <span>[{{ u.title }}]</span>
            <span>{{ u.name }}</span>
            <span class="uma-version" v-if="u.version">{{ u.version }}</span>
            <div class="stars">
              <button
                v-for="lvl in [0, 1, 2, 3, 4]"
                :key="lvl"
                @mouseenter="showDetails && (hoverIndex = lvl < u.rarity - 1 ? u.rarity - 1 : lvl)"
                @mouseleave="showDetails && (hoverIndex = null)"
                @click="changeLevelTo(lvl - (u.rarity - 1))"
                :aria-pressed="lvl <= lvlStats"
                :aria-label="`Débloquer ${lvl + 1} étoile${lvl + 1 > 1 ? 's' : ''}`"
                :title="`Débloquer ${lvl + 1} étoile${lvl + 1 > 1 ? 's' : ''}`"
                :disabled="!showDetails"
              >
                <img
                  :src="
                    hoverIndex !== null
                      ? lvl <= hoverIndex
                        ? '/assets/sprites/star.png'
                        : '/assets/sprites/empty-star.png'
                      : lvl <= lvlStats + u.rarity - 1
                      ? '/assets/sprites/star.png'
                      : '/assets/sprites/empty-star.png'
                  "
                  alt="Star"
                />
              </button>
            </div>
          </div>
          <UmaStand class="cover" :slug="u.slug" />
        </div>
      </div>

      <!-- bouton toggle détails -->
      <div class="toggle-details">
        <button :class="{ dshown: showDetails }" @click="showDetails = !showDetails">
          {{ showDetails ? 'Masquer les détails' : 'Voir les détails' }}
        </button>
      </div>

      <div v-if="showDetails">
        <div class="meta-content p-top-none">
          <div class="tabs">
            <button :class="{ active: activeTab === 'stats' }" @click="activeTab = 'stats'">
              Stats
            </button>
            <!-- <button :class="{ active: activeTab === 'skills' }" @click="activeTab = 'skills'">
              Skills
            </button> -->
          </div>
        </div>

        <div class="tab-content">
          <UmaDetailsStats v-if="activeTab === 'stats'" :u="u" :lvl-stats="lvlStats" />
          <div v-else>🎯 Compétences de l’Uma - en construction</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style src="./UmaDetails.css" scoped></style>
