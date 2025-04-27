<template>
    <div class="project-card">
      <div class="project-image">
        <img :src="image" :alt="title">
      </div>
      <div class="project-content">
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
        <div class="project-tags">
          <span v-for="(tag, index) in tags" :key="index" class="tag">{{ tag }}</span>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ProjectCard',
    props: {
      title: {
        type: String,
        required: true
      },
      description: {
        type: String,
        required: true
      },
      image: {
        type: String,
        required: true
      },
      tags: {
        type: Array,
        default: () => []
      }
    }
  }
  </script>
  
  <style scoped>
  .project-card {
    background: white;
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
  }
  
  .project-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
  
  .project-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
  
  .project-content {
    padding: 20px;
  }
  
  .project-content h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #2c3e50;
  }
  
  .project-content p {
    color: #666;
    line-height: 1.5;
    margin-bottom: 15px;
  }
  
  .project-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .tag {
    background-color: #f0f0f0;
    color: #666;
    padding: 4px 10px;
    border-radius: 20px;
    font-size: 0.8rem;
  }
  </style>