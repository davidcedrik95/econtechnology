import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Importer Vuetify
import { createVuetify } from 'vuetify'
// import this after install `@mdi/font` package

import '@mdi/font/css/materialdesignicons.css'

import 'vuetify/styles' // Importer les styles de base de Vuetify
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'


const vuetify = createVuetify({
    components,
    directives,
  })

const app = createApp(App)

app.use(router)
app.use(vuetify)

app.mount('#app')
