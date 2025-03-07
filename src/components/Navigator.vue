<template>
  <v-app-bar color="primary" dark>
    <v-app-bar-title>
      <v-img src="./assets/logo.svg" alt="Logo" max-height="40" max-width="40"></v-img>
    </v-app-bar-title>
    
    <v-spacer></v-spacer>

    <!-- Menu Desktop -->
    <v-toolbar-items class="d-none d-md-flex">
      <v-btn to="/" text>Home</v-btn>
      <v-menu open-on-hover offset-y location="bottom">
        <template v-slot:activator="{ props }">
          <v-btn text v-bind="props">Performances</v-btn>
        </template>
        <v-list>
          <v-list-item to="/performances/elektrotechnik">
            <v-list-item-title>Elektrotechnik</v-list-item-title>
          </v-list-item>
          <v-list-item to="/performances/photovoltaik">
            <v-list-item-title>Photovoltaik</v-list-item-title>
          </v-list-item>
          <v-list-item to="/performances/industrietechnik">
            <v-list-item-title>Industrietechnik</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn to="/career" text>Career</v-btn>
      <v-btn to="/about" text>About</v-btn>
      <v-btn to="/imprint" text>Imprint</v-btn>
    </v-toolbar-items>

    <!-- Bouton Menu Mobile -->
    <v-btn icon class="d-md-none" @click="drawer = !drawer">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>

  <!-- Menu Latéral Mobile -->
  <v-navigation-drawer v-model="drawer" temporary>
    <v-list>
      <v-list-item to="/" @click="drawer = false">
        <v-list-item-title>Home</v-list-item-title>
      </v-list-item>
      <v-list-group>
        <template v-slot:activator="{ props }">
          <v-list-item v-bind="props">
            <v-list-item-title>Performances</v-list-item-title>
          </v-list-item>
        </template>
        <v-list-item to="/performances/elektrotechnik" @click="drawer = false">
          <v-list-item-title>Elektrotechnik</v-list-item-title>
        </v-list-item>
        <v-list-item to="/performances/photovoltaik" @click="drawer = false">
          <v-list-item-title>Photovoltaik</v-list-item-title>
        </v-list-item>
        <v-list-item to="/performances/industrietechnik" @click="drawer = false">
          <v-list-item-title>Industrietechnik</v-list-item-title>
        </v-list-item>
      </v-list-group>
      <v-list-item to="/career" @click="drawer = false">
        <v-list-item-title>Career</v-list-item-title>
      </v-list-item>
      <v-list-item to="/about" @click="drawer = false">
        <v-list-item-title>About</v-list-item-title>
      </v-list-item>
      <v-list-item to="/imprint" @click="drawer = false">
        <v-list-item-title>Imprint</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script setup>
import { ref } from 'vue';

const drawer = ref(false);
</script>
