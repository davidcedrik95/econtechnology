<template>
    <v-menu v-if="!isMobile" open-on-hover offset-y>
      <template v-slot:activator="{ props }">
        <v-btn text v-bind="props" class="d-flex align-center">
          <v-icon left class="mr-2">mdi-earth</v-icon>
          {{ $t('language') }}
        </v-btn>
      </template>
      <v-list>
        <language-item 
          v-for="lang in languages"
          :key="lang.code"
          :lang="lang"
          @change="$emit('change')"
        />
      </v-list>
    </v-menu>
  
    <v-list-group v-else>
      <template v-slot:activator="{ props }">
        <v-list-item v-bind="props">
          <v-icon left size="24">mdi-earth</v-icon>
          <span class="ml-2 menu-item-text">{{ $t('language') }}</span>
        </v-list-item>
      </template>
      <language-item 
        v-for="lang in languages"
        :key="lang.code"
        :lang="lang"
        is-mobile
        @change="$emit('change')"
      />
    </v-list-group>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  import { useI18n } from 'vue-i18n'
  import LanguageItem from './LanguageItem.vue'
  
  defineProps({
    isMobile: Boolean
  })
  
  defineEmits(['change'])
  
  const { locale } = useI18n()
  
  const languages = computed(() => [
    { code: 'de', icon: 'mdi-flag', label: 'deutsch' },
    { code: 'en', icon: 'mdi-flag-outline', label: 'english' }
  ])
  </script>