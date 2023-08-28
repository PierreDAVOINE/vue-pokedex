<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Header from './components/Header.vue'
import { Pokemon } from './@types/Pokemons';

const pokemons = ref([] as Pokemon[]);
const inputSearch = ref('' as string);
const pokemonFiltered = ref([] as Pokemon[]);
const pokemonPage = ref({} as Pokemon);

const getPokemons = async () => {
  try {
    const response = await fetch('https://pokebuildapi.fr/api/v1/pokemon/limit/152');
    // const response = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
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

const updatePokemonPage = (newValue: Pokemon) => {
  pokemonPage.value = newValue;
}

</script>

<template>
  <Header :inputSearch="inputSearch" @update:inputSearch="updateInputSearch" />
  <router-view :pokemons="pokemonFiltered" :pokemon="pokemonPage" @update:pokemonPage="updatePokemonPage"></router-view>
</template>

<style scoped lang="scss"></style>
