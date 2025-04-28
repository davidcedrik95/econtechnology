<template>
    <v-list-item 
      v-if="!isMobile"
      @click="changeLanguage(lang.code)"
      :class="{ 'active-nav-item': isActive }"
      :aria-current="isActive ? 'page' : undefined"
    >
      <v-icon class="mr-2">{{ lang.icon }}</v-icon>
      {{ $t(lang.label) }}
    </v-list-item>
    
    <v-list-item
      v-else
      @click="changeLanguage(lang.code)"
      :class="{ 'active-nav-item': isActive }"
      :aria-current="isActive ? 'page' : undefined"
    >
      <v-icon left size="24">{{ lang.icon }}</v-icon>
      <span class="menu-item-text">{{ $t(lang.label) }}</span>
    </v-list-item>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  
  const props = defineProps({
    lang: Object,
    isMobile: Boolean
  })
  
  const emit = defineEmits(['change'])
  
  const { locale } = useI18n()
  
  const isActive = computed(() => locale.value === props.lang.code)
  
  const changeLanguage = (lang) => {
    locale.value = lang
    localStorage.setItem('lang', lang)
    emit('change')
  }
  </script>