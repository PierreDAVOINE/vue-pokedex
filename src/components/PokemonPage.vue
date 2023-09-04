<script setup lang="ts">

import { Pokemon } from '../@types/Pokemons';
import { onBeforeMount, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router';

const props = defineProps({
    allPokemons: {
        type: Array as () => Pokemon[],
        required: true,
    },
    pokemon: {
        type: Object as () => Pokemon,
    },
    isSearchOpen: {
        type: Boolean as () => boolean,
    },
});

const pokemonSlug = ref('' as string);

const router = useRouter();
const route = useRoute() as RouteLocationNormalizedLoaded;

// Préparation de la mise à jour du state pokemonPage
const emit = defineEmits(['update:pokemonPage']);
const updatePokemonPage = (newValue: Pokemon) => {
    emit('update:pokemonPage', newValue);
}

// Au chargement du composant on récupére l'id dans l'url
onBeforeMount(() => {
    pokemonSlug.value = route.params.slugName as string;
})

// Dès qu'on a finit de récupérer les pokemons, on récupére les données du pokemon
watch(() => props.allPokemons, (newValue) => {
    if (!props.pokemon || Object.keys(props.pokemon).length === 0) {
        getPokemonData();
    }
});

// getPokemonData permet de récupérer les données du pokemon
const getPokemonData = () => {
    // on cherche le pokemon dans le state
    const pokemonToShow = props.allPokemons.find((poke) => poke.slug === route.params.slugName);

    // Si aucun pokemon n'a été trouvé on redirige vers la 404
    if (!pokemonToShow) {
        router.push({ name: 'NotFound' });
    } else {
        updatePokemonPage(pokemonToShow)
    }
}
</script> 

<template>
    <h2 class="waiting__title" v-if="!pokemon || Object.keys(pokemon).length === 0">Récupération des informations du pokemon
        en cours</h2>
    <div v-else class="pokemon" :class="{ searchOpen: isSearchOpen }">
        <div class="pokemon__introduction">
            <h2>{{ pokemon.name }}</h2>
            <img :src="pokemon.image" :alt="pokemon.name">
            <div class="types">
                <figure v-for="type in pokemon.apiTypes">
                    <img :key="type.name" :src="type.image" :alt="type.name">
                    <figcaption>{{ type.name }}</figcaption>
                </figure>
            </div>
        </div>

        <div class="pokemon__stats">
            <h2>Statistiques :</h2>
            <ul>
                <li>HP : {{ pokemon.stats.HP }}</li>
                <li>Attaque : {{ pokemon.stats.attack }}</li>
                <li>Defense : {{ pokemon.stats.defense }}</li>
                <li>SPE-attaque : {{ pokemon.stats.special_attack }}</li>
                <li>SPE-defense : {{ pokemon.stats.special_defense }}</li>
                <li>Vitesse : {{ pokemon.stats.speed }}</li>
            </ul>
        </div>

        <div class="pokemon__evolutions">
            <h2>Pré évolution :</h2>
            <ul v-if="pokemon.apiPreEvolution">
                <li>{{ pokemon.apiPreEvolution.name }}</li>
            </ul>
            <p v-else>Aucune pré-évolution</p>
        </div>

        <div class="pokemon__evolutions">
            <h2>Evolution :</h2>
            <ul v-if="pokemon.apiEvolutions">
                <li v-for="evolution in pokemon.apiEvolutions" :key="evolution.name">{{ evolution.name }}</li>
            </ul>
            <p v-else>Aucune évolution</p>
        </div>

    </div>
</template>

<style scoped lang="scss">
.waiting__title {
    color: rgb(189, 0, 222);
    font-size: 3rem;
    font-weight: 700;
    text-align: center;
}

.pokemon {
    width: 100%;
    margin: 0 auto;
    background-color: #ec1d23;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
    padding: 1rem 0;
    border-right: 7px solid black;
    border-left: 7px solid black;
    height: 68vh;
    overflow: auto;

    &.searchOpen {
        height: 57.5vh;
    }

    @media screen and (min-width: 850px) {
        width: 850px;
    }

    div {
        width: 45%;
        padding: 0 1rem;
        background-color: white;
        border-radius: 25px;
    }

    h2 {
        color: #ec1d23;
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
    }

    &__introduction {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        // margin-bottom: 2rem;

        img {
            width: 200px;
            height: 200px;
        }

        .types {
            display: flex;
            gap: 1rem;
            position: relative;
            bottom: 0.5rem;

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
                left: 50%;
                text-shadow: 0 0 0.5rem black;
            }

            figure:hover figcaption {
                display: block;
            }
        }

    }

    &__stats {

        ul {
            padding: 2rem 1rem;
        }

        li {
            text-align: center;
            font-size: 1.2rem;

        }
    }

    &__evolutions {
        text-align: center;
        padding: 2rem 1rem;
        font-size: 1.2rem;
    }
}
</style>
