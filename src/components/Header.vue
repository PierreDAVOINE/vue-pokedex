<script setup lang="ts">
// import { ref } from 'vue';
import SearchForm from './SearchForm.vue';

// On récupére la props inputSearch
const props = defineProps({
  inputSearch: {
    type: String,
    required: true,
  },
});

// emit permet d'envoyer un événement au parent
// ici on fait le relais entre le composant searchForm et le composant App
const emit = defineEmits(['update:inputSearch']);
const updateInputSearch = (newValue: string) => {
  // Dès qu'on détecte un changement dans l'input on fait remonter l'info plus haut
  emit('update:inputSearch', newValue);
}
</script>

<template>
  <header>
    <div class="header_bg">
      <h1>Pokedex with Vue JS</h1>
    </div>

    <SearchForm :inputSearch="props.inputSearch" @update:inputSearch="updateInputSearch" />

  </header>
</template>

<style scoped lang="scss">
header {
  max-width: 850px;
  margin: 0 auto;

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
}

.header_bg {
  background: no-repeat url(/img/header.png) center top / contain, #ec1d23;
  width: 100%;
  margin: 0 auto;
  height: 6vh;
  position: relative;

  @media screen and (min-width: 720px) {
    height: 16vh;
  }

  @media screen and (min-width: 850px) {
    width: 850px;
  }
}
</style>
