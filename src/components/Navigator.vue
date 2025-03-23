<template>
  <v-app-bar color="#1A82C1">
    <v-app-bar-title>
      <v-img src="../images/logo.png" alt="Logo" max-height="80" max-width="80" />
    </v-app-bar-title>

    <v-spacer />

    <!-- Desktop Menu -->
    <v-toolbar-items class="d-none d-md-flex">
      <v-btn
        to="/"
        text
        :class="{ 'active-desktop-btn': isActiveRoute('/') }"
      >
        <v-icon left class="icon-color-white">mdi-home</v-icon>
        {{ $t('home') }}
      </v-btn>

      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ props }">
          <v-btn
            text
            v-bind="props"
            :class="{ 'active-desktop-btn': leistungenItems.some(item => isActiveRoute(item.to)) }"
          >
            <v-icon left>mdi-clipboard-list</v-icon>
            {{ $t('leistungen') }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            v-for="item in leistungenItems"
            :key="item.to"
            :to="item.to"
            :class="{ 'active-nav-item': isActiveRoute(item.to) }"
          >
            <v-list-item-content class="d-flex align-center">
              <v-icon class="mr-2">{{ item.icon }}</v-icon>
              <v-list-item-title :class="{ 'font-weight-bold': isActiveRoute(item.to) }">
                {{ $t(item.label) }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn
        to="/career"
        text
        :class="{ 'active-desktop-btn': isActiveRoute('/career') }"
      >
        <v-icon left>mdi-briefcase</v-icon>
        {{ $t('career') }}
      </v-btn>

      <v-btn
        to="/about"
        text
        :class="{ 'active-desktop-btn': isActiveRoute('/about') }"
      >
        <v-icon left>mdi-information</v-icon>
        {{ $t('about') }}
      </v-btn>

      <v-btn
        to="/imprint"
        text
        :class="{ 'active-desktop-btn': isActiveRoute('/imprint') }"
      >
        <v-icon left>mdi-bookmark-outline</v-icon>
        {{ $t('imprint') }}
      </v-btn>

      <!-- Langue -->
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ props }">
          <v-btn text v-bind="props" class="d-flex align-center">
            <v-icon left class="mr-2">mdi-earth</v-icon>
            {{ $t('language') }}
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            @click="changeLanguage('de')"
            :class="{ 'active-nav-item': locale.value === 'de' }"
          >
            <v-icon class="mr-2">mdi-flag</v-icon>
            {{ $t('deutsch') }}
          </v-list-item>
          <v-list-item
            @click="changeLanguage('en')"
            :class="{ 'active-nav-item': locale.value === 'en' }"
          >
            <v-icon class="mr-2">mdi-flag-outline</v-icon>
            {{ $t('english') }}
          </v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>

    <!-- Mobile menu toggle -->
    <v-btn icon class="d-md-none" @click="drawer = !drawer"><v-icon>mdi-menu</v-icon></v-btn>
  </v-app-bar>

  <!-- Mobile Navigation Drawer with Fade -->
  <v-fade-transition>
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list dense nav>
        <v-list-item
          v-for="item in mobileMenu"
          :key="item.to"
          :to="item.to"
          @click="drawer = false"
          :class="{ 'active-nav-item': isActiveRoute(item.to) }"
        >
          <v-list-item-content class="d-flex align-center">
            <v-icon class="hover-icon mr-2">{{ item.icon }}</v-icon>
            <v-list-item-title :class="{ 'font-weight-bold': isActiveRoute(item.to) }" class="mobile-menu-text">
              {{ $t(item.label) }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <!-- Leistungen Group -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <v-icon left size="24">mdi-clipboard-list</v-icon>
              <span class="ml-2 menu-item-text">{{ $t('leistungen') }}</span>
            </v-list-item>
          </template>
          <v-list-item
            v-for="item in leistungenItems"
            :key="item.to"
            :to="item.to"
            @click="drawer = false"
            :class="{ 'active-nav-item': isActiveRoute(item.to) }"
          >
            <v-icon left size="24">{{ item.icon }}</v-icon>
            <span class="ml-2 menu-item-text">{{ $t(item.label) }}</span>
          </v-list-item>
        </v-list-group>

        <!-- Langues -->
        <v-list-group>
          <template v-slot:activator="{ props }">
            <v-list-item v-bind="props">
              <v-icon left size="24">mdi-earth</v-icon>
              <span class="ml-2 menu-item-text">{{ $t('language') }}</span>
            </v-list-item>
          </template>

          <v-list-item
            @click="changeLanguage('de')"
            :class="{ 'active-nav-item': locale.value === 'de' }"
          >
            <v-icon left size="24">mdi-flag</v-icon>
            <span class="menu-item-text">{{ $t('deutsch') }}</span>
          </v-list-item>
          <v-list-item
            @click="changeLanguage('en')"
            :class="{ 'active-nav-item': locale.value === 'en' }"
          >
            <v-icon left size="24">mdi-flag-outline</v-icon>
            <span class="menu-item-text">{{ $t('english') }}</span>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-fade-transition>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

const drawer = ref(false)
const route = useRoute()
const { locale } = useI18n()

const changeLanguage = (lang) => {
  locale.value = lang
  localStorage.setItem('lang', lang)
}

const savedLang = localStorage.getItem('lang')
if (savedLang) {
  locale.value = savedLang
}

const leistungenItems = [
  { to: '/performances/elektrotechnik', label: 'elektrotechnik', icon: 'mdi-flash' },
  { to: '/performances/photovoltaik', label: 'photovoltaik', icon: 'mdi-solar-panel' },
  { to: '/performances/industrietechnik', label: 'industrietechnik', icon: 'mdi-factory' }
]

const mobileMenu = [
  { to: '/', label: 'home', icon: 'mdi-home' },
  { to: '/career', label: 'career', icon: 'mdi-briefcase' },
  { to: '/about', label: 'about', icon: 'mdi-information' },
  { to: '/imprint', label: 'imprint', icon: 'mdi-bookmark-outline' }
]

const isActiveRoute = (path) => route.path === path
</script>

<style scoped>
.icon-color-white {
  color: white;
}

.hover-icon {
  transition: color 0.3s ease;
}

.v-list-item:hover .hover-icon {
  color: #1A82C1;
}

.active-nav-item {
  background-color: rgba(26, 130, 193, 0.1);
  border-left: 4px solid #1A82C1;
}

.active-desktop-btn {
  border-bottom: 3px solid #ff7b00;
  color: #ffffff !important;
  font-weight: bold;
  background-color: rgba(255, 255, 255, 0.1);
}

.d-flex {
  display: flex;
}

.align-center {
  align-items: center;
}

.mr-2 {
  margin-right: 8px;
}

.mobile-menu-text {
  font-size: 16px; /* Ajustez la taille du texte pour le menu mobile */
}

.menu-item-text {
  font-size: 14px;
}

.font-weight-bold {
  font-weight: bold;
}
</style>
