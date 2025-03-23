<template>
  <v-container>
    <!-- Texte d'introduction en pleine largeur -->
    <v-row justify="center" class="mb-6">
      <v-col cols="12" md="10" class="text-center">
        <h1 class="text-h4 font-weight-bold mb-4 primary--text">
          {{ $t('switch_to_solar') }}
        </h1>
        <p class="text-body-1 text-grey-darken-2 line-height-2">
          {{ $t('discover_solutions') }}
        </p>
        <h3 class="text-h4 font-weight-bold mb-4 mt-4 primary--text">
          {{ $t('our_solutions') }}
        </h3>
      </v-col>
    </v-row>

    <!-- Première ligne avec 2 containers alignés horizontalement -->
    <v-row justify="space-between" class="mb-6">
      <!-- Container gauche : Unsere Lösungen -->
      <v-col cols="12" md="8">
        <v-row justify="start">
          <!-- Unsere Lösungen -->
          <v-col
            v-for="(service, index) in services"
            :key="index"
            cols="12"
            sm="6"
            md="6"
            class="d-flex justify-center mb-6"
          >
            <v-card class="pa-4 rounded-xl d-flex flex-column" elevation="2">
              <v-icon
                :icon="service.icon"
                color="primary"
                size="48"
                class="mb-4 mx-auto"
              />
              <v-card-title class="font-weight-bold text-center primary--text">
                {{ $t(service.title) }}
              </v-card-title>
              <v-card-text class="text-center text-grey-darken-2 line-height-2">
                {{ $t(service.description) }}
              </v-card-text>
              <v-card-actions class="px-0 mt-auto">
                <v-btn color="primary" variant="text" class="text-center border border-primary">
                  {{ $t('learn_more') }}
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>

      <!-- Container droit : Cartes du Berater et Checklist -->
      <v-col cols="12" md="4">
        <v-row>
          <!-- Card Berater -->
          <v-col cols="10" class="mb-6 mx-auto">
            <v-card class="pa-4 rounded-xl" elevation="2">
              <v-row class="d-flex align-start">
                <v-col cols="auto" class="d-flex justify-center align-start">
                  <v-img
                    src="../images/blog1.png"
                    alt="Berater"
                    height="80px"
                    width="80px"
                    class="rounded-circle border-grey"
                  />
                </v-col>
                <v-col class="d-flex flex-column justify-start">
                  <h1 class="text-h6 font-weight-bold mb-1 primary--text">
                    {{ $t('your_advisor') }}
                  </h1>
                  <p class="text-body-2 text-grey-darken-2 line-height-2">
                    {{ $t('advisor_desc') }}
                  </p>
                </v-col>
              </v-row>
              <v-card-actions class="d-flex flex-column align-start mt-4">
                <p class="text-body-2 font-weight-bold text-grey-darken-3">
                  {{ $t('call_us') }}
                </p>
                <v-btn color="primary" class="mt-2 border border-primary">
                  {{ $t('call_us') }}
                </v-btn>
                <p class="text-body-2 mt-2 text-grey-darken-2">
                  <v-icon color="primary" class="mr-2">mdi-phone</v-icon> 01234 567890
                </p>
                <p class="text-body-2 text-grey-darken-2">
                  <strong>{{ $t('opening_hours') }}:</strong><br />
                  Mo–Fr: 9:00–18:00 Uhr
                </p>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- Card Checklist : Unsere Leistungen -->
          <v-col cols="10" class="mb-6 mx-auto">
            <v-card class="pa-4 rounded-xl" elevation="2">
              <v-card-title class="font-weight-bold text-center primary--text">
                {{ $t('our_services') }}
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in performanceItems"
                    :key="index"
                    class="text-grey-darken-2 line-height-2"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        ✅ {{ $t(item) }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Nouvelle Card : Ihre Vorteile mit Photovoltaik -->
          <v-col cols="10" class="mx-auto">
            <v-card class="pa-4 rounded-xl" elevation="2">
              <v-card-title class="font-weight-bold text-center primary--text">
                {{ $t('your_benefits') }}
              </v-card-title>
              <v-card-text>
                <v-list>
                  <v-list-item
                    v-for="(benefit, index) in benefits"
                    :key="index"
                    class="text-grey-darken-2 line-height-2"
                  >
                    <v-list-item-content>
                      <v-list-item-title>
                        ✅ {{ $t(benefit.title) }}
                      </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>

    <!-- Call to Action -->
    <v-row justify="center" class="mt-10">
      <v-col cols="12" md="8" class="text-center">
        <p class="text-body-1 font-weight-medium text-grey-darken-2 line-height-2">
          {{ $t('cta_text') }}
        </p>
        <v-btn color="primary" class="mt-2 custom-border-btn">
          {{ $t('learn_more') }}
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
const services = [
  {
    title: 'komplettlosungen',
    description: 'komplettlosungen_desc',
    icon: 'mdi-package-variant-closed',
  },
  {
    title: 'wallbox',
    description: 'wallbox_desc',
    icon: 'mdi-ev-station',
  },
  {
    title: 'energiespeicher',
    description: 'energiespeicher_desc',
    icon: 'mdi-battery',
  },
  {
    title: 'warmepumpe',
    description: 'warmepumpe_desc',
    icon: 'mdi-heat-pump',
  },
  {
    title: 'monitoring',
    description: 'monitoring_desc',
    icon: 'mdi-monitor-dashboard',
  },
  {
    title: 'solardach',
    description: 'solardach_desc',
    icon: 'mdi-home-roof',
  },
  {
    title: 'elektroinstallation',
    description: 'elektroinstallation_desc',
    icon: 'mdi-flash',
  },
  {
    title: 'erweiterbarkeit',
    description: 'erweiterbarkeit_desc',
    icon: 'mdi-plus-box-multiple',
  },
]

const benefits = [
  { title: 'lower_electricity_costs' },
  { title: 'more_independence' },
  { title: 'climate_protection' },
  { title: 'property_value' },
  { title: 'low_maintenance' },
  { title: 'funding' },
  { title: 'self_sufficiency' },
]

const performanceItems = [
  'kostenlose_beratung',
  'individuelle_planung',
  'optimale_energienutzung',
  'wartung_service',
]
</script>

<style scoped>
/* Styles globaux pour les textes */
.primary--text {
  color: var(--v-primary-base) !important;
}

.text-grey-darken-2 {
  color: #616161;
}

.text-grey-darken-3 {
  color: #424242;
}

.line-height-2 {
  line-height: 1.6;
}

/* Styles pour les cartes */
.v-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.v-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

/* Styles pour les boutons */
.v-btn {
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.v-btn:hover {
  transform: scale(1.05);
  background-color: var(--v-primary-darken-1);
}

/* Styles pour les icônes */
.v-icon {
  transition: transform 0.3s ease;
}

.v-card:hover .v-icon {
  transform: rotate(10deg);
}

/* Bordure personnalisée pour les boutons */
.custom-border-btn {
  border: 2px solid var(--v-primary-base) !important;
}
</style>