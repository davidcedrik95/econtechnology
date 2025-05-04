<template>
  <!-- Version desktop -->
  <v-menu v-if="!isMobile" open-on-hover offset-y transition="slide-y-transition">
    <template v-slot:activator="{ props }">
      <v-btn
        variant="text"
        class="language-btn"
        v-bind="props"
        aria-label="Change language"
      >
        <v-icon left size="20">mdi-translate</v-icon>
        <span class="btn-text">{{ currentLanguage.toUpperCase() }}</span>
        <v-icon right size="16">mdi-chevron-down</v-icon>
        <span class="nav-underline"></span>
      </v-btn>
    </template>
    
    <v-list class="language-dropdown" elevation="4">
      <v-list-item
        v-for="lang in availableLanguages"
        :key="lang.code"
        @click="changeLanguage(lang.code)"
        :class="{ 'active-language': isActive(lang.code) }"
      >
        <template v-slot:prepend>
          <v-icon :icon="lang.icon" class="mr-3"></v-icon>
        </template>
        <v-list-item-title>{{ lang.label.toUpperCase() }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>

  <!-- Version mobile -->
  <template v-else>
    <v-list-item
      v-for="lang in availableLanguages"
      :key="'mobile-' + lang.code"
      @click="changeLanguage(lang.code)"
    >
      <v-icon left>{{ lang.icon }}</v-icon>
      <v-list-item-title>{{ $t(lang.label) }}</v-list-item-title>
    </v-list-item>
  </template>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const props = defineProps({
  isMobile: Boolean
})

const emit = defineEmits(['change'])

const { locale } = useI18n()

const availableLanguages = [
  { code: 'fr', label: 'french', icon: 'mdi-translate' },
  { code: 'en', label: 'english', icon: 'mdi-translate' },
  { code: 'de', label: 'german', icon: 'mdi-translate' }
]

const currentLanguage = computed(() => locale.value)

const isActive = (langCode) => locale.value === langCode

const changeLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
  emit('change')
}
</script>

<style scoped>
.language-btn {
  color: rgba(255, 255, 255, 0.9) !important;
  font-weight: 500;
  letter-spacing: 0.5px;
  height: 100%;
  border-radius: 0;
  position: relative;
  transition: all 0.3s ease;
  padding: 0 16px;
  text-transform: none;
  font-size: 15px;
}

.language-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

.language-dropdown {
  background: rgba(26, 130, 193, 0.95) !important;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px !important;
}

.active-language {
  background: rgba(255, 123, 0, 0.2) !important;
}
</style>