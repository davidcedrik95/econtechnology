<template>
    <v-navigation-drawer permanent>
      <v-list>
        <v-list-item
          v-for="item in menuItems"
          :key="item.name"
          :value="item.path"
          :to="item.path"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </template>
  
  <script setup>
  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Performances', path: '/performances' },
    { name: 'Career', path: '/career' },
    { name: 'About', path: '/about' },
    { name: 'Imprint', path: '/imprint' },
  ];
  </script>