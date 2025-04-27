<template>
  <v-container class="pa-0">
    <!-- Hero Section for Impressum -->
    <v-parallax :src="aboutHeroImage" height="300">
      <v-container class="fill-height d-flex align-center justify-center text-center text-white hero-container">
        <div>
          <h1 class="text-h3 text-h5-sm font-weight-bold mb-4 hero-title">
            {{ $t('impressum') }}
          </h1>
          <p class="text-subtitle-1 text-body-1-sm hero-description">
            {{ $t('company_impressum_description') }}
          </p>
        </div>
      </v-container>
    </v-parallax>

    <!-- Main Content Container -->
    <v-container class="py-6">
      <!-- First Row - Company Info and Contact Info -->
      <v-row class="mb-6" justify="center">
        <v-col cols="12" md="6" class="pa-4">
          <v-card class="h-100">
            <v-card-title class="d-flex flex-column align-center">
              <v-icon large class="mb-2">mdi-shield-home</v-icon>
              <h3 class="text-h5 font-weight-bold">{{ $t('company_name') }}</h3>
            </v-card-title>
            <v-card-text>
              <p>{{ $t('econ_technology_gmbh') }}</p>
              <h3 class="text-h6 font-weight-bold">{{ $t('registered_office') }}</h3>
              <p>{{ $t('landshuter_strasse') }}</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" class="pa-4">
          <v-card class="h-100">
            <v-card-title class="d-flex flex-column align-center">
              <v-icon large class="mb-2">mdi-phone</v-icon>
              <h3 class="text-h5 font-weight-bold">{{ $t('contact_information') }}</h3>
            </v-card-title>
            <v-card-text>
              <p>{{ $t('contact_phone') }}: +49 15561 050775</p>
              <p>{{ $t('contact_email') }}: <a :href="'mailto:info@econ-technology.de'">info@econ-technology.de</a></p>
              <h3 class="text-h6 font-weight-bold">{{ $t('company_id') }}</h3>
              <p>{{ $t('hrb_number') }}: HRB 13520</p>
              <p>{{ $t('vat_number') }}: DE365540527</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Second Row - Supervisory Authority and Managing Directors -->
      <v-row class="mb-6" justify="center">
        <v-col cols="12" md="6" class="pa-4">
          <v-card class="h-100">
            <v-card-title class="d-flex flex-column align-center">
              <v-icon large class="mb-2">mdi-scale-balance</v-icon>
              <h3 class="text-h5 font-weight-bold">{{ $t('supervisory_authority') }}</h3>
            </v-card-title>
            <v-card-text>
              <p>{{ $t('amtsgericht_straubing') }}</p>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="6" class="pa-4">
          <v-card class="h-100">
            <v-card-title class="d-flex flex-column align-center">
              <v-icon large class="mb-2">mdi-account-group</v-icon>
              <h3 class="text-h5 font-weight-bold">{{ $t('managing_directors') }}</h3>
            </v-card-title>
            <v-card-text>
              <p>{{ $t('ghassen_bouaziz') }} & {{ $t('martin_thalhammer') }}</p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <!-- Third Row - Google Maps (full width) -->
      <v-row class="mb-6" justify="center">
        <v-col cols="12" class="pa-4">
          <v-card>
            <v-card-title class="d-flex flex-column align-center">
              <v-icon large class="mb-2">mdi-map-marker-radius</v-icon>
              <h3 class="text-h5 font-weight-bold">{{ $t('company_location') }}</h3>
            </v-card-title>
            <v-card-text>
              <iframe 
                width="100%" 
                height="400" 
                frameborder="0" 
                style="border:0" 
                :src="'https://www.google.com/maps?q=Landshuter+Str.+194,+94315+Straubing&output=embed'">
              </iframe>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'

const aboutHeroImage = '/images/about-hero.jpg'  // Update with the actual path

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
  box-shadow: 0 10px 20px rgba(0,0,0,0.2) !important;
}

.h-100 {
  height: 100%;
}

/* Responsive adjustments */
@media (max-width: 959px) {
  .hero-title {
    font-size: 2rem;
  }
  
  .hero-description {
    font-size: 1rem;
  }
}
</style>