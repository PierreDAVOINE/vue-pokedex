<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import { Pokemon } from './@types/Pokemons';

const pokemons = ref([] as Pokemon[]);
const inputSearch = ref('' as string);
const pokemonFiltered = ref([] as Pokemon[]);

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

//  A chaque mise à jour de inputSearch on le console.log
watch(inputSearch, (newValue: string) => {
  console.log("Nouvelle valeurde l'input : ", newValue);
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

</script>

<template>
  <Header :inputSearch="inputSearch" @update:inputSearch="updateInputSearch" />
  <Main :pokemons="pokemonFiltered" />
</template>

<style scoped lang="scss"></style>
