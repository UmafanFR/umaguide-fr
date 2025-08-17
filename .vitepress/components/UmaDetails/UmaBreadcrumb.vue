<script setup lang="ts">
import { ref, computed, watch, nextTick } from 'vue';
import { useRouter } from 'vitepress';
import { getActiveUmas } from '../../helpers/UmaDataHelper';
import MdiChevronDown from '../icons/mdiChevronDown.vue';
import UmaIcon from '../UmaImage/UmaSquareIcon.vue';

const props = defineProps<{ slug: string }>();
const router = useRouter();

const options = getActiveUmas().map(u => ({
  value: u.slug,
  name: u.name,
  version: u.version,
  rarity: u.rarity,
  slug: u.slug,
}));

const shown = ref(false);
const query = ref('');
const filterEl = ref<HTMLInputElement | null>(null);

const selectedMd = ref(props.slug);
const current = computed(
  () =>
    options.find(o => o.value === selectedMd.value) ?? { value: props.slug, name: '—', version: '' }
);

const filteredOptions = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return options;
  return options.filter(
    o =>
      (o.name ?? '').toLowerCase().includes(q) ||
      (o.version ?? '').toLowerCase().includes(q) ||
      (o.slug ?? '').toLowerCase().includes(q)
  );
});

/* ---- sync largeur input = largeur menu ---- */
const menuEl = ref<HTMLElement | null>(null);
const inputW = ref<number | null>(null);
let ro: ResizeObserver | null = null;

function syncInputWidth() {
  const el = menuEl.value;
  if (!el) return;
  inputW.value = Math.round(el.getBoundingClientRect().width);
}

function focusAndMeasure() {
  nextTick(() => {
    requestAnimationFrame(() => {
      syncInputWidth();
      filterEl.value?.focus();
      if ('ResizeObserver' in window && menuEl.value) {
        ro?.disconnect();
        ro = new ResizeObserver(syncInputWidth);
        ro.observe(menuEl.value);
      }
    });
  });
}

watch(shown, v => {
  if (v) {
    query.value = '';
    focusAndMeasure();
  } else {
    query.value = '';
    ro?.disconnect();
    ro = null;
    inputW.value = null;
  }

  // scroll-lock
  if (typeof document !== 'undefined') {
    document.documentElement.classList.toggle('modal-open', v);
  }
});

function goTo(name: string) {
  if (name !== props.slug) router.go(`/guides/Gameplay/characters/${name}`);
}
</script>

<template>
  <nav class="uma-component breadcrumb">
    <a href="../characters">Liste des personnages</a>
    <span class="separator">›</span>

    <div class="uma-select">
      <VDropdown
        theme="umaguide"
        v-model:shown="shown"
        auto-hide
        placement="bottom-start"
        :distance="6"
        no-auto-focus
        @apply-show="focusAndMeasure"
      >
        <!-- Trigger: bouton fermé, input ouvert -->
        <span>
          <button v-if="!shown" type="button" :aria-expanded="shown" @click="shown = true">
            <span class="name">{{ current.name }}</span>
            <span v-if="current.version" class="uma-version">{{ current.version }}</span>
            <MdiChevronDown class="chevron" />
          </button>

          <input
            v-else
            ref="filterEl"
            v-model="query"
            type="search"
            :aria-expanded="shown"
            placeholder="Rechercher…"
            :style="inputW ? { width: inputW + 'px' } : undefined"
            autofocus
            @keydown.esc.prevent="shown = false"
          />
        </span>

        <template #popper="{ hide }">
          <ul
            ref="menuEl"
            class="menu"
            role="listbox"
            :aria-activedescendant="`opt-${current.value}`"
          >
            <li
              v-for="opt in filteredOptions"
              :key="opt.value"
              class="item"
              role="option"
              :id="`opt-${opt.value}`"
              :aria-selected="opt.value === current.value"
              @click="
                goTo(opt.value);
                hide();
              "
            >
              <UmaIcon :slug="opt.slug" />
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
                    alt=""
                  />
                </div>
              </div>
            </li>
            <li v-if="filteredOptions.length === 0" class="item empty" aria-disabled="true">
              Aucun résultat
            </li>
          </ul>
        </template>
      </VDropdown>

      <Teleport to="body">
        <div v-show="shown" class="uma-backdrop" @click="shown = false"></div>
      </Teleport>
    </div>
  </nav>
</template>

<style src="./UmaBreadcrumb.css" scoped></style>
