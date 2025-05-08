<template>
  <v-container class="pa-0">
    <!-- Orange Banner -->
    <div class="orange-banner"></div>

    <!-- Hero Section -->
    <section class="hero-section">
      <v-img
        :src="heroImage"
        gradient="to top right, rgba(243, 146, 0, .7), rgba(0,0,0,.6)"
        height="100vh"
        min-height="600"
        cover
      >
        <v-container class="fill-height">
          <v-row align="center" justify="center">
            <v-col cols="12" md="8" class="text-center">
              <div class="hero-content">
                <h1 
                  class="hero-title text-h1 text-md-h2 text-lg-h1 font-weight-black mb-6"
                  v-animate-on-scroll="{ animation: 'fadeInDown', delay: 100 }"
                >
                  <span class="title-line">{{ $t('innovative_energy_solutions') }}</span>
                </h1>
                
                <p 
                  class="hero-subtitle text-h5 text-md-h6 text-lg-h5 mb-8"
                  v-animate-on-scroll="{ animation: 'fadeInUp', delay: 300 }"
                >
                  {{ $t('econ_technology') }}
                </p>
                
                <div 
                  class="hero-actions"
                  v-animate-on-scroll="{ animation: 'fadeInUp', delay: 500 }"
                >
                  <v-btn
                    x-large
                    rounded
                    color="accent"
                    class="mr-4 mb-2 action-btn"
                    elevation="0"
                    @click="navigateTo('/leistungen')"
                  >
                    {{ $t('our_services') }}
                    <v-icon end>mdi-arrow-right</v-icon>
                  </v-btn>
                  <v-btn
                    x-large
                    rounded
                    outlined
                    color="white"
                    class="action-btn"
                    elevation="0"
                    @click="navigateTo('/contact')"
                  >
                    {{ $t('contact_us') }}
                  </v-btn>
                </div>
              </div>
            </v-col>
          </v-row>
        </v-container>
        
        <div 
          class="scroll-hint"
          v-animate-on-scroll="{ animation: 'bounceIn', delay: 800, infinite: true }"
        >
          <v-icon large color="white">mdi-chevron-double-down</v-icon>
        </div>
      </v-img>
    </section>

    <!-- Promo Section -->
    <v-container class="promo-section">
      <v-alert
        border="start"
        colored-border
        color="accent"
        elevation="2"
        class="promo-alert"
      >
        <template v-slot:prepend>
          <v-avatar color="accent" size="40">
            <v-icon color="white">mdi-flash</v-icon>
          </v-avatar>
        </template>
        <div class="d-flex flex-column flex-md-row align-center">
          <div class="promo-text">
            <strong class="text-h6">{{ $t('special_offer') }}:</strong>
            <span class="ml-2">{{ $t('free_consultation') }}</span>
          </div>
          <v-spacer></v-spacer>
          <v-btn
            color="accent"
            class="ml-md-4 mt-2 mt-md-0"
            rounded
            @click="navigateTo('/contact')"
          >
            {{ $t('get_in_touch') }}
          </v-btn>
        </div>
      </v-alert>
    </v-container>

    <!-- Services Section -->
    <section class="services-section py-12">
      <v-container>
        <div class="section-header text-center mb-12">
          <h2 class="section-title text-h3 font-weight-bold">{{ $t('our_services') }}</h2>
          <p class="section-subtitle text-h6 text-grey-darken-1 mt-2">
            {{ $t('econ_technology') }}
          </p>
        </div>
        
        <v-row class="services-grid">
          <v-col
            v-for="(service, index) in services"
            :key="index"
            cols="12"
            sm="6"
            lg="4"
          >
            <v-card
              class="service-card"
              elevation="4"
              @mouseenter="hoveredService = index"
              @mouseleave="hoveredService = null"
            >
              <div class="service-card-inner" :class="{ 'hovered': hoveredService === index }">
                <div class="service-icon-wrapper">
                  <div class="service-icon-bg"></div>
                  <v-icon size="48" class="service-icon">{{ service.icon }}</v-icon>
                </div>
                <h3 class="service-title text-h5 font-weight-bold mt-6">{{ $t(service.title) }}</h3>
                <p class="service-description text-body-1 mt-4">{{ $t(service.description) }}</p>
                <v-btn
                  variant="text"
                  color="accent"
                  class="service-link mt-6"
                  @click="navigateTo(service.link)"
                >
                  {{ $t('learn_more') }}
                  <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Why Choose Us Section -->
    <section class="features-section py-12">
      <v-container>
        <div class="section-header text-center mb-12">
          <h2 class="section-title text-h3 font-weight-bold">{{ $t('why_econ_technology') }}</h2>
          <p class="section-subtitle text-h6 text-grey-darken-1 mt-2">
            {{ $t('econ_technology_description') }}
          </p>
        </div>
        
        <v-row class="features-grid">
          <v-col
            v-for="(feature, index) in features"
            :key="index"
            cols="12"
            md="4"
            class="feature-item"
          >
            <div class="feature-card">
              <div class="feature-icon-wrapper">
                <v-icon size="48" color="accent">{{ feature.icon }}</v-icon>
              </div>
              <h3 class="feature-title text-h5 font-weight-bold mt-6">{{ $t(feature.title) }}</h3>
              <p class="feature-description text-body-1 mt-4">{{ $t(feature.description) }}</p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Blog Section -->
    <section class="blog-section py-12">
      <v-container>
        <div class="section-header text-center mb-6">
          <h2 class="section-title text-h3 font-weight-bold">{{ $t('news_and_updates') }}</h2>
          <v-btn
            variant="text"
            color="accent"
            class="mt-2"
            @click="navigateTo('/blog')"
          >
            {{ $t('view_all_articles') }}
            <v-icon right>mdi-arrow-right</v-icon>
          </v-btn>
        </div>
        
        <v-row class="blog-grid">
          <v-col
            v-for="(post, index) in blogPosts"
            :key="index"
            cols="12"
            md="4"
          >
            <v-card
              class="blog-card"
              elevation="4"
              @click="navigateTo(post.link)"
            >
              <div class="blog-image-wrapper">
                <v-img
                  :src="post.image"
                  height="240"
                  cover
                  class="blog-image"
                ></v-img>
                <div class="blog-badge">{{ $t('new') }}</div>
              </div>
              <div class="blog-content pa-6">
                <h3 class="blog-title text-h6 font-weight-bold">{{ $t(post.title) }}</h3>
                <p class="blog-excerpt text-body-2 mt-2">{{ $t(post.snippet) }}</p>
                <v-btn
                  variant="text"
                  color="accent"
                  class="blog-link mt-4 px-0"
                  @click.stop="navigateTo(post.link)"
                >
                  {{ $t('learn_more') }}
                  <v-icon right>mdi-arrow-right</v-icon>
                </v-btn>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Partners Section -->
    <section id="partners" class="my-16">
      <v-container>
        <v-row>
          <v-col cols="12" class="text-center mb-8">
            <h2 class="section-title text-h3 font-weight-bold">
              {{ $t('our_partners_title') }}
            </h2>
            <p class="section-subtitle text-h6 text-grey-darken-1 mt-2">
              {{ $t('our_partners_subtitle') }}
            </p>
          </v-col>

          <v-col cols="12" class="text-center">
            <v-img
              src="/images/logo.png"
              max-width="200"
              class="mx-auto animated-logo"
            />
            <p class="mt-4 font-italic">
              {{ $t('partners_coming_soon') }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section py-12">
      <v-container>
        <div class="section-header text-center mb-12">
          <h2 class="section-title text-h3 font-weight-bold">{{ $t('testimonials') }}</h2>
          <p class="section-subtitle text-h6 text-grey-darken-1 mt-2">
            {{ $t('testimonials_subtitle') }}
          </p>
        </div>
        
        <v-slide-group
          v-model="testimonialSlide"
          class="testimonials-slider"
          show-arrows
        >
          <v-slide-group-item
            v-for="(testimonial, index) in testimonials"
            :key="index"
          >
            <v-card
              class="testimonial-card ma-2"
              elevation="4"
              height="100%"
            >
              <div class="testimonial-content pa-6">
                <div class="testimonial-rating mb-4">
                  <v-icon
                    v-for="n in 5"
                    :key="n"
                    color="amber"
                    size="20"
                  >
                    mdi-star
                  </v-icon>
                </div>
                <p class="testimonial-text text-body-1">"{{ $t(testimonial.quote) }}"</p>
                <div class="testimonial-author mt-6">
                  <div>
                    <div class="text-subtitle-1 font-weight-bold">{{ $t(testimonial.name) }}</div>
                    <div class="text-caption text-grey">{{ $t(testimonial.role) }}</div>
                  </div>
                </div>
              </div>
            </v-card>
          </v-slide-group-item>
        </v-slide-group>
      </v-container>
    </section>

    <!-- FAQ Section -->
    <section class="faq-section py-12">
      <v-container>
        <div class="section-header text-center mb-12">
          <h2 class="section-title text-h3 font-weight-bold">{{ $t('faq_title') }}</h2>
        </div>
        
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-expansion-panels variant="accordion" class="elevation-2">
              <v-expansion-panel
                v-for="(faq, index) in faqs"
                :key="index"
                class="mb-2"
              >
                <v-expansion-panel-title expand-icon="mdi-chevron-down">
                  <v-icon color="accent" start>mdi-help-circle</v-icon>
                  {{ $t(faq.question) }}
                </v-expansion-panel-title>
                <v-expansion-panel-text>
                  {{ $t(faq.answer) }}
                </v-expansion-panel-text>
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- CTA Section -->
    <section class="cta-section py-12">
      <v-container>
        <v-card
          class="cta-card pa-8"
          color="accent"
          dark
          elevation="8"
        >
          <v-row align="center">
            <v-col cols="12" md="8" class="text-center text-md-left">
              <h2 class="cta-title text-h4 font-weight-bold mb-2">{{ $t('questions_or_project_ideas') }}</h2>
              <p class="cta-text text-body-1">{{ $t('contact_us_text') }}</p>
            </v-col>
            <v-col cols="12" md="4" class="text-center text-md-right">
              <v-btn
                x-large
                rounded
                color="white"
                class="cta-button"
                elevation="0"
                @click="navigateTo('/contact')"
              >
                {{ $t('contact_us') }}
                <v-icon right>mdi-arrow-right</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </section>

    <!-- Floating Action Button -->
    <v-btn
      fab
      dark
      color="accent"
      class="fab-button"
      @click="navigateTo('/contact')"
    >
      <v-icon>mdi-email</v-icon>
    </v-btn>
  </v-container>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const hoveredService = ref(null)
const testimonialSlide = ref(0)

// Directive pour les animations
const vAnimateOnScroll = {
  mounted(el, binding) {
    const { animation, delay = 0, duration = 1, infinite = false } = binding.value
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          el.style.animation = `${animation} ${duration}s ease-out ${delay}ms forwards`
          if (infinite) {
            el.style.animationIterationCount = 'infinite'
          }
          observer.unobserve(el)
        }
      })
    }, { threshold: 0.1 })

    observer.observe(el)
  }
}

