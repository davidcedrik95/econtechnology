<template>
    <div class="max-w-xs mx-auto bg-white shadow-xl rounded-lg overflow-hidden border-2 border-blue-600 hover:shadow-2xl transition-shadow duration-300 ease-in-out">
      <div class="w-full h-64 bg-cover bg-center" :style="{ backgroundImage: 'url(' + imageUrl + ')' }"></div>
      <div class="p-6">
        <h3 class="text-2xl font-semibold text-gray-800 mb-2">{{ name }}</h3>
        <p class="text-blue-600 font-medium mb-4">{{ title }}</p>
        <p class="text-gray-600 text-sm mb-4">{{ description }}</p>
        
        <div class="flex items-center justify-between">
          <a :href="'mailto:' + email" class="text-blue-600 hover:text-blue-800">
            <i class="fas fa-envelope mr-2"></i> Kontakt aufnehmen
          </a>
          <a :href="linkedin" class="text-blue-600 hover:text-blue-800">
            <i class="fab fa-linkedin mr-2"></i> LinkedIn
          </a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ManagementCard',
    props: {
      name: String,
      title: String,
      description: String,
      imageUrl: String,
      email: String,
      linkedin: String
    }
  };
  </script>
  
  <style scoped>
  .card-image {
    object-fit: cover;
    height: 200px;
    width: 100%;
  }
  </style>
  