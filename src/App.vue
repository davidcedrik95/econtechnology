<template>
  <v-app>
    <AppNavbar/>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <Footer/> <!-- Ajout du footer ici -->
  </v-app>
</template>

<script setup>
import AppNavbar from '@/components/AppNavbar.vue';
import Footer from '@/components/Footer.vue'; // Import du Footer
</script>
