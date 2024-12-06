import { createRouter, createWebHistory } from 'vue-router';

import * as Public from '@/views/public'

import * as Auth from '@/views/auth'

const routes = [
  {
    path: '/',
    name: 'public',
    component: Public.PublicLayout,
    children: [
      { path: '/', name: 'home', component: Public.Home },
      { path: '/dashboard', name: 'dashboard', component: Public.Dashboard }
    ]
  },

  // Routes admin, protégées par le guard
  {
    path: '/auth',
    name: 'auth',
    component: Auth.AuthLayout,
    children: [
      { path: '/login', name: 'login', component: Auth.Login },
      { path: '/register', name: 'register', component: Auth.Register },
    ]
  },
  
  // Redirection en cas de route introuvable
  {
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Ajouter une garde de navigation pour vérifier l'authentification
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // Vérifier si l'utilisateur est authentifié
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (isAuthenticated) {
      next();
    } else {
      next('/login');  // Rediriger vers la page de login si non authentifié
    }
  } else {
    next(); // Laisser passer si la route ne nécessite pas d'authentification
  }
});

export default router