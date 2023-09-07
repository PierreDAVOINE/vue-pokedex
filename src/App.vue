<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import { Pokemon } from './@types/Pokemons';

const pokemons = ref([] as Pokemon[]);
const inputSearch = ref('' as string);
const pokemonFiltered = ref([] as Pokemon[]);
const isSearchOpen = ref(false);
const idPokemonAnchor = ref(1);

const getPokemons = async () => {
  try {
    // const response = await fetch('https://pokebuildapi.fr/api/v1/pokemon/limit/152');
    const response = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
    const data = await response.json();
    pokemons.value = data;
    pokemonFiltered.value = data;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getPokemons();
})

watch(inputSearch, (newValue: string) => {
  if (newValue.length > 0) {
    pokemonFiltered.value = pokemons.value.filter((pokemon: Pokemon) => {
      return pokemon.name.toLowerCase().includes(newValue.toLowerCase());
    })
  } else {
    pokemonFiltered.value = pokemons.value;
  }
})

const updateInputSearch = (newValue: string) => {
  inputSearch.value = newValue;
}

const updateIsSearchOpen = () => {
  isSearchOpen.value = !isSearchOpen.value;
}

const updateIdPokemonAnchor = (id: number) => {
  idPokemonAnchor.value = id;
}

</script>

<template>
  <div class="app">
    <Header :isSearchOpen="isSearchOpen" :inputSearch="inputSearch" @update:inputSearch="updateInputSearch"
      @update:isSearchOpen="updateIsSearchOpen" @update:idPokemonAnchor="updateIdPokemonAnchor" />
    <router-view :allPokemons="pokemons" :pokemons="pokemonFiltered" :isSearchOpen="isSearchOpen"
      @update:isSearchOpen="updateIsSearchOpen" @update:inputSearch="updateInputSearch" :idPokemonAnchor="idPokemonAnchor"
      @update:idPokemonAnchor="updateIdPokemonAnchor"></router-view>
    <Footer />
  </div>
</template>

<style scoped lang="scss">
.app {
  height: 100vh;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;

}
</style>
