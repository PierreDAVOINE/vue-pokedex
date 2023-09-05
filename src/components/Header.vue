<script setup lang="ts">
import SearchForm from './SearchForm.vue';

// On récupére la props inputSearch
const props = defineProps({
  inputSearch: {
    type: String,
    required: true,
  },
  isSearchOpen: {
    type: Boolean,
    required: true,
  },
});

// emit permet d'envoyer un événement au parent
// ici on fait le relais entre le composant searchForm et le composant App
const emit = defineEmits(['update:inputSearch', 'update:isSearchOpen']);

const updateInputSearch = (newValue: string) => {
  // Dès qu'on détecte un changement dans l'input on fait remonter l'info plus haut
  emit('update:inputSearch', newValue);
}
const handleOpenSearch = () => {
  // Dès qu'on clique sur le bouton on fait remonter l'info plus haut
  emit('update:isSearchOpen');
  emit('update:inputSearch', "");
}
</script>

<template>
  <header>
    <button class="button__search" @click="handleOpenSearch">
      <img src="../assets/glass.png" alt="Recherche">
    </button>
    <div class="header_bg">
      <router-link class="card" to="/">
        <h1>Pokedex with Vue JS</h1>
      </router-link>
    </div>
    <SearchForm v-if="isSearchOpen" :inputSearch="props.inputSearch" @update:inputSearch="updateInputSearch"
      :isSearchOpen="isSearchOpen" />
  </header>
</template>

<style scoped lang="scss">
header {
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

  .button__search {
    background: none;
    border: none;
    position: absolute;
    top: 4.5rem;
    left: 27%;
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
      img {
        width: 2.5rem;
        height: 2.5rem;
      }
    }

    @media screen and (min-width: 700px) {
      img {
        width: 3rem;
        height: 3rem;
      }
    }
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
