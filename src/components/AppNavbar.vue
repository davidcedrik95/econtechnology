<template>
  <v-app-bar class="modern-navbar" color="#1A82C1" elevation="0">
    <!-- Logo avec animation -->
    <v-app-bar-title class="logo-container">
      <v-img 
        src="../images/logo.png" 
        alt="Logo" 
        max-height="80" 
        max-width="80" 
        :aria-label="$t('companyLogo')"
        class="logo-image"
      />
      <div class="logo-aura"></div>
    </v-app-bar-title>

    <v-spacer />

    <!-- Desktop Menu avec effets modernes -->
    <v-toolbar-items class="d-none d-md-flex nav-items">
      <template v-for="item in mainMenuItems" :key="item.to">
        <template v-if="!item.children">
          <v-btn 
            :to="item.to" 
            variant="text"
            class="nav-btn"
            :class="{ 'active-nav-btn': isActiveRoute(item.to) }"
            :aria-current="isActiveRoute(item.to) ? 'page' : undefined"
          >
            <v-icon left size="20">{{ item.icon }}</v-icon>
            <span class="btn-text">{{ $t(item.label) }}</span>
            <span class="nav-underline"></span>
          </v-btn>
        </template>
        <template v-else>
          <v-menu open-on-hover offset-y :key="item.label" transition="slide-y-transition">
            <template v-slot:activator="{ props }">
              <v-btn
                variant="text"
                class="nav-btn"
                v-bind="props"
                :class="{ 'active-nav-btn': hasActiveChild(item) }"
                :aria-haspopup="true"
                :aria-expanded="hasActiveChild(item)"
              >
                <v-icon left size="20">{{ item.icon }}</v-icon>
                <span class="btn-text">{{ $t(item.label) }}</span>
                <v-icon right size="16">mdi-chevron-down</v-icon>
                <span class="nav-underline"></span>
              </v-btn>
            </template>
            <v-list class="dropdown-menu" elevation="4">
              <v-list-item
                v-for="child in item.children"
                :key="child.to"
                :to="child.to"
                :class="{ 'active-dropdown-item': isActiveRoute(child.to) }"
                :aria-current="isActiveRoute(child.to) ? 'page' : undefined"
              >
                <template v-slot:prepend>
                  <v-icon :icon="child.icon" class="mr-3"></v-icon>
                </template>
                <v-list-item-title class="dropdown-item-text">
                  {{ $t(child.label) }}
                </v-list-item-title>
                <div class="dropdown-hover-effect"></div>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>
      </template>

      <!-- Language Selector avec style modernisé -->
      <language-selector :is-mobile="false" class="language-selector" />
    </v-toolbar-items>

    <!-- Bouton mobile avec animation -->
    <v-btn 
      icon 
      class="d-md-none mobile-menu-btn" 
      @click="drawer = !drawer"
      :aria-label="$t('toggleMenu')"
      :aria-expanded="drawer"
      size="x-large"
    >
      <v-icon size="32" class="menu-icon">mdi-menu</v-icon>
      <div class="menu-btn-ripple"></div>
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
.modern-navbar {
  background: linear-gradient(135deg,#0c6399, #1152a7) !important;
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1) !important;
  transition: all 0.3s ease;
  padding: 0 24px;
}

/* Logo avec effet */
.logo-container {
  position: relative;
  padding: 8px 0;
}

.logo-image {
  transition: transform 0.3s ease;
  position: relative;
  z-index: 2;
}

.logo-image:hover {
  transform: scale(1.05);
}

.logo-aura {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  border-radius: 50%;
  z-index: 1;
  opacity: 0;
  transition: opacity 0.3s ease;
}

.logo-container:hover .logo-aura {
  opacity: 1;
}

/* Boutons de navigation */
.nav-items {
  height: 100%;
}

.nav-btn {
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

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  color: white !important;
}

.nav-btn .btn-text {
  position: relative;
  transition: transform 0.3s ease;
}

.nav-btn:hover .btn-text {
  transform: translateY(-2px);
}

.nav-underline {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 3px;
  background: linear-gradient(90deg, #ff7b00, #ffaa00);
  transition: width 0.3s ease, opacity 0.3s ease;
  opacity: 0;
}

.nav-btn:hover .nav-underline {
  width: 100%;
  opacity: 1;
}

.active-nav-btn {
  color: white !important;
  font-weight: 600;
}

.active-nav-btn .nav-underline {
  width: 100%;
  opacity: 1;
  background: #ff7b00;
}

/* Menu déroulant */
.dropdown-menu {
  background: rgba(26, 130, 193, 0.95) !important;
  backdrop-filter: blur(10px);
  border-radius: 8px !important;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  padding: 8px 0;
}

.dropdown-menu .v-list-item {
  min-height: 48px;
  padding: 0 16px;
  position: relative;
  overflow: hidden;
}

.dropdown-item-text {
  font-size: 14px;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  transition: all 0.3s ease;
}

.dropdown-hover-effect {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, rgba(255, 123, 0, 0.2), transparent);
  transform: translateX(-100%);
  transition: transform 0.3s ease;
  z-index: -1;
}

.v-list-item:hover .dropdown-item-text {
  color: white !important;
  transform: translateX(8px);
}

.v-list-item:hover .dropdown-hover-effect {
  transform: translateX(0);
}

.active-dropdown-item {
  background: rgba(255, 123, 0, 0.2) !important;
}

.active-dropdown-item .dropdown-item-text {
  color: white !important;
  font-weight: 600;
}

/* Bouton mobile */
.mobile-menu-btn {
  position: relative;
  color: white !important;
  transition: all 0.3s ease;
}

.menu-icon {
  transition: transform 0.3s ease;
}

.mobile-menu-btn:hover .menu-icon {
  transform: rotate(90deg);
}

.menu-btn-ripple {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transform: scale(0);
  opacity: 0;
  transition: all 0.6s ease;
}

.mobile-menu-btn:hover .menu-btn-ripple {
  transform: scale(1.5);
  opacity: 1;
}

/* Language selector */
.language-selector {
  margin-left: 12px;
  align-self: center;
}

/* Effet au scroll */
.scrolled {
  background: rgba(26, 130, 193, 0.95) !important;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15) !important;
  backdrop-filter: blur(10px);
}

/* Responsive */
@media (max-width: 960px) {
  .modern-navbar {
    padding: 0 16px;
  }
}
</style> 