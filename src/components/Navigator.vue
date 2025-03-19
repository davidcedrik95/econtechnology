<!-- src/components/Navigator.vue -->
<template>
  <v-app-bar color="#1A82C1">
    <v-app-bar-title>
      <v-img src="../images/logo.svg" alt="Logo" max-height="40" max-width="40"></v-img>
    </v-app-bar-title>

    <v-spacer />

    <!-- Desktop Menu -->
    <v-toolbar-items class="d-none d-md-flex">
      <v-btn to="/" text><v-icon left class="icon-color-white">mdi-home</v-icon>{{ $t('home') }}</v-btn>

      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ props }">
          <v-btn text v-bind="props"><v-icon left>mdi-clipboard-list</v-icon>{{ $t('leistungen') }}</v-btn>
        </template>
        <v-list>
          <v-list-item to="/performances/elektrotechnik">{{ $t('elektrotechnik') }}</v-list-item>
          <v-list-item to="/performances/photovoltaik">{{ $t('photovoltaik') }}</v-list-item>
          <v-list-item to="/performances/industrietechnik">{{ $t('industrietechnik') }}</v-list-item>
        </v-list>
      </v-menu>

      <v-btn to="/career" text><v-icon left>mdi-briefcase</v-icon>{{ $t('career') }}</v-btn>
      <v-btn to="/about" text><v-icon left>mdi-information</v-icon>{{ $t('about') }}</v-btn>
      <v-btn to="/imprint" text><v-icon left>mdi-bookmark-outline</v-icon>{{ $t('imprint') }}</v-btn>

      <!-- Desktop Language Switcher -->
      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ props }">
          <v-btn text v-bind="props"><v-icon left>mdi-earth</v-icon>{{ $t('language') }}</v-btn>
        </template>
        <v-list>
          <v-list-item @click="changeLanguage('de')"><v-icon left>mdi-flag</v-icon>{{ $t('deutsch') }}</v-list-item>
          <v-list-item @click="changeLanguage('en')"><v-icon left>mdi-flag-outline</v-icon>{{ $t('english') }}</v-list-item>
        </v-list>
      </v-menu>
    </v-toolbar-items>

    <!-- Mobile Menu -->
    <v-btn icon class="d-md-none" @click="drawer = !drawer"><v-icon>mdi-menu</v-icon></v-btn>
  </v-app-bar>

  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item to="/" @click="drawer = false"><v-icon>mdi-home</v-icon>{{ $t('home') }}</v-list-item>

      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props"><v-icon>mdi-clipboard-list</v-icon>{{ $t('leistungen') }}</v-list-item>
        </template>
        <v-list-item to="/performances/elektrotechnik" @click="drawer = false">{{ $t('elektrotechnik') }}</v-list-item>
        <v-list-item to="/performances/photovoltaik" @click="drawer = false">{{ $t('photovoltaik') }}</v-list-item>
        <v-list-item to="/performances/industrietechnik" @click="drawer = false">{{ $t('industrietechnik') }}</v-list-item>
      </v-list-group>

      <v-list-item to="/career" @click="drawer = false"><v-icon>mdi-briefcase</v-icon>{{ $t('career') }}</v-list-item>
      <v-list-item to="/about" @click="drawer = false"><v-icon>mdi-information</v-icon>{{ $t('about') }}</v-list-item>
      <v-list-item to="/imprint" @click="drawer = false"><v-icon>mdi-bookmark-outline</v-icon>{{ $t('imprint') }}</v-list-item>

      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props"><v-icon>mdi-earth</v-icon>{{ $t('language') }}</v-list-item>
        </template>
        <v-list-item @click="changeLanguage('de')">{{ $t('deutsch') }}</v-list-item>
        <v-list-item @click="changeLanguage('en')">{{ $t('english') }}</v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const drawer = ref(false);

const changeLanguage = (lang) => {
  locale.value = lang;
  localStorage.setItem('lang', lang);
};

// Charger la langue sauvegardée
const savedLang = localStorage.getItem('lang');
if (savedLang) {
  locale.value = savedLang;
}
</script>

<style scoped>
.icon-color-white {
  color: white;
}
</style>
