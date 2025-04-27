<template>
    <div class="service-card">
      <div class="service-icon">
        <v-icon large :name="icon" />
      </div>
      <h3>{{ title }}</h3>
      <p>{{ description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ServiceCard',
    props: {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      icon: {
        type: String,
        required: true
      }
    }
  }
  </script>
  
  <style scoped>
  .service-card {
    background: white;
    border-radius: 8px;
    padding: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    text-align: center;
    height: 100%;
  }
  
  .service-card:hover {
    transform: translateY(-10px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
  }
  
  .service-icon {
    color: #42b983;
    font-size: 2.5rem;
    margin-bottom: 20px;
  }
  
  .service-card h3 {
    font-size: 1.4rem;
    margin-bottom: 15px;
    color: #2c3e50;
  }
  
  .service-card p {
    color: #666;
    line-height: 1.6;
  }
  
  @media (max-width: 768px) {
    .service-card {
      padding: 20px;
    }
  }
  </style>