const heroImage = '/images/hero-image.jpg'

const services = [
  { 
    title: 'electrical_engineering', 
    icon: 'mdi-flash', 
    description: 'electrical_engineering_description', 
    link: '/leistungen/elektrotechnik' 
  },
  { 
    title: 'photovoltaics', 
    icon: 'mdi-solar-panel', 
    description: 'photovoltaics_description', 
    link: '/leistungen/photovoltaik' 
  },
  { 
    title: 'industrial_technology', 
    icon: 'mdi-factory', 
    description: 'industrial_technology_description', 
    link: '/leistungen/industrietechnik' 
  }
]

const features = [
  { 
    title: 'innovation', 
    description: 'innovation_description', 
    icon: 'mdi-lightbulb-on-outline' 
  },
  { 
    title: 'customer_proximity', 
    description: 'customer_proximity_description', 
    icon: 'mdi-account-group' 
  },
  { 
    title: 'sustainability', 
    description: 'sustainability_description', 
    icon: 'mdi-leaf' 
  }
]

const blogPosts = [
  { 
    title: 'new_pv_initiative', 
    snippet: 'new_pv_initiative_description', 
    image: '/images/blog/blog1.png',
    link: '/blog/pv-initiative' 
  },
  { 
    title: 'technology_meets_sustainability', 
    snippet: 'technology_meets_sustainability_description', 
    image: '/images/blog/blog2.png',
    link: '/blog/nachhaltigkeit' 
  },
  { 
    title: 'e_mobility_for_companies', 
    snippet: 'e_mobility_for_companies_description', 
    image: '/images/blog/blog3.png',
    link: '/blog/emobilitaet' 
  }
]

