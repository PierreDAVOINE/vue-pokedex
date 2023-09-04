import { createApp } from 'vue';
import './style.css';
import { createRouter, createWebHistory } from 'vue-router';

import App from './App.vue';
import Main from './components/Main.vue';
import PokemonPage from './components/PokemonPage.vue';
import NotFound from './components/404.vue';

const app = createApp(App);

// Définition des routes
const routes = [
  {
    path: '/',
    name: 'home',
    component: Main,
  },
  { path: '/pokemon/:slugName', name: 'pokemon', component: PokemonPage },
  { path: '/404', name: 'NotFound', component: NotFound },
  { path: '/:catchAll(.*)', redirect: '/404' }, // Redirection pour toutes les autres URL
];

// Création du router
const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Utilisation du router
app.use(router);

app.mount('#app');
