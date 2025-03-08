<template>
    <v-footer class="footer">
      <v-container>
        <v-row class="align-center">
          
          <!-- Description rapide (à gauche sur grand écran) -->
          <v-col cols="12" md="4" class="text-center text-md-left">
            <h3>Econ Technology</h3>
            <p>Spécialistes en Elektrotechnik, Photovoltaik et Industrietechnik.</p>
          </v-col>
  
          <!-- Copyright (au centre sur grand écran) -->
          <v-col cols="12" md="4" class="text-center">
            © 2024 Econ Technology - Tous droits réservés
          </v-col>
  
          <!-- Mentions légales et réseaux sociaux (à droite sur grand écran) -->
          <v-col cols="12" md="4" class="text-center text-md-right">
            <v-btn to="/privacy-policy" variant="text" class="footer-link">
              Politique de confidentialité
            </v-btn>
            <v-btn to="/terms-of-service" variant="text" class="footer-link">
              Conditions d'utilisation
            </v-btn>
            <div class="social-links">
              <v-btn icon href="https://instagram.com" target="_blank" class="social-btn">
                <v-icon>mdi-instagram</v-icon>
              </v-btn>
              <v-btn icon href="mailto:contact@econtechnology.com" class="social-btn">
                <v-icon>mdi-email</v-icon>
              </v-btn>
              <v-btn icon href="tel:+123456789" class="social-btn">
                <v-icon>mdi-phone</v-icon>
              </v-btn>
            </div>
          </v-col>
  
        </v-row>
      </v-container>
    </v-footer>
  </template>
  
  <style scoped>
  .footer {
    background: linear-gradient(to right, #8d9fae, #bac5ce); /* Dégradé amélioré avec meilleur contraste */
    color: white;
    padding: 20px 0;
    font-size: 14px;
  }
  
  h3 {
    margin: 0;
    font-size: 18px;
    font-weight: bold;
  }
  
  .social-links {
    margin-top: 10px;
  }
  
  .social-btn {
    transition: transform 0.3s ease-in-out;
    margin: 0 5px;
  }
  
  .social-btn:hover {
    transform: scale(1.2) rotate(10deg);
  }
  
  .footer-link {
    color: white !important;
    text-transform: uppercase;
    font-size: 12px;
    margin-right: 10px;
  }
  </style>
  