const testimonials = [
  { 
    name: 'testimonial_1_name', 
    role: 'testimonial_1_role', 
    quote: 'testimonial_1_quote' 
  },
  { 
    name: 'testimonial_2_name', 
    role: 'testimonial_2_role', 
    quote: 'testimonial_2_quote' 
  },
  { 
    name: 'testimonial_3_name', 
    role: 'testimonial_3_role', 
    quote: 'testimonial_3_quote' 
  }
]

const faqs = [
  { question: 'faq_question_1', answer: 'faq_answer_1' },
  { question: 'faq_question_2', answer: 'faq_answer_2' },
  { question: 'faq_question_3', answer: 'faq_answer_3' }
]

function navigateTo(link) {
  router.push(link)
}
</script>

<style scoped>
/* Variables CSS */
:root {
  --primary: #0057B8;
  --accent: #F39200; /* Orange Econ Technology */
  --econ-orange: #F39200;
  --econ-dark-orange: #E07F00;
  --dark: #1A237E;
  --light: #E8EAF6;
  --text: #212121;
  --text-secondary: #757575;
}

/* Orange Banner */
.orange-banner {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4px;
  background: var(--econ-orange);
  z-index: 1000;
}

/* Global Styles */
.section-header {
  position: relative;
  margin-bottom: 4rem;
}

.section-title {
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 4px;
  background: var(--accent);
  border-radius: 2px;
}

.section-subtitle {
  max-width: 700px;
  margin: 0 auto;
}

/* Hero Section */
.hero-section {
  position: relative;
  overflow: hidden;
}

.hero-content {
  position: relative;
  z-index: 2;
  padding: 0 1rem;
}

.hero-title {
  line-height: 1.2;
  margin-bottom: 1.5rem;
  color: white;
}

.title-line {
  display: block;
}

.hero-subtitle {
  color: rgba(255, 255, 255, 0.9);
  max-width: 700px;
  margin: 0 auto;
}

.hero-actions {
  margin-top: 2.5rem;
}

.action-btn {
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  transform: translateY(0);
  will-change: transform;
}

.action-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
}

.scroll-hint {
  position: absolute;
  bottom: 30px;
  left: 50%;
  transform: translateX(-50%);
  animation: bounce 2s infinite;
  cursor: pointer;
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0) translateX(-50%);
  }
  40% {
    transform: translateY(-20px) translateX(-50%);
  }
  60% {
    transform: translateY(-10px) translateX(-50%);
  }
}

/* Promo Section */
.promo-section {
  margin-top: -50px;
  position: relative;
  z-index: 10;
}

.promo-alert {
  border-left: 4px solid var(--accent);
  border-radius: 8px;
  backdrop-filter: blur(10px);
  background-color: rgba(255, 255, 255, 0.9) !important;
}

.promo-text {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

/* Services Section */
.services-grid {
  position: relative;
}

.service-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
  height: 100%;
  background: transparent;
}

.service-card-inner {
  padding: 2.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  transition: all 0.3s ease;
}

.service-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
}

.service-card.hovered {
  background: white;
}

.service-icon-wrapper {
  position: relative;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.service-icon-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(243, 146, 0, 0.1);
  border-radius: 50%;
  transform: scale(1);
  transition: all 0.3s ease;
}

.service-card:hover .service-icon-bg {
  transform: scale(1.1);
  background: rgba(243, 146, 0, 0.2);
}

.service-icon {
  z-index: 1;
  color: var(--accent);
}

.service-title {
  color: var(--text);
}

.service-description {
  color: var(--text-secondary);
  flex-grow: 1;
}

.service-link {
  transition: all 0.3s ease;
}

.service-link:hover {
  letter-spacing: 0.5px;
  color: var(--econ-dark-orange) !important;
}

/* Features Section */
.features-section {
  background-color: rgba(243, 146, 0, 0.03);
}

