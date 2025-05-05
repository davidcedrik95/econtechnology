<!-- TEMPLATE SECTION -->
<template>
  <div class="elektrotechnik-view">
    <!-- Hero Banner Section -->
    <HeroSection
      :title="$t('elektrotechnikItem.hero.title')"
      :subtitle="$t('elektrotechnikItem.hero.subtitle')"
      background-image="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
    />

    <!-- Introduction Section -->
    <section class="intro-section">
      <div class="container">
        <h2 class="section-title">{{ $t('elektrotechnikItem.intro.title') }}</h2>
        <p class="section-description">
          {{ $t('elektrotechnikItem.intro.description') }}
        </p>
      </div>
    </section>

    <!-- Services Section -->
    <section class="services-section">
      <div class="container">
        <div class="service-cards">
          <ServiceCard
            v-for="(service, index) in services"
            :key="index"
            :title="$t(`elektrotechnikItem.services.${index}.title`)"
            :description="$t(`elektrotechnikItem.services.${index}.description`)"
            :icon="service.icon"
          />
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="feature-section">
      <div class="container">
        <div class="feature-grid">
          <div class="feature-content">
            <h2>{{ $t('elektrotechnikItem.features.title') }}</h2>
            <p>{{ $t('elektrotechnikItem.features.description') }}</p>
            
            <!-- Feature List -->
            <ul class="feature-list">
              <li v-for="(item, index) in featureItems" :key="index">
                <span class="check-icon">✓</span>
                <span class="item-text">{{ item }}</span>
              </li>
            </ul>
          </div>
          <div class="feature-image">
            <img :src="featureImage" :alt="$t('elektrotechnikItem.features.imageAlt')">
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <section class="projects-section">
      <div class="container">
        <h2 class="section-title">{{ $t('elektrotechnikItem.projects.title') }}</h2>
        <div class="projects-grid">
          <ProjectCard
            v-for="(project, index) in projects"
            :key="index"
            :title="$t(`elektrotechnikItem.projects.list.${index}.title`)"
            :description="$t(`elektrotechnikItem.projects.list.${index}.description`)"
            :image="project.image"
            :tags="project.tags.map(tag => $t(`elektrotechnikItem.tags.${tag}`))"
          />
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <ContactSection
      :title="$t('elektrotechnikItem.contact.title')"
      :button-text="$t('elektrotechnikItem.contact.button')"
    />
  </div>
</template>

<!-- SCRIPT SECTION -->
<script>
import HeroSection from '@/components/HeroSection.vue';
import ServiceCard from '@/components/ServiceCard.vue';
import ProjectCard from '@/components/ProjectCard.vue';
import ContactSection from '@/components/ContactSection.vue';

export default {
  name: 'ElektrotechnikView',
  components: {
    HeroSection,
    ServiceCard,
    ProjectCard,
    ContactSection
  },
  data() {
    return {
      // Static image URLs
      featureImage: "https://images.unsplash.com/photo-1509391366360-2e959784a276?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
     
      // Services data (icons only)
      services: [
        { icon: "mdi-drawing" },
        { icon: "mdi-tools" },
        { icon: "mdi-power-plug" },
        { icon: "mdi-cog" },
        { icon: "mdi-alert-octagon" },
        { icon: "mdi-update" }
      ],
      
      // Projects data
      projects: [
        {
          image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          tags: ["industry", "newConstruction", "energyEfficiency"]
        },
        {
          image: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          tags: ["buildingTechnology", "modernization"]
        },
        {
          image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
          tags: ["medicalTechnology", "safety"]
        }
      ]
    }
  },
  computed: {
    featureItems() {
      // Get items for current language
      const items = this.$t('elektrotechnikItem.features.items');
      
      // Fallback items for each language
      const fallbackItems = {
        en: [
          "Energy efficiency analysis",
          "Sustainable power supply concepts",
          "Integration of renewable energies",
          "Smart grid solutions"
        ],
        de: [
          "Energieeffizienzanalysen",
          "Nachhaltige Stromversorgungskonzepte",
          "Integration erneuerbarer Energien",
          "Smart-Grid-Lösungen"
        ],
        fr: [
          "Analyses d'efficacité énergétique",
          "Concepts d'alimentation électrique durable",
          "Intégration des énergies renouvelables",
          "Solutions de smart grid"
        ]
      };

      // Check if items exist and are in correct format
      if (Array.isArray(items) && items.length > 0) {
        return items;
      }
      
      // Return fallback based on current language
      return fallbackItems[this.$i18n.locale] || fallbackItems.en;
    }
  }


}
</script>

<!-- STYLE SECTION -->
<style scoped>
/* Base Styles */
.elektrotechnik-view {
  color: #333;
}

/* Section Styles */
.section-title {
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
  position: relative;
  display: inline-block;
}

.section-title::after {
  content: '';
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  width: 80px;
  height: 3px;
  background-color: #42b983;
}

.section-description {
  max-width: 800px;
  margin: 0 auto;
  font-size: 1.1rem;
  line-height: 1.6;
  color: #666;
}

/* Intro Section */
.intro-section {
  padding: 80px 0;
  text-align: center;
  background-color: #f9f9f9;
}

/* Services Section */
.services-section {
  padding: 80px 0;
  background-color: white;
}

.service-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

/* Features Section */
.feature-section {
  padding: 80px 0;
  background-color: #f5f7fa;
}

.feature-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px;
  align-items: center;
}

.feature-content h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.feature-content p {
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  color: #666;
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 1.5rem 0;
}

.feature-list li {
  display: flex;
  align-items: flex-start;
  margin-bottom: 0.8rem;
}

.check-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.25rem;
  height: 1.25rem;
  margin-right: 0.75rem;
  margin-top: 0.15rem;
  color: #42b983;
  font-weight: bold;
  flex-shrink: 0;
}

.item-text {
  flex: 1;
  display: inline-block;
  vertical-align: top;
  line-height: 1.5;
}

.feature-image img {
  width: 100%;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

/* Projects Section */
.projects-section {
  padding: 80px 0;
  background-color: white;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 50px;
}

/* Responsive Styles */
@media (max-width: 768px) {
  .feature-grid {
    grid-template-columns: 1fr;
  }
  
  .feature-image {
    order: -1;
  }
  
  .section-title {
    font-size: 2rem;
  }
}
</style>