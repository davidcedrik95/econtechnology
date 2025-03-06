import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/performances',
      name: 'performances',
      component: () => import('../views/PerformancesView.vue'),
    },
    {
      path: '/career',
      name: 'career',
      component: () => import('../views/CareerView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: () => import('../views/ImprintView.vue'),
    },
  ],
});

export default router;