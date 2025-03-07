<template>
  <v-app>
    <!-- Utilisation du composant Navigator -->
    <Navigator />
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import Navigator from '@/components/Navigator.vue'; // Importez le composant Navigator
</script>

<style>
/* Dans App.vue ou un fichier CSS global */
.v-application {
  background-color: #f5f5f5; /* Exemple de style de débogage */
}
</style>