<template>
  <v-container class="pa-0">

    <!-- Hero -->
    <v-parallax :src="heroImage" height="300">
      <v-container class="fill-height d-flex align-center justify-center text-center text-white hero-container">
        <div>
          <h1 class="text-h3 text-h5-sm font-weight-bold mb-4 hero-title" style="color: white;">
            Innovative Energielösungen
          </h1>
          <p class="text-subtitle-1 text-body-1-sm hero-description" style="color: white;">
            Econ Technology – Zukunft gestalten mit intelligenter Technik
          </p>
        </div>
      </v-container>
    </v-parallax>

    <!-- Promo -->
    <v-alert type="info" border="start" class="mt-10" prominent colored-border>
      <v-icon class="mr-2">mdi-information-outline</v-icon>
      <strong>Sonderaktion:</strong> Jetzt kostenlose Beratung für Ihre PV-Anlage sichern!
    </v-alert>

    <!-- Services -->
    <v-container class="py-12">
      <h2 class="text-h4 font-weight-bold text-center mb-10">Unsere Dienstleistungen</h2>
      <v-row justify="center" align="stretch" class="gap-6">
        <v-slide-y-transition group>
          <v-col
            v-for="(service, index) in services"
            :key="index"
            cols="12"
            sm="6"
            md="4"
            class="mb-6"
          >
            <v-hover v-slot="{ isHovering, props }">
              <v-card
                v-bind="props"
                class="pa-6 pt-10 text-center card-with-icon transition"
                :elevation="isHovering ? 12 : 4"
                :class="{ 'hovered-card': isHovering }"
              >
                <v-avatar class="service-icon" size="64" color="primary">
                  <v-icon size="36" color="white">{{ service.icon }}</v-icon>
                </v-avatar>
                <div class="text-h6 font-weight-bold mt-4">{{ service.title }}</div>
                <div class="mt-2 text-body-2 text-grey-darken-1">{{ service.description }}</div>
                <v-btn class="mt-6" color="primary" variant="outlined" rounded @click="navigateTo(service.link)">
                  Mehr erfahren
                </v-btn>
              </v-card>
            </v-hover>
          </v-col>
        </v-slide-y-transition>
      </v-row>
    </v-container>

    <!-- Warum uns wählen -->
    <v-container class="py-12">
      <h2 class="text-h5 font-weight-bold text-center mb-6">Warum Econ Technology?</h2>
      <v-row justify="center" class="text-center">
        <v-col cols="12" sm="4">
          <v-icon size="36" color="primary">mdi-lightbulb-on-outline</v-icon>
          <h3 class="text-subtitle-1 font-weight-bold mt-2">Innovation</h3>
          <p>Lösungen mit neuster Technologie – heute schon an morgen denken.</p>
        </v-col>
        <v-col cols="12" sm="4">
          <v-icon size="36" color="primary">mdi-account-group</v-icon>
          <h3 class="text-subtitle-1 font-weight-bold mt-2">Kundennähe</h3>
          <p>Individuelle Beratung und maßgeschneiderte Konzepte.</p>
        </v-col>
        <v-col cols="12" sm="4">
          <v-icon size="36" color="primary">mdi-leaf</v-icon>
          <h3 class="text-subtitle-1 font-weight-bold mt-2">Nachhaltigkeit</h3>
          <p>Umweltschonende Technologien für eine grüne Zukunft.</p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Blog / Actualités -->
    <v-container class="py-12">
      <h2 class="text-h5 font-weight-bold text-center mb-6">Aktuelles & Neuigkeiten</h2>
      <v-row>
        <v-col v-for="(post, i) in blogPosts" :key="i" cols="12" md="4">
          <v-card class="pa-4">
            <v-img :src="post.image" height="160" class="mb-4" cover />
            <h3 class="text-subtitle-1 font-weight-bold">{{ post.title }}</h3>
            <p class="text-body-2">{{ post.snippet }}</p>
            <v-btn variant="text" class="mt-2 custom-btn" color="primary" @click="navigateTo(post.link)">Mehr lesen</v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Call To Action -->
    <v-container class="py-12 text-center">
      <h2 class="text-h5 font-weight-bold mb-4">Fragen oder Projektideen?</h2>
      <p class="mb-6">Wir helfen Ihnen gerne weiter. Kontaktieren Sie uns – schnell und unverbindlich.</p>
    </v-container>

    <!-- Floating button -->
    <v-btn
      v-bind="$attrs"
      fab
      color="primary"
      @click="navigateTo('/kontakt')"
      class="floating-btn"
    >
      <v-icon>mdi-email</v-icon>
    </v-btn>

    
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const heroImage = '/images/hero-image.jpg' // Remplacez par votre image réelle

const services = [
  { title: 'Elektrotechnik', icon: 'mdi-flash', description: 'Moderne Lösungen im Bereich der Elektrotechnik.', link: '/elektrotechnik' },
  { title: 'Photovoltaik', icon: 'mdi-solar-panel', description: 'Nachhaltige Energie mit hochwertigen PV-Anlagen.', link: '/photovoltaik' },
  { title: 'Industrietechnik', icon: 'mdi-factory', description: 'Effiziente Technik für die Industrieautomatisierung.', link: '/industrietechnik' }
]

const blogPosts = [
  { title: 'Unsere neue PV-Initiative', snippet: 'Erfahren Sie, wie wir mit innovativen PV-Anlagen die Energiewende gestalten.', image: '/images/blog1.png', link: '/blog/pv-initiative' },
  { title: 'Technik trifft Nachhaltigkeit', snippet: 'Einblicke in unsere nachhaltigen Projekte und Lösungen.', image: '/images/blog2.png', link: '/blog/nachhaltigkeit' },
  { title: 'E-Mobilität für Unternehmen', snippet: 'Neue Möglichkeiten für Firmenflotten mit Elektromobilität.', image: '/images/blog3.png', link: '/blog/emobilitaet' }
]

const contact = ref({
  name: '',
  email: '',
  message: ''
})

const form = ref(null)

const navigateTo = (path) => {
  router.push(path)
}

</script>

<style scoped>
@media (max-width: 600px) {
  .hero-title {
    font-size: 1.25rem; /* Réduit la taille du titre sur petits écrans */
  }
  .hero-description {
    font-size: 0.875rem; /* Réduit la taille du texte sur petits écrans */
  }
}

.hero-container {
  background: 
    linear-gradient(45deg, #007bff, #ff7f00, #808080), 
    repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0, 0, 0, 2) 4px, rgba(0, 0, 0, 0) 6px),
    repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0, 0, 0, 1) 4px, rgba(0, 0, 0, 0.5) 6px);
}

.card-with-icon {
  position: relative;
  overflow: visible;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hovered-card {
  transform: translateY(-8px);
}

.service-icon {
  position: absolute;
  top: -32px;
  left: 50%;
  transform: translateX(-50%);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.floating-btn {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 999;
}

.custom-btn {
  color: #007bff; /* Couleur du texte */
  border: 2px solid #007bff; /* Bordure bleue */
  background-color: transparent; /* Pas de fond */
  border-radius: 8px; /* Coins arrondis */
  font-weight: bold; /* Texte en gras */
}

.custom-btn:hover {
  border-color: #0056b3; /* Bordure bleue plus foncée au survol */
  color: #0056b3; /* Texte bleu foncé au survol */
}
</style>

