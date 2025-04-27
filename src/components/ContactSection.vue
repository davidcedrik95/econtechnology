<template>
    <section class="contact-section">
      <div class="container">
        <div class="contact-content">
          <h2>{{ title }}</h2>
          <div class="contact-methods">
            <div class="contact-info">
              <div class="info-item">
                <v-icon name="mdi-phone" />
                <span>+49 123 456 789</span>
              </div>
              <div class="info-item">
                <v-icon name="mdi-email" />
                <span>info@econ-technology.de</span>
              </div>
              <div class="info-item">
                <v-icon name="mdi-map-marker" />
                <span>Musterstraße 123, 80331 München</span>
              </div>
            </div>
            <button class="contact-button">{{ buttonText }}</button>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ContactSection',
    props: {
      title: {
        type: String,
        required: true
      },
      buttonText: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .contact-section {
    padding: 80px 0;
    background-color: #2c3e50;
    color: white;
    text-align: center;
  }
  
  .contact-content h2 {
    font-size: 2.2rem;
    margin-bottom: 40px;
  }
  
  .contact-methods {
    max-width: 600px;
    margin: 0 auto;
  }
  
  .contact-info {
    margin-bottom: 30px;
  }
  
  .info-item {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    margin-bottom: 15px;
    font-size: 1.1rem;
  }
  
  .contact-button {
    padding: 12px 30px;
    font-size: 1.1rem;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;
  }
  
  .contact-button:hover {
    background-color: #369f6e;
    transform: translateY(-2px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  }
  
  @media (max-width: 768px) {
    .contact-content h2 {
      font-size: 1.8rem;
    }
    
    .info-item {
      font-size: 1rem;
    }
  }
  </style>