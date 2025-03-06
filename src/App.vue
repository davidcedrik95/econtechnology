<script setup>
import { RouterView } from 'vue-router';
import Navigator from './components/Navigator.vue';
</script>

<template>
  <v-app>
    <v-app-bar color="primary" dark>
      <v-app-bar-title>Mon Application</v-app-bar-title>
    </v-app-bar>
    <Navigator />
    <v-main>
      <v-container>
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<style scoped>
/* Styles personnalisés si nécessaire */
</style>