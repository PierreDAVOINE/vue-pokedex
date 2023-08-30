<script setup lang="ts">
import { Pokemon } from '../@types/Pokemons';
defineProps({
    pokemon: {
        type: Object as () => Pokemon,
        required: true
    }
});


</script> 

<template>
    <router-link class="card" :to="{ name: 'pokemon', params: { slugName: pokemon.slug, id: pokemon.id } }">
        <img :src="pokemon.image" :alt="pokemon.name">
        <h2>{{ pokemon.name }}</h2>
    </router-link>
</template>

<style scoped lang="scss">
.card {
    background-color: #eaeaea;
    border-radius: 10px;
    box-shadow: 0 3px 15px rgba(100, 100, 100, 0.2);
    padding: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    transition: all 0.3s ease-in-out;
    // width: 80%;

    &:hover {
        transform: scale(1.05);
        box-shadow: 0 3px 15px rgba(100, 100, 100, 0.4);
    }

    img {
        width: 100%;
        max-width: 150px;
        margin-bottom: 1rem;
    }

    h2 {
        font-size: 1.5rem;
        margin: 0;
        color: #333;
        font-weight: 700;
        text-align: center;
        text-decoration: none;
    }

    p {
        font-size: 1rem;
        margin: 0;
        color: #333;
        font-weight: 400;
        text-align: center;
    }
}
</style>
