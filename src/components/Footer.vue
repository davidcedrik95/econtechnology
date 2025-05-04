<!-- src/components/Footer.vue -->
<template>
  <v-footer class="footer">
    <v-container>
      <v-row class="align-center">
        <v-col cols="12" md="4" class="text-center text-md-left">
          <h3>Econ Technology</h3>
          <p>{{ $t('footer_desc') }}</p>
        </v-col>

        <v-col cols="12" md="4" class="text-center">
          © 2024 Econ Technology – {{ $t('rights_reserved') }}
        </v-col>

        <v-col cols="12" md="4" class="text-center text-md-right">
          <v-btn to="/privacy-policy" variant="text" class="footer-link">{{ $t('privacy_policy') }}</v-btn>
          <v-btn to="/terms-of-service" variant="text" class="footer-link">{{ $t('terms_of_service') }}</v-btn>
          <div class="social-links">
            <v-btn icon href="https://instagram.com" target="_blank" class="social-btn"><v-icon>mdi-instagram</v-icon></v-btn>
            <v-btn icon href="mailto:info@econ-technology.de" class="social-btn"><v-icon>mdi-email</v-icon></v-btn>
            <v-btn icon href="tel:+49 15561 050775" class="social-btn"><v-icon>mdi-phone</v-icon></v-btn>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-footer>
</template>

<style scoped>
.footer {
  background: linear-gradient(to right, #2469c4, #1A82C1);
  color: white;
  padding: 20px 0;
  font-size: 14px;
}

h3 {
  margin: 0;
  font-size: 18px;
  font-weight: bold;
}

.footer-link {
  color: white !important;
  text-transform: uppercase;
  font-size: 12px;
  margin-right: 10px;
}

.social-links {
  margin-top: 10px;
}

.social-btn {
  margin: 0 5px;
  transition: transform 0.3s ease-in-out;
}

.social-btn:hover {
  transform: scale(1.2) rotate(10deg);
}
</style>
