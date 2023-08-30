<script setup lang="ts">
import Card from './Card.vue'
import { Pokemon } from '../@types/Pokemons';
defineProps({
    pokemons: {
        type: Array as () => Pokemon[]
    }
});

const emit = defineEmits(['update:pokemonPage']);
const updatePokemonPage = (newValue: Pokemon) => {
    emit('update:pokemonPage', newValue);
}

</script>

<template>
    <main>
        <h2 v-if="pokemons && pokemons.length < 1">Chargement des cartes en cours</h2>
        <div v-else class="cards_container">
            <Card v-for="pokemon in pokemons" :key="pokemon.name" :pokemon="pokemon"
                v-on:click="updatePokemonPage(pokemon)" />
        </div>
    </main>
</template>

<style scoped lang="scss">
main {
    width: 100%;
    margin: 0 auto;
    text-align: center;
    overflow: scroll;
    height: 100%;
    border-right: 7px solid black;
    border-left: 7px solid black;

    @media screen and (min-width: 850px) {
        width: 850px;
    }


    h2 {
        color: rgb(189, 0, 222);
        font-size: 3rem;
        font-weight: 700;
    }
}

.cards_container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    grid-gap: 1rem;
    padding: 1rem;
    margin: 0 auto;
    width: 100%;
    background-color: #ec1d23;
}
</style>
