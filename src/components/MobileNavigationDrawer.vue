<template>
    <v-fade-transition>
      <v-navigation-drawer 
        :model-value="modelValue"
        @update:modelValue="$emit('update:modelValue', $event)"
        temporary
        :aria-label="$t('mobileMenu')"
      >
        <v-list dense nav>
          <template v-for="item in menuItems" :key="item.to || item.label">
            <template v-if="!item.children">
              <v-list-item
                :to="item.to"
                @click="$emit('close')"
                :class="{ 'active-nav-item': isActiveRoute(item.to) }"
                :aria-current="isActiveRoute(item.to) ? 'page' : undefined"
              >
                <v-list-item-content class="d-flex align-center">
                  <v-icon class="hover-icon mr-3" size="28">{{ item.icon }}</v-icon>
                  <v-list-item-title :class="{ 'font-weight-bold': isActiveRoute(item.to) }" class="mobile-menu-text">
                    {{ $t(item.label) }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </template>
            <template v-else>
              <v-list-group>
                <template v-slot:activator="{ props }">
                  <v-list-item v-bind="props">
                    <v-icon left size="28" class="mr-3">{{ item.icon }}</v-icon>
                    <span class="menu-item-text">{{ $t(item.label) }}</span>
                  </v-list-item>
                </template>
                <v-list-item
                  v-for="child in item.children"
                  :key="child.to"
                  :to="child.to"
                  @click="$emit('close')"
                  :class="{ 'active-nav-item': isActiveRoute(child.to) }"
                  :aria-current="isActiveRoute(child.to) ? 'page' : undefined"
                >
                  <v-icon left size="28" class="mr-3">{{ child.icon }}</v-icon>
                  <span class="menu-item-text">{{ $t(child.label) }}</span>
                </v-list-item>
              </v-list-group>
            </template>
          </template>
          
          <language-selector :is-mobile="true" @change="$emit('close')" />
        </v-list>
      </v-navigation-drawer>
    </v-fade-transition>
  </template>
  
  <script setup>
  import { useRoute } from 'vue-router'
  import LanguageSelector from './LanguageSelector.vue'
  
  const props = defineProps({
    modelValue: Boolean,
    menuItems: Array
  })
  
  const emit = defineEmits(['update:modelValue', 'close'])
  const route = useRoute()
  
  const isActiveRoute = (path) => route.path === path
  </script>
  
  <style scoped>
  .active-nav-item {
    background-color: rgba(0, 0, 0, 0.1);
    border-left: 4px solid #000000;
    font-weight: bold;
  }
  
  .hover-icon {
    transition: color 0.3s ease;
  }
  
  .v-list-item:hover .hover-icon {
    color: #333333;
  }
  
  .v-list-item .hover-icon {
    color: #000000;
  }
  
  .mobile-menu-text {
    font-size: 28px;
    color: #000000;
  }
  
  .menu-item-text {
    font-size: 16px;
    color: #000000;
  }
  
  .font-weight-bold {
    font-weight: bold;
  }
  
  /* Ajustements supplémentaires pour les icônes */
  .v-icon {
    color: #000000 !important;
  }
  
  /* Espacement amélioré */
  .v-list-item {
    padding-top: 12px;
    padding-bottom: 12px;
  }
  </style>