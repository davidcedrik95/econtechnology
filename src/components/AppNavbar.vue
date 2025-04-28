<template>
  <v-app-bar color="#1A82C1">
    <v-app-bar-title>
      <v-img 
        src="../images/logo.png" 
        alt="Logo" 
        max-height="80" 
        max-width="80" 
        :aria-label="$t('companyLogo')"
      />
    </v-app-bar-title>

    <v-spacer />

    <!-- Desktop Menu -->
    <v-toolbar-items class="d-none d-md-flex">
      <template v-for="item in mainMenuItems" :key="item.to">
        <template v-if="!item.children">
          <v-btn 
            :to="item.to" 
            text 
            :class="{ 'active-desktop-btn': isActiveRoute(item.to) }"
            :aria-current="isActiveRoute(item.to) ? 'page' : undefined"
          >
            <v-icon left>{{ item.icon }}</v-icon>
            {{ $t(item.label) }}
          </v-btn>
        </template>
        <template v-else>
          <v-menu open-on-hover offset-y :key="item.label">
            <template v-slot:activator="{ props }">
              <v-btn
                text
                v-bind="props"
                :class="{ 'active-desktop-btn': hasActiveChild(item) }"
                :aria-haspopup="true"
                :aria-expanded="hasActiveChild(item)"
              >
                <v-icon left>{{ item.icon }}</v-icon>
                {{ $t(item.label) }}
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="child in item.children"
                :key="child.to"
                :to="child.to"
                :class="{ 'active-nav-item': isActiveRoute(child.to) }"
                :aria-current="isActiveRoute(child.to) ? 'page' : undefined"
              >
                <v-list-item-content class="d-flex align-center">
                  <v-icon class="mr-2">{{ child.icon }}</v-icon>
                  <v-list-item-title :class="{ 'font-weight-bold': isActiveRoute(child.to) }">
                    {{ $t(child.label) }}
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </template>

      <!-- Language Selector -->
      <language-selector :is-mobile="false" />
    </v-toolbar-items>

    <!-- Mobile menu toggle -->
    <v-btn 
      icon 
      class="d-md-none" 
      @click="drawer = !drawer"
      :aria-label="$t('toggleMenu')"
      :aria-expanded="drawer"
      size="x-large"
    >
      <v-icon size="32">mdi-menu</v-icon> <!-- Taille augmentée -->
    </v-btn>
  </v-app-bar>

  <!-- Mobile Navigation Drawer -->
  <mobile-navigation-drawer 
    v-model="drawer" 
    :menu-items="mainMenuItems"
    @close="drawer = false"
  />
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import MobileNavigationDrawer from './MobileNavigationDrawer.vue'
import LanguageSelector from './LanguageSelector.vue'

const drawer = ref(false)
const route = useRoute()

const mainMenuItems = computed(() => [
  { 
    to: '/', 
    label: 'home', 
    icon: 'mdi-home' 
  },
  { 
    label: 'leistungen', 
    icon: 'mdi-clipboard-list',
    children: [
      { 
        to: '/performances/elektrotechnik', 
        label: 'elektrotechnik', 
        icon: 'mdi-flash' 
      },
      { 
        to: '/performances/photovoltaik', 
        label: 'photovoltaik', 
        icon: 'mdi-solar-panel' 
      },
      { 
        to: '/performances/industrietechnik', 
        label: 'industrietechnik', 
        icon: 'mdi-factory' 
      }
    ]
  },
  { 
    to: '/career', 
    label: 'career', 
    icon: 'mdi-briefcase' 
  },
  { 
    to: '/about', 
    label: 'about', 
    icon: 'mdi-information' 
  },
  { 
    to: '/imprint', 
    label: 'imprint', 
    icon: 'mdi-bookmark-outline' 
  }
])

const isActiveRoute = (path) => route.path === path
const hasActiveChild = (item) => 
  item.children?.some(child => isActiveRoute(child.to)) ?? false
</script>

<style scoped>
.active-desktop-btn {
  border-bottom: 3px solid #ff7b00;
  color: #ffffff !important;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.1);
}
</style>