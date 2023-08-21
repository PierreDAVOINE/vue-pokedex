<script setup lang="ts">
import Card from './Card.vue'
import { Pokemon } from '../@types/Pokemons';
defineProps({
    pokemons: {
        type: Array as () => Pokemon[],
        required: true
    }
});
</script>

<template>
    <main>
        <div class="cards_container">
            <Card v-for="pokemon in pokemons" :key="pokemon.name" :pokemon="pokemon" />
        </div>

    </main>
</template>

<style scoped lang="scss">
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
