<template>
  <v-container class="pa-0">

    <!-- Hero Section for About -->
    <v-parallax :src="aboutHeroImage" height="300">
      <v-container class="fill-height d-flex align-center justify-center text-center text-white hero-container">
        <div>
          <h1 class="text-h3 text-h4-sm font-weight-bold mb-4 hero-title">
            {{ $t('about_us') }}
          </h1>
          <p class="text-subtitle-1 text-body-2-sm hero-description">
            {{ $t('about_econ_technology') }}
          </p>
        </div>
      </v-container>
    </v-parallax>

    <!-- About Us Section with ECON Technology Content -->
    <v-container class="py-8 py-md-12">
  <h3 class="text-h4 text-h5-sm font-weight-bold text-center mb-6 mb-md-10">
    <span class="d-none d-md-inline">{{ $t('company_description') }}</span>
    <span class="d-md-none">{{ $t('about_us') }}</span> <!-- Version courte -->
  </h3>
  <v-row>
    <v-col cols="12" md="10" lg="8" class="mx-auto">
      <p class="text-body-1 text-body-2-sm text-center">
        {{ $t('econ_technology_description') }}
      </p>
    </v-col>
  </v-row>
</v-container>

    <!-- Leadership Section -->
    <v-container class="py-8 py-md-12">
      <h2 class="text-h4 text-h5-sm font-weight-bold text-center mb-6 mb-md-10">{{ $t('management_team') }}</h2>
      <v-row justify="center">
        <v-col 
          v-for="(leader, index) in leadership" 
          :key="index" 
          cols="12" 
          sm="10" 
          md="6" 
          lg="4"
          class="d-flex"
        >
          <v-card class="pa-4 pa-md-6 text-center flex-grow-1 team-card">
            <v-avatar size="80" size-md="100" class="mx-auto mb-4">
              <v-img :src="leader.image" />
            </v-avatar>
            <h3 class="text-h6 text-subtitle-1-sm font-weight-bold">{{ leader.name }}</h3>
            <p class="text-body-2 text-caption-sm">{{ leader.position }}</p>
            <p class="text-body-2 text-caption-sm text-grey-darken-1">{{ leader.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Call to Action Section -->
    <v-container class="py-8 py-md-12 text-center">
      <h2 class="text-h5 text-h6-sm font-weight-bold mb-4">{{ $t('contact_us_for_more') }}</h2>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="6">
          <p class="text-body-1 text-body-2-sm mb-6">{{ $t('contact_us_text') }}</p>
          <v-btn color="primary" @click="navigateTo('/contact')" rounded size="large" class="px-8">
            {{ $t('get_in_touch') }}
          </v-btn>
        </v-col>
      </v-row>
    </v-container>

  </v-container>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n()

const aboutHeroImage = '/images/about-hero.jpg'

// Utilisez computed pour que les traductions se mettent à jour automatiquement
const leadership = computed(() => [
  { 
    name: t('ghassen_bouaziz'), 
    position: t('ghassen_position'), 
    description: t('ghassen_description'), 
    image: '/images/team/ghassen.jpg' 
  },
  { 
    name: t('martin_thalhammer'), 
    position: t('martin_position'), 
    description: t('martin_description'), 
    image: '/images/team/martin.png' 
  }
])

const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.hero-container {
  background: linear-gradient(45deg, #42a5f5, #66bb6a),
              repeating-linear-gradient(0deg, transparent, transparent 4px, rgba(0,0,0,0.2) 4px, rgba(0,0,0,0) 6px),
              repeating-linear-gradient(90deg, transparent, transparent 4px, rgba(0,0,0,0.2) 4px, rgba(0,0,0,0) 6px);
}

/* Typographie responsive */
.hero-title {
  font-size: 2.5rem;
  line-height: 1.2;
}

.hero-description {
  font-size: 1.2rem;
  line-height: 1.5;
}

.team-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  height: 100%;
}

.team-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
}

/* Styles pour mobile */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 1.75rem;
  }
  
  .hero-description {
    font-size: 0.9rem;
  }

  .text-h6-sm {
    font-size: 1.1rem !important;
    line-height: 1.3;
  }
  
  .text-body-2-sm {
    font-size: 0.875rem !important;
    line-height: 1.5;
  }
  
  .text-subtitle-1-sm {
    font-size: 0.9rem !important;
  }
  
  .text-caption-sm {
    font-size: 0.75rem !important;
  }

  .v-container {
    padding-left: 16px;
    padding-right: 16px;
  }
}

/* Amélioration de la lisibilité */
.text-body-2 {
  color: #4f4f4f;
  line-height: 1.6;
}

.v-card {
  border-radius: 8px !important;
}
</style>