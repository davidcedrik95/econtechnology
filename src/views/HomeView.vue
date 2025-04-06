<template>
  <v-container class="pa-0">

    <!-- Hero Section -->
    <v-parallax :src="heroImage" height="300">
      <v-container class="fill-height d-flex align-center justify-center text-center text-white hero-container">
        <div>
          <h1 class="text-h3 text-h5-sm font-weight-bold mb-4 hero-title" style="color: white;">
            {{ $t('innovative_energy_solutions') }}
          </h1>
          <p class="text-subtitle-1 text-body-1-sm hero-description" style="color: white;">
            {{ $t('econ_technology') }}
          </p>
        </div>
      </v-container>
    </v-parallax>

    <!-- Promo Section -->
    <v-alert type="info" border="start" class="mt-10" prominent colored-border>
      <v-icon class="mr-2">mdi-information-outline</v-icon>
      <strong>{{ $t('special_offer') }}:</strong> {{ $t('free_consultation') }}
    </v-alert>

    <!-- Services Section -->
    <v-container class="py-12">
      <h2 class="text-h4 font-weight-bold text-center mb-10">{{ $t('our_services') }}</h2>
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
                <div class="text-h6 font-weight-bold mt-4">{{ $t(service.title) }}</div>
                <div class="mt-2 text-body-2 text-grey-darken-1">{{ $t(service.description) }}</div>
                <v-btn class="mt-6" color="primary" variant="outlined" rounded @click="navigateTo(service.link)">
                  {{ $t('learn_more') }}
                </v-btn>
              </v-card>
            </v-hover>
          </v-col>
        </v-slide-y-transition>
      </v-row>
    </v-container>

    <!-- Why Choose Us Section -->
    <v-container class="py-12">
      <h2 class="text-h5 font-weight-bold text-center mb-6">{{ $t('why_econ_technology') }}</h2>
      <v-row justify="center" class="text-center">
        <v-col cols="12" sm="4">
          <v-icon size="36" color="primary">mdi-lightbulb-on-outline</v-icon>
          <h3 class="text-subtitle-1 font-weight-bold mt-2">{{ $t('innovation') }}</h3>
          <p>{{ $t('innovation_description') }}</p>
        </v-col>
        <v-col cols="12" sm="4">
          <v-icon size="36" color="primary">mdi-account-group</v-icon>
          <h3 class="text-subtitle-1 font-weight-bold mt-2">{{ $t('customer_proximity') }}</h3>
          <p>{{ $t('customer_proximity_description') }}</p>
        </v-col>
        <v-col cols="12" sm="4">
          <v-icon size="36" color="primary">mdi-leaf</v-icon>
          <h3 class="text-subtitle-1 font-weight-bold mt-2">{{ $t('sustainability') }}</h3>
          <p>{{ $t('sustainability_description') }}</p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Blog Section -->
    <v-container class="py-12">
      <h2 class="text-h5 font-weight-bold text-center mb-6">{{ $t('news_and_updates') }}</h2>
      <v-row>
        <v-col v-for="(post, i) in blogPosts" :key="i" cols="12" md="4">
          <v-card class="pa-4">
            <v-img :src="post.image" height="160" class="mb-4" cover />
            <h3 class="text-subtitle-1 font-weight-bold">{{ $t(post.title) }}</h3>
            <p class="text-body-2">{{ $t(post.snippet) }}</p>
            <v-btn variant="text" class="mt-2 custom-btn" color="primary" @click="navigateTo(post.link)">
              {{ $t('learn_more') }}
            </v-btn>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Call To Action Section -->
    <v-container class="py-12 text-center">
      <h2 class="text-h5 font-weight-bold mb-4">{{ $t('questions_or_project_ideas') }}</h2>
      <p class="mb-6">{{ $t('contact_us_text') }}</p>
    </v-container>

    <!-- Floating Button -->
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
  { title: 'electrical_engineering', icon: 'mdi-flash', description: 'electrical_engineering_description', link: '/elektrotechnik' },
  { title: 'photovoltaics', icon: 'mdi-solar-panel', description: 'photovoltaics_description', link: '/photovoltaik' },
  { title: 'industrial_technology', icon: 'mdi-factory', description: 'industrial_technology_description', link: '/industrietechnik' }
]

const blogPosts = [
  { title: 'new_pv_initiative', snippet: 'new_pv_initiative_description', image: '/images/blog1.png', link: '/blog/pv-initiative' },
  { title: 'technology_meets_sustainability', snippet: 'technology_meets_sustainability_description', image: '/images/blog2.png', link: '/blog/nachhaltigkeit' },
  { title: 'e_mobility_for_companies', snippet: 'e_mobility_for_companies_description', image: '/images/blog3.png', link: '/blog/emobilitaet' }
]

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