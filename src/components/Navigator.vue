<template>
  <v-app-bar color="#abb8c3">
    <v-app-bar-title>
      <v-img src="../images/logo.svg" alt="Logo" max-height="40" max-width="40"></v-img>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- Menu Desktop -->
    <v-toolbar-items class="d-none d-md-flex">
      <v-btn to="/" text class="d-flex align-center">
        <v-icon left size="24" class="icon-color-white">mdi-home</v-icon>
        <span class="ml-2">{{ $t('home') }}</span>
      </v-btn>

      <v-menu open-on-hover offset-y>
        <template v-slot:activator="{ props }">
          <v-btn text v-bind="props" class="d-flex align-center">
            <v-icon left size="24" class="icon-color-white">mdi-clipboard-list</v-icon>
            <span class="ml-2">{{ $t('leistungen') }}</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/performances/elektrotechnik" class="d-flex align-center">
            <v-icon left size="24" class="icon-color-white">mdi-lightning-bolt</v-icon>
            <span class="ml-2">{{ $t('elektrotechnik') }}</span>
          </v-list-item>
          <v-list-item to="/performances/photovoltaik" class="d-flex align-center">
            <v-icon left size="24" class="icon-color-white">mdi-solar-power</v-icon>
            <span class="ml-2">{{ $t('photovoltaik') }}</span>
          </v-list-item>
          <v-list-item to="/performances/industrietechnik" class="d-flex align-center">
            <v-icon left size="24" class="icon-color-white">mdi-cog</v-icon>
            <span class="ml-2">{{ $t('industrietechnik') }}</span>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn to="/career" text class="d-flex align-center">
        <v-icon left size="24" class="icon-color-white">mdi-briefcase</v-icon>
        <span class="ml-2">{{ $t('career') }}</span>
      </v-btn>
      <v-btn to="/about" text class="d-flex align-center">
        <v-icon left size="24" class="icon-color-white">mdi-information</v-icon>
        <span class="ml-2">{{ $t('about') }}</span>
      </v-btn>
      <v-btn to="/imprint" text class="d-flex align-center">
        <v-icon left size="24" class="icon-color-white">mdi-bookmark-outline</v-icon>
        <span class="ml-2">{{ $t('imprint') }}</span>
      </v-btn>
    </v-toolbar-items>

    <!-- Menu Mobile -->
    <v-btn icon class="d-md-none" @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Drawer Mobile -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item to="/" @click="drawer = false">
        <v-icon left size="24">mdi-home</v-icon>
        <span class="ml-2">{{ $t('home') }}</span>
      </v-list-item>

      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <v-icon left size="24">mdi-clipboard-list</v-icon>
            <span class="ml-2">{{ $t('leistungen') }}</span>
          </v-list-item>
        </template>
        <v-list-item to="/performances/elektrotechnik" @click="drawer = false">
          <v-icon left size="24">mdi-lightning-bolt</v-icon>
          <span class="ml-2">{{ $t('elektrotechnik') }}</span>
        </v-list-item>
        <v-list-item to="/performances/photovoltaik" @click="drawer = false">
          <v-icon left size="24">mdi-solar-power-variant-outline </v-icon>
          <span class="ml-2">{{ $t('photovoltaik') }}</span>
        </v-list-item>
        <v-list-item to="/performances/industrietechnik" @click="drawer = false">
          <v-icon left size="24">mdi-robot-industrial</v-icon>
          <span class="ml-2">{{ $t('industrietechnik') }}</span>
        </v-list-item>
      </v-list-group>

      <v-list-item to="/career" @click="drawer = false">
        <v-icon left size="24">mdi-briefcase</v-icon>
        <span class="ml-2">{{ $t('career') }}</span>
      </v-list-item>

      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <v-icon left size="24">mdi-earth</v-icon>
            <span class="ml-2">{{ $t('language') }}</span>
          </v-list-item>
        </template>

        <v-list-item @click="changeLanguage('de')">
          <v-icon left size="24">mdi-flag</v-icon>
          <span>{{ $t('deutsch') }}</span>
        </v-list-item>
        <v-list-item @click="changeLanguage('en')">
          <v-icon left size="24">mdi-flag-outline</v-icon>
          <span>{{ $t('english') }}</span>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { locale } = useI18n();
const drawer = ref(false);

const changeLanguage = (lang) => {
  locale.value = lang;
};
</script>
