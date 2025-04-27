<template>
  <v-container class="pa-0">

    <!-- Hero Section for About -->
    <v-parallax :src="aboutHeroImage" height="300">
      <v-container class="fill-height d-flex align-center justify-center text-center text-white hero-container">
        <div>
          <h1 class="text-h3 text-h5-sm font-weight-bold mb-4 hero-title">
            {{ $t('about_us') }}
          </h1>
          <p class="text-subtitle-1 text-body-1-sm hero-description">
            {{ $t('about_econ_technology') }}
          </p>
        </div>
      </v-container>
    </v-parallax>

    <!-- About Us Section with ECON Technology Content -->
    <v-container class="py-12">
      <h2 class="text-h4 font-weight-bold text-center mb-10">{{ $t('company_description') }}</h2>
      <v-row>
        <v-col cols="12">
          <p class="text-body-1">
            {{ $t('econ_technology_description') }}
          </p>
        </v-col>
      </v-row>
    </v-container>

    <!-- Leadership Section -->
    <v-container class="py-12">
      <h2 class="text-h4 font-weight-bold text-center mb-10">{{ $t('management_team') }}</h2>
      <v-row justify="center" class="gap-6">
        <v-col v-for="(leader, index) in leadership" :key="index" cols="12" sm="6" md="4" class="mb-6">
          <v-card class="pa-6 text-center">
            <v-avatar size="100" class="mx-auto mb-4">
              <v-img :src="leader.image" />
            </v-avatar>
            <h3 class="text-h6 font-weight-bold">{{ leader.name }}</h3>
            <p class="text-body-2">{{ leader.position }}</p>
            <p class="text-body-2 text-grey-darken-1">{{ leader.description }}</p>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Call to Action Section -->
    <v-container class="py-12 text-center">
      <h2 class="text-h5 font-weight-bold mb-4">{{ $t('contact_us_for_more') }}</h2>
      <p class="mb-6">{{ $t('contact_us_text') }}</p>
      <v-btn color="primary" @click="navigateTo('/contact')" rounded>
        {{ $t('get_in_touch') }}
      </v-btn>
    </v-container>

  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const aboutHeroImage = '/images/about-hero.jpg'

const leadership = [
  { name: 'Ghassen Bouaziz', position: 'Elektroingenieur (Elektromechanik)', description: 'Erfahrener Elektroingenieur mit umfangreicher Expertise in Elektromechanik.', image: '/images/team/ghassen.jpg' },
  { name: 'Martin Thalhammer', position: 'staatlich geprüfter Techniker (Mechatronik)', description: 'Fachmann in Mechatronik mit langjähriger Erfahrung in der Industrie.', image: '/images/team/martin.png' }
]

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

.hero-title {
  font-size: 2.5rem;
}

.hero-description {
  font-size: 1.2rem;
}

.text-body-2 {
  color: #4f4f4f;
}

.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-8px);
}

.fab {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
}

.team-member-card {
  transition: all 0.3s ease;
}

.team-member-card:hover {
  transform: translateY(-8px);
}

.custom-btn {
  color: #007bff;
  border: 2px solid #007bff;
  background-color: transparent;
  border-radius: 8px;
  font-weight: bold;
}

.custom-btn:hover {
  border-color: #0056b3;
  color: #0056b3;
}
</style>
