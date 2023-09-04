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
        <div class="card__types">
            <figure v-for="type in pokemon.apiTypes">
                <img :key="type.name" :src="type.image" :alt="type.name">
                <figcaption>{{ type.name }}</figcaption>
            </figure>
        </div>
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

    &__types {
        display: flex;
        gap: 1rem;
        position: relative;
        height: 40px;

        figure {
            position: relative;
        }

        img {
            width: 50px;
            height: 50px;

            &:hover {
                transform: scale(1.1);
                filter: drop-shadow(0 0 0.75rem black);
            }
        }

        figcaption {
            display: none;
            font-size: 1.2rem;
            font-weight: 700;
            color: white;
            position: absolute;
            top: -1rem;
            left: -0.5rem;
            text-shadow: 0 0 0.5rem black;
        }

        figure:hover figcaption {
            display: block;
        }
    }
}
</style>
