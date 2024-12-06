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

export default router