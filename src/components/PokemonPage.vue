<script setup lang="ts">

import { Pokemon } from '../@types/Pokemons';
import { onBeforeMount, ref, watch } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute() as RouteLocationNormalizedLoaded;

const props = defineProps({
    allPokemons: {
        type: Array as () => Pokemon[],
        required: true,
    },
    isSearchOpen: {
        type: Boolean as () => boolean,
    },
});

const pokemon = ref({} as Pokemon);
const pokemonSlug = ref('' as string);
const previousEvolution = ref({} as Pokemon);
const nextEvolution = ref([] as Pokemon[]);

const emit = defineEmits(['update:idPokemonAnchor']);

// Au chargement du composant on récupére le slug du pokemon
onBeforeMount(() => {
    pokemonSlug.value = route.params.slugName as string;
    if (props.allPokemons.length > 0) {
        getPokemonData();
    }
});

// Dès qu'on a finit de récupérer les pokemons, on récupére les données du pokemon
watch(() => props.allPokemons, () => {
    if (Object.keys(pokemon.value).length === 0) {
        getPokemonData();
    }
});

// Dès qu'on change de route
watch(() => route.params.slugName, () => {
    // On reset les evoluations
    previousEvolution.value = {} as Pokemon;
    nextEvolution.value = [] as Pokemon[];
    // Et on récupére les données du pokemon
    pokemonSlug.value = route.params.slugName as string;
    getPokemonData();
});

// getPokemonData permet de récupérer les données du pokemon
const getPokemonData = () => {
    // on cherche le pokemon dans le state
    const pokemonToShow = props.allPokemons.find((poke) => poke.slug === route.params.slugName);

    // Si aucun pokemon n'a été trouvé on redirige vers la 404
    if (!pokemonToShow) {
        router.push({ name: 'NotFound' });
    } else {
        // On met à jour le state pokemonPage
        pokemon.value = pokemonToShow;

        // On met à jour l'id de l'ancre pour le retour à la page d'accueil
        emit('update:idPokemonAnchor', pokemonToShow.id);

        // On récupére les données de la pré-évolution
        if (pokemonToShow.apiPreEvolution) {
            const previousEvolutionToShow = props.allPokemons.find((poke) => poke.name === pokemonToShow.apiPreEvolution.name);
            if (previousEvolutionToShow) {
                previousEvolution.value = previousEvolutionToShow;
            }
        }

        // On récupére les données de la prochaine évolution
        if (pokemonToShow.apiEvolutions.length > 0) {
            pokemonToShow.apiEvolutions.forEach((evolution) => {
                const nextEvolutionToShow = props.allPokemons.find((poke) => poke.name === evolution.name);
                if (nextEvolutionToShow) {
                    nextEvolution.value.push(nextEvolutionToShow);
                }
            });
        }
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
            <h2>Statistiques</h2>
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
            <h2>Pré évolution</h2>
            <ul v-if="previousEvolution.name">
                <li><router-link :to="{ name: 'pokemon', params: { slugName: previousEvolution.slug } }">{{
                    previousEvolution.name }}</router-link>
                </li>
            </ul>
            <p v-else>Aucune pré-évolution</p>
        </div>

        <div class="pokemon__evolutions">
            <h2>Evolution</h2>
            <div v-if="nextEvolution.length > 0">
                <ul v-for="evolution of nextEvolution">
                    <li><router-link :to="{ name: 'pokemon', params: { slugName: evolution.slug } }">{{
                        evolution.name
                    }}</router-link></li>
                </ul>
            </div>
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
    width: 100vw;
    max-width: 700px;
    margin: 0 auto;
    background-color: #ec1d23;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-content: baseline;
    gap: 1rem;
    padding: 1rem 0;
    border-right: 7px solid black;
    border-left: 7px solid black;
    height: 79.5vh;
    overflow: auto;

    @media screen and (min-width: 451px) {
        height: 75vh;
    }

    @media screen and (min-width: 620px) {
        height: 71vh;
    }

    &.searchOpen {
        height: 57.5vh;
    }

    div {
        width: 45%;
        padding: 0 1rem;
        background-color: white;
        border-radius: 25px;
        max-height: 18rem;
    }

    h2 {
        color: #ec1d23;
        font-size: 1.5rem;
        font-weight: 700;
        text-align: center;
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
        // text-align: center;
        padding: 2rem 1rem;
        font-size: 1.2rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        ul,
        p {
            padding: 2rem 0;
        }

        li {
            list-style: none;
            transition: 0.1s ease-in-out;

            &:hover {
                transform: scale(1.1);
            }

            a {
                color: black;

            }
        }
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


}
</style>
