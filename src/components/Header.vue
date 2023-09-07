<script setup lang="ts">
import SearchForm from './SearchForm.vue';
import { RouteLocationNormalizedLoaded, useRoute } from 'vue-router';

const route = useRoute() as RouteLocationNormalizedLoaded;

// On récupére la props inputSearch
const props = defineProps({
  inputSearch: {
    type: String,
    required: true,
  },
  isSearchOpen: {
    type: Boolean,
    required: true,
  }
});

// emit permet d'envoyer un événement au parent
// ici on fait le relais entre le composant searchForm et le composant App
const emit = defineEmits(['update:inputSearch', 'update:isSearchOpen', 'update:idPokemonAnchor']);

const updateInputSearch = (newValue: string) => {
  // Dès qu'on détecte un changement dans l'input on fait remonter l'info plus haut
  emit('update:inputSearch', newValue);
}
const handleOpenSearch = () => {
  // Dès qu'on clique sur le bouton on fait remonter l'info plus haut
  emit('update:isSearchOpen');
  emit('update:inputSearch', "");
}

const handleResetIdPokemonAnchor = () => {
  emit('update:idPokemonAnchor', 1);
  // On Séléctionne le conteneur de carte et on le force à remonter au top
  const pokemonContainer = document.getElementById('pokemon-container');
  if (pokemonContainer) {
    pokemonContainer.scrollTop = 0;
  }
}
</script>

<template>
  <header>
    <!-- si on est sur la page pokemon ou sur une 404, on affiche le bouton home -->
    <router-link v-if="route.params.slugName || route.path === '/404'" class="button__home" to="/">
      <img src="../assets/home.png" alt="Accueil">
    </router-link>

    <div v-else>
      <button class="button__search" @click="handleOpenSearch">
        <img src="../assets/glass.png" alt="Recherche">
      </button>
      <button class="button__top" @click="handleResetIdPokemonAnchor">
        <img src="../assets/top.png" alt="Retour au début">
      </button>
    </div>

    <div class="header_bg">
      <router-link class="card" to="/">
        <h1>Pokedex</h1>
      </router-link>
    </div>

    <SearchForm v-if="isSearchOpen" :inputSearch="props.inputSearch" @update:inputSearch="updateInputSearch"
      :isSearchOpen="isSearchOpen" />

  </header>
</template>

<style scoped lang="scss">
header {
  width: 100vw;
  max-width: 700px;
  margin: 0 auto;
  position: relative;

  h1 {
    font-size: 1rem;
    margin: 0;
    color: white;
    font-weight: 700;
    display: inline;
    position: absolute;
    top: 0.1rem;
    right: 1rem;

    @media screen and (min-width: 500px) {
      font-size: 1.5rem;
    }

    @media screen and (min-width: 700px) {
      font-size: 2rem;
    }
  }

  .button__search,
  .button__top,
  .button__home {
    background: none;
    border: none;
    position: absolute;
    top: 2.5rem;
    right: 5%;
    cursor: pointer;
    z-index: 10;

    img {
      width: 2rem;
      height: 2rem;

      &:hover {
        transform: scale(1.1);
        filter: drop-shadow(0 0 0.75rem white);
      }
    }

    @media screen and (min-width: 500px) {
      top: 4rem;

      img {
        width: 2.5rem;
        height: 2.5rem;
      }
    }

    @media screen and (min-width: 700px) {
      top: 5rem;

      img {
        width: 3rem;
        height: 3rem;
      }
    }

  }

  .button__search {
    right: 20%;
  }

  .button__top {
    right: 5%;
  }
}

.header_bg {
  background: no-repeat url(/img/header.png) center top /contain, #ec1d23;
  width: 100%;
  margin: 0 auto;
  height: 5rem;
  position: relative;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  border-top: 7px solid black;
  border-right: 7px solid black;
  border-left: 7px solid black;

  @media screen and (min-width: 451px) {
    height: 7rem;
  }

  @media screen and (min-width: 620px) {
    height: 8rem;
  }

  @media screen and (min-width: 705px) {
    background: no-repeat url(/img/header.png) center top /cover, #ec1d23;
    height: 144px;
  }
}
</style>
