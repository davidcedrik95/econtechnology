import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Importer Vuetify
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css'; // Icônes Material Design
import 'vuetify/styles'; // Styles de base de Vuetify
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

// Créer une instance de Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

// Créer l'application Vue
const app = createApp(App);

// Utiliser le routeur et Vuetify
app.use(router);
app.use(vuetify);

// Monter l'application
app.mount('#app');