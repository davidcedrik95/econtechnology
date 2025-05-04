import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';

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
      component: () => import('@/views/Performances/PerformancesView.vue'),
      children: [
        {
          path: 'elektrotechnik',
          name: 'elektrotechnik',
          component: () => import('@/views/Performances/ElektrotechnikView.vue'),
        },
        {
          path: 'photovoltaik',
          name: 'photovoltaik',
          component: () => import('@/views/Performances/PhotovoltaikView.vue'),
        },
        {
          path: 'industrietechnik',
          name: 'industrietechnik',
          component: () => import('@/views/Performances/IndustrietechnikView.vue'),
        },
      ],
    },
    {
      path: '/career',
      name: 'career',
      component: () => import('@/views/CareerView.vue'),
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('@/views/AboutView.vue'),
    },
    {
      path: '/imprint',
      name: 'imprint',
      component: () => import('@/views/ImprintView.vue'),
    },

    {
      path: '/contact',
      name: 'contact',
      component: () => import('@/views/ContactView.vue'),
    }
  ],
});

export default router;