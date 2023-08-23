<script setup lang="ts">
import Card from './Card.vue'
import { Pokemon } from '../@types/Pokemons';
defineProps({
    pokemons: {
        type: Array as () => Pokemon[]
    }
});
</script>

<template>
    <main>
        <h2 v-if="pokemons && pokemons.length < 1">Chargement des cartes en cours</h2>
        <div v-else class="cards_container">
            <Card v-for="pokemon in pokemons" :key="pokemon.name" :pokemon="pokemon" />
        </div>
    </main>
</template>

<style scoped lang="scss">
main {
    max-width: 850px;
    margin: 0 auto;
    padding: 1rem;
    text-align: center;

    h2 {
        color: rgb(189, 0, 222);
        font-size: 3rem;
        font-weight: 700;
    }
}

.cards_container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 1rem;
    padding: 1rem;
    margin: 0 auto;
    width: 100%;
    max-width: 850px;
    background-color: #ec1d23;
}
</style>
