<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'
import { Pokemon } from './@types/Pokemons';

const pokemons = ref([] as Pokemon[]);
const inputSearch = ref('Pokem' as string);

const getPokemons = async () => {
  try {
    const response = await fetch('https://pokebuildapi.fr/api/v1/pokemon/limit/100');
    const data = await response.json();
    pokemons.value = data;
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
})

</script>

<template>
  <Header :inputSearch="inputSearch" />
  <Main :pokemons="pokemons" />
</template>

<style scoped lang="scss"></style>
