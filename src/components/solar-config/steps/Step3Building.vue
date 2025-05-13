<template>
  <v-card class="pa-3" elevation="0">
    <v-card-text>
      <v-form ref="form" v-model="valid">
        <div class="mb-4">
          <div class="d-flex align-center">
            <v-btn 
              icon 
              @click="scroll(-1)"
              :disabled="scrollPosition === 0"
              class="mr-2"
            >
              <v-icon>mdi-chevron-left</v-icon>
            </v-btn>

            <div
              class="flex-grow-1"
              ref="scrollContainer"
              style="overflow-x: auto; scroll-behavior: smooth;"
            >
              <div class="d-flex" style="gap: 12px; padding: 4px 0; margin-bottom: 10px;">
                <v-card
                  v-for="type in buildingTypes"
                  :key="type.value"
                  class="pa-2 building-card"
                  :class="{ 'selected-card': formData.buildingType === type.value }"
                  @click="selectBuildingType(type.value)"
                  elevation="1"
                  hover
                  style="min-width: 150px; height: 100px; cursor: pointer;"
                >
                  <v-card-text class="text-center pa-0">
                    <v-icon size="small" :color="formData.buildingType === type.value ? 'primary' : ''">
                      {{ type.icon }}
                    </v-icon>
                    <div class="text-caption mt-1">{{ $t('buildingTypes.' + type.value) }}</div>
                  </v-card-text>
                </v-card>
              </div>
            </div>

            <v-btn 
              icon 
              @click="scroll(1)"
              :disabled="isScrollEnd"
              class="ml-2"
            >
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </div>

          <div v-if="showError" class="text-caption error--text mt-2">
            {{ $t('buildingTypes.error') }}
          </div>
        </div>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';

const props = defineProps({
  formData: { type: Object, required: true }
});

const emit = defineEmits(['validate']);

const valid = ref(false);
const showError = ref(false);
const scrollContainer = ref(null);
const scrollPosition = ref(0);
const maxScroll = ref(0);

const buildingTypes = [
  { value: 'Reihenhaus', icon: 'mdi-home-group' },
  { value: 'Doppelhaushälfte', icon: 'mdi-home-duplex' },
  { value: 'Einfamilienhaus', icon: 'mdi-home' },
  { value: 'Gewerbe', icon: 'mdi-office-building' },
  { value: 'Mehrfamilienhaus', icon: 'mdi-home-city' },
  { value: 'Anderes', icon: 'mdi-home-modern' }
];

const isScrollEnd = computed(() => {
  return scrollPosition.value >= maxScroll.value;
});

const selectBuildingType = (type) => {
  props.formData.buildingType = type;
  validate();
};

const validate = () => {
  valid.value = !!props.formData.buildingType;
  showError.value = !valid.value;
  emit('validate', valid.value);
};

const scroll = (direction) => {
  if (!scrollContainer.value) return;

  const scrollAmount = 200;
  const newPosition = scrollPosition.value + (direction * scrollAmount);

  scrollPosition.value = Math.max(0, Math.min(newPosition, maxScroll.value));
  scrollContainer.value.scrollTo({
    left: scrollPosition.value,
    behavior: 'smooth'
  });
};

const updateMaxScroll = () => {
  if (scrollContainer.value) {
    maxScroll.value = scrollContainer.value.scrollWidth - scrollContainer.value.clientWidth;
  }
};

onMounted(() => {
  updateMaxScroll();
  window.addEventListener('resize', updateMaxScroll);
});
</script>

<style scoped>
.building-card {
  transition: all 0.3s ease;
}

.building-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.selected-card {
  border: 2px solid #1A82C1 !important;
  background-color: rgba(26, 130, 193, 0.05) !important;
}

::-webkit-scrollbar {
  display: none;
}
</style>
