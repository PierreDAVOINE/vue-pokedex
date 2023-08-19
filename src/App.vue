<script setup lang="ts">
import { onMounted, ref } from 'vue'
import Header from './components/Header.vue'
import Main from './components/Main.vue'

const pokemons = ref([]);

const getPokemons = async () => {
  try {
    const response = await fetch('https://pokebuildapi.fr/api/v1/pokemon');
    const data = await response.json();
    console.log("pokemons", data);
    pokemons.value = data.results;
  } catch (error) {
    console.log(error);
  }
}

onMounted(() => {
  getPokemons();
})

</script>

<template>
  <Header />
  <Main :pokemons="pokemons" />
</template>

<style scoped lang="scss"></style>
