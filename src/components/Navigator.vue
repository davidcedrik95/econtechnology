<template>
  <v-app-bar color="#abb8c3">
    <v-app-bar-title>
      <v-img src="../images/logo.svg" alt="Logo" max-height="40" max-width="40"></v-img>
    </v-app-bar-title>

    <v-spacer></v-spacer>

    <!-- Menu Desktop -->
    <v-toolbar-items class="d-none d-md-flex">
      <v-btn to="/" text class="d-flex align-center">
        <v-icon left size="24" class="icon-color-white">mdi-home</v-icon> <span class="ml-2">Home</span>
      </v-btn>
      <v-menu open-on-hover offset-y location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn text v-bind="props" class="d-flex align-center">
            <v-icon left size="24" class="icon-color-white">mdi-clipboard-list</v-icon> <span class="ml-2">Leistungen</span>
          </v-btn>
        </template>
        <v-list>
          <v-list-item to="/performances/elektrotechnik" class="d-flex align-center">
            <v-icon left size="24" class="icon-color-white">mdi-lightning-bolt</v-icon>
            <span class="ml-2">Elektrotechnik</span>
          </v-list-item>
          <v-list-item to="/performances/photovoltaik" class="d-flex align-center">
            <v-icon left size="24" class="icon-color-white">mdi-solar-power</v-icon>
            <span class="ml-2">Photovoltaik</span>
          </v-list-item>
          <v-list-item to="/performances/industrietechnik" class="d-flex align-center">
            <v-icon left size="24" class="icon-color-white">mdi-cog</v-icon>
            <span class="ml-2">Industrietechnik</span>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn to="/career" text class="d-flex align-center">
        <v-icon left size="24" class="icon-color-white">mdi-briefcase</v-icon> <span class="ml-2">Karriere</span>
      </v-btn>
      <v-btn to="/about" text class="d-flex align-center">
        <v-icon left size="24" class="icon-color-white">mdi-information</v-icon> <span class="ml-2">Über uns</span>
      </v-btn>
      <v-btn to="/imprint" text class="d-flex align-center">
        <v-icon left size="24" class="icon-color-white">mdi-bookmark-outline</v-icon> <span class="ml-2">Impressum</span>
      </v-btn>
    </v-toolbar-items>

    <!-- Bouton Menu Mobile -->
    <v-btn icon class="d-md-none" @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
    
    <!-- Menu déroulant pour la langue (Mobile) -->
    <v-menu v-model="languageMenu" offset-y>
      <template v-slot:activator="{ props }">
        <v-btn icon v-bind="props">
          <v-icon>mdi-language</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item @click="changeLanguage('de')" class="d-flex align-center">
          <v-icon left size="24" class="icon-color">mdi-flag-de</v-icon>
          <span class="ml-2">Deutsch</span>
        </v-list-item>
        <v-list-item @click="changeLanguage('en')" class="d-flex align-center">
          <v-icon left size="24" class="icon-color">mdi-flag-us</v-icon>
          <span class="ml-2">English</span>
        </v-list-item>
      </v-list>
    </v-menu>
  </v-app-bar>

  <!-- Menu Latéral Mobile -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item to="/" @click="drawer = false" class="d-flex align-center">
        <v-icon left size="24" class="icon-color">mdi-home</v-icon>
        <span class="ml-2">Home</span>
      </v-list-item>
      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props" class="d-flex align-center">
            <v-icon left size="24" class="icon-color">mdi-clipboard-list</v-icon>
            <span class="ml-2">Leistungen</span>
          </v-list-item>
        </template>
        <v-list-item to="/performances/elektrotechnik" @click="drawer = false" class="d-flex align-center">
          <v-icon left size="24" class="icon-color">mdi-lightning-bolt</v-icon>
          <span class="ml-2">Elektrotechnik</span>
        </v-list-item>
        <v-list-item to="/performances/photovoltaik" @click="drawer = false" class="d-flex align-center">
          <v-icon left size="24" class="icon-color">mdi-solar-power</v-icon>
          <span class="ml-2">Photovoltaik</span>
        </v-list-item>
        <v-list-item to="/performances/industrietechnik" @click="drawer = false" class="d-flex align-center">
          <v-icon left size="24" class="icon-color">mdi-cog</v-icon>
          <span class="ml-2">Industrietechnik</span>
        </v-list-item>
      </v-list-group>
      <v-list-item to="/career" @click="drawer = false" class="d-flex align-center">
        <v-icon left size="24" class="icon-color">mdi-briefcase</v-icon>
        <span class="ml-2">Karriere</span>
      </v-list-item>
      <v-list-item to="/about" @click="drawer = false" class="d-flex align-center">
        <v-icon left size="24" class="icon-color">mdi-information</v-icon>
        <span class="ml-2">Über uns</span>
      </v-list-item>
      <v-list-item to="/imprint" @click="drawer = false" class="d-flex align-center">
        <v-icon left size="24" class="icon-color">mdi-bookmark-outline</v-icon>
        <span class="ml-2">Impressum</span>
      </v-list-item>

      <!-- Langue dans le menu mobile -->
      <v-list-item @click="changeLanguage('de')" class="d-flex align-center">
  <v-img src="../images/flags/de.png" alt="German Flag" max-width="24" max-height="24"></v-img>
  <span class="ml-2">Deutsch</span>
</v-list-item>
<v-list-item @click="changeLanguage('en')" class="d-flex align-center">
  <v-img src="../images/flags/us.png" alt="US Flag" max-width="24" max-height="24"></v-img>
  <span class="ml-2">English</span>
</v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false);
const languageMenu = ref(false);

// Variable pour gérer la langue
const currentLanguage = ref('en');

// Fonction pour changer la langue
const changeLanguage = (language) => {
  currentLanguage.value = language;
  // Vous pouvez utiliser ici un plugin comme vue-i18n pour gérer le changement de langue
  alert(`Language changed to: ${language === 'en' ? 'English' : 'Deutsch'}`);
};
</script>

<style scoped>
/* Style pour les appareils mobiles */
@media (max-width: 768px) {
  .v-app-bar {
    padding: 10px 16px;
  }

  .v-btn {
    font-size: 14px; /* Ajuster la taille des boutons */
  }
}

/* Style général pour le menu latéral */
.v-navigation-drawer {
  width: 250px;
}

.v-navigation-drawer .v-list-item {
  padding: 16px;
}

.d-flex {
  display: flex;
  align-items: center;
}

.v-list-item-title {
  margin-left: 10px;

}
/* Couleur des icônes */
.icon-color {
  color: #bac5ce;
}

/* Spécifique pour les icônes blanches sur grand écran */
.icon-color-white {
  color: white;
}
</style>
