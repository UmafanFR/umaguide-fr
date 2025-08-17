<script setup lang="ts">
import { getRankFrom } from '../../helpers/rank';

const props = defineProps<{
  u: UmaData;
  lvlStats: number;
}>();

const statsLabel: string[] = ['Speed', 'Stamina', 'Power', 'Guts', 'Wit'];
const aptitudes = [
  { title: 'Track', start: 0, items: ['Turf', 'Dirt'] },
  { title: 'Distance', start: 2, items: ['Sprint', 'Mile', 'Medium', 'Long'] },
  { title: 'Style', start: 6, items: ['Front', 'Pace', 'Late', 'End'] },
];
</script>

<template>
  <div class="meta-content first">
    <div class="stats">
      <div v-for="(label, i) in statsLabel" :key="label" class="stat">
        <div class="label-stats">
          <span class="icon-wrap">
            <span
              class="png-fill"
              :class="label.toLowerCase()"
              :style="{ '--img': `url(/assets/sprites/white-${label.toLowerCase()}.png)` }"
            ></span>
          </span>
          <span>{{ label }}</span>
        </div>
        <div class="value-stats">
          <img
            :src="`/assets/sprites/letters/${getRankFrom(u.stats[lvlStats][i])}.png`"
            alt="Rank Value"
          />
          <span>{{ u.stats[lvlStats][i] }}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="meta-content">
    <div class="aptitudes">
      <template v-for="row in aptitudes" :key="row.title">
        <div class="apt-label">{{ row.title }}</div>
        <div class="apt-values">
          <div v-for="(it, j) in row.items" :key="it" class="pill">
            <span class="pill-name">{{ it }}</span>
            <img
              :src="`/assets/sprites/letters/${u.aptitudes[row.start + j].toLowerCase()}.png`"
              :alt="u.aptitudes[row.start + j]"
            />
          </div>
        </div>
      </template>
    </div>
  </div>

  <div class="meta-content divider">
    <span class="divider-text">Growth Rate</span>
    <div class="divider-line"></div>
  </div>

  <div class="stats growth-rate">
    <div v-for="(label, i) in statsLabel" :key="label" class="stat">
      <div class="label-stats">
        <span class="icon-wrap">
          <span
            class="png-fill"
            :class="label.toLowerCase()"
            :style="{ '--img': `url(/assets/sprites/white-${label.toLowerCase()}.png)` }"
          ></span>
        </span>
        <span>{{ u.stat_bonus[i] > 0 ? `+${u.stat_bonus[i]}%` : 0 }}</span>
      </div>
    </div>
  </div>
</template>

<style src="./UmaDetailsStats.css" scoped></style>
