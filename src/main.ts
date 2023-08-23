import { createApp } from 'vue';
import './style.css';
import { createRouter, createWebHistory } from 'vue-router';

// 1. Define route components.
// These can be imported from other files
import App from './App.vue';
import Main from './components/Main.vue';
import PokemonPage from './components/PokemonPage.vue';

const app = createApp(App);
// 2. Define some routes
// Each route should map to a component.
// We'll talk about nested routes later.
const routes = [
  {
    path: '/',
    name: 'home',
    component: Main,
  },
  { path: '/pokemon', name: 'pokemon', component: PokemonPage },
];

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = createRouter({
  // 4. Provide the history implementation to use. We are using the hash history for simplicity here.
  history: createWebHistory(),
  routes, // short for `routes: routes`
});

// 5. Create and mount the root instance.
// Make sure to _use_ the router instance to make the
// whole app router-aware.
app.use(router);

app.mount('#app');

// createApp(App).mount('#app');
