<script setup lang="ts">
import Card from './Card.vue'
import { Pokemon } from '../@types/Pokemons';
const props = defineProps({
    pokemons: {
        type: Array as () => Pokemon[]
    },
    isSearchOpen: {
        type: Boolean as () => boolean
    }
});

const emit = defineEmits(['update:pokemonPage', 'update:isSearchOpen']);

const updatePokemonPage = (newValue: Pokemon) => {
    // On met à jour le pokemon que l'on souhaite afficher en state
    emit('update:pokemonPage', newValue);
    // Si la recherche est ouverte on la ferme
    if (props.isSearchOpen) {
        emit('update:isSearchOpen');
    }
}

</script>

<template>
    <main :class="{ searchOpen: isSearchOpen }">
        <h2 v-if="pokemons && pokemons.length < 1">Chargement des cartes en cours</h2>
        <div v-else class="cards_container">
            <Card v-for="  pokemon   in   pokemons  " :key="pokemon.name" :pokemon="pokemon"
                v-on:click="updatePokemonPage(pokemon)" />
        </div>
    </main>
</template>

<style scoped lang="scss">
main {
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
    overflow: scroll;
    height: 68vh;
    border-right: 7px solid black;
    border-left: 7px solid black;

    h2 {
        color: rgb(189, 0, 222);
        font-size: 3rem;
        font-weight: 700;
    }
}

.searchOpen {
    height: 57.5vh;
}

.cards_container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    grid-gap: 1rem;
    padding: 1rem;
    margin: 0 auto;
    width: 100%;
    background-color: #ec1d23;
}
</style>
