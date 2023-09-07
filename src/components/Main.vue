<script setup lang="ts">
import Card from './Card.vue'
import { Pokemon } from '../@types/Pokemons';
import { onMounted } from 'vue';
import Loading from './Loading.vue';
const props = defineProps({
    pokemons: {
        type: Array as () => Pokemon[]
    },
    isSearchOpen: {
        type: Boolean as () => boolean
    },
    idPokemonAnchor: {
        type: Number as () => number,
        required: true
    }
});

const emit = defineEmits(['update:isSearchOpen', 'update:inputSearch']);

const handleCloseSearch = () => {
    // Si la recherche est ouverte on la ferme
    emit('update:inputSearch', '')
    if (props.isSearchOpen) {
        emit('update:isSearchOpen');
    }
}

// Au chargement du composant on scroll jusqu'au pokemon qui a été précédemment cliqué
onMounted(() => {
    autoScroll();
});

// autoScroll permet de faire défiler le conteneur jusqu'au pokemon qui a été précédemment cliqué
const autoScroll = () => {
    const pokemonContainer = document.getElementById('pokemon-container');
    const pokemonCard = document.getElementById(props.idPokemonAnchor.toString());
    if (pokemonContainer && pokemonCard) {
        // On récupére les coordonnées de la carte et du conteneur
        const containerRect = pokemonContainer.getBoundingClientRect();
        const cardRect = pokemonCard.getBoundingClientRect();
        const offsetY = cardRect.top - containerRect.top;

        // Faites défiler le conteneur jusqu'à ce que la carte Pokémon soit visible
        pokemonContainer.scrollTo({
            top: offsetY,
            behavior: 'smooth', // Pour un défilement en douceur
        });
    }
}

</script>

<template>
    <main id="pokemon-container" :class="{ searchOpen: isSearchOpen }">
        <Loading v-if="pokemons && pokemons.length < 1" />
        <div v-else class="cards_container">
            <Card v-for="  pokemon   in   pokemons  " :key="pokemon.name" :pokemon="pokemon" @click="handleCloseSearch" />
        </div>
    </main>
</template>

<style scoped lang="scss">
main {
    width: 100vw;
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
    overflow-y: scroll;
    height: 79.5vh;
    border-right: 7px solid black;
    border-left: 7px solid black;
    overscroll-behavior-y: none;
    background-color: #ec1d23;
    position: relative;

    h2 {
        color: rgb(189, 0, 222);
        font-size: 3rem;
        font-weight: 700;
    }

    @media screen and (min-width: 451px) {
        height: 75vh;
    }

    @media screen and (min-width: 620px) {
        height: 71vh;
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
}
</style>
