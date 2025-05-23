import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import i18n from './i18n';
import { createPinia } from 'pinia'; // Importez Pinia

// Importer Vuetify
import { createVuetify } from 'vuetify';
import '@mdi/font/css/materialdesignicons.css'; // Icônes Material Design
import 'vuetify/styles'; // Styles de base de Vuetify
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';
import 'animate.css/animate.min.css'

// Créer une instance de Vuetify
const vuetify = createVuetify({
  components,
  directives,
});

// Créer l'application Vue
const app = createApp(App);
const pinia = createPinia();

app.use(pinia); // Utilisez Pinia

// Utiliser le routeur et Vuetify
app.use(router);
app.use(vuetify);
app.use(i18n);

// Monter l'application
app.mount('#app');