.features-grid {
  position: relative;
}

.feature-item {
  position: relative;
}

.feature-card {
  padding: 2.5rem;
  height: 100%;
  text-align: center;
  transition: all 0.3s ease;
  border-radius: 12px;
}

.feature-card:hover {
  background: white;
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1) !important;
  transform: translateY(-5px);
}

.feature-icon-wrapper {
  display: inline-flex;
  padding: 1.5rem;
  border-radius: 50%;
  background: rgba(243, 146, 0, 0.1);
}

.feature-title {
  color: var(--text);
}

.feature-description {
  color: var(--text-secondary);
}

/* Blog Section */
.blog-grid {
  position: relative;
}

.blog-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
  cursor: pointer;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15) !important;
}

.blog-image-wrapper {
  position: relative;
}

.blog-badge {
  position: absolute;
  top: 20px;
  right: 20px;
  background: var(--accent);
  color: white;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
}

.blog-content {
  padding: 1.5rem;
}

.blog-title {
  color: var(--text);
  transition: all 0.3s ease;
}

.blog-card:hover .blog-title {
  color: var(--accent);
}

.blog-excerpt {
  color: var(--text-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.blog-link {
  transition: all 0.3s ease;
}

.blog-link:hover {
  letter-spacing: 0.5px;
  color: var(--econ-dark-orange) !important;
}

/* Testimonials Section */
.testimonials-section {
  background: linear-gradient(135deg, #f5f7fa 0%, #e8eaf6 100%);
}

.testimonials-slider {
  padding: 1rem 0;
}

.testimonial-card {
  border-radius: 12px;
  width: 340px;
  transition: all 0.3s ease;
}

.testimonial-content {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.testimonial-text {
  flex-grow: 1;
  font-style: italic;
  color: var(--text);
}

.testimonial-author {
  display: flex;
  align-items: center;
}

/* FAQ Section */
.faq-section {
  background-color: #f9f9f9;
}

/* CTA Section */
.cta-card {
  border-radius: 12px;
  overflow: hidden;
  position: relative;
  background: linear-gradient(135deg, var(--econ-orange) 0%, var(--econ-dark-orange) 100%);
}

.cta-card::before {
  content: '';
  position: absolute;
  top: -50%;
  right: -50%;
  width: 200%;
  height: 200%;
  background: radial-gradient(circle, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 70%);
  transform: rotate(30deg);
}

.cta-title {
  position: relative;
}

.cta-text {
  position: relative;
  opacity: 0.9;
}

.cta-button {
  position: relative;
  transition: all 0.3s ease;
}

.cta-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2) !important;
  background: white !important;
  color: var(--econ-orange) !important;
}

/* Partners Section */
.animated-logo {
  animation: pulse 2s infinite ease-in-out;
}

@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
}

/* Floating Action Button */
.fab-button {
  position: fixed !important;
  bottom: 24px;
  right: 24px;
  z-index: 999;
  transform: scale(1);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  background: var(--econ-orange) !important;
  box-shadow: 0 4px 12px rgba(243, 146, 0, 0.3) !important;
}

.fab-button:hover {
  transform: scale(1.1);
  background: var(--econ-dark-orange) !important;
}

/* Responsive Adjustments */
@media (max-width: 960px) {
  .hero-title {
    font-size: 2.5rem !important;
  }
  
  .hero-subtitle {
    font-size: 1.25rem !important;
  }
  
  .section-title {
    font-size: 2rem !important;
  }
  
  .service-card-inner, .feature-card {
    padding: 1.5rem;
  }
}

@media (max-width: 600px) {
  .hero-title {
    font-size: 2rem !important;
  }
  
  .hero-subtitle {
    font-size: 1rem !important;
  }
  
  .hero-actions {
    flex-direction: column;
  }
  
  .action-btn {
    width: 100%;
    margin-right: 0 !important;
    margin-bottom: 1rem;
  }
  
  .promo-alert {
    text-align: center;
  }
  
  .promo-text {
    justify-content: center;
    margin-bottom: 1rem;
  }
  
  .section-title {
    font-size: 1.75rem !important;
  }
  
  .testimonial-card {
    width: 280px;
  }
}
</style>