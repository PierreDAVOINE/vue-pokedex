<script setup lang="ts">

import { Pokemon } from '../@types/Pokemons';
import { onBeforeMount, ref } from 'vue';
import { RouteLocationNormalizedLoaded, useRoute, useRouter } from 'vue-router';

const props = defineProps({
    pokemon: {
        type: Object as () => Pokemon,
    }
});

const pokemonId = ref(0 as number);

const router = useRouter();
const route = useRoute() as RouteLocationNormalizedLoaded;

// Préparation de la mise à jour du state pokemonPage
const emit = defineEmits(['update:pokemonPage']);
const updatePokemonPage = (newValue: Pokemon) => {
    emit('update:pokemonPage', newValue);
}

// Au chargement du composant on récupére l'id dans l'url
onBeforeMount(() => {
    pokemonId.value = Number(route.params.id);
    // Si le pokemon n'existe pas dans le state, on le récupére
    if (props.pokemon && Object.keys(props.pokemon).length === 0) {
        getPokemonData();
    }
})

// getPokemonData permet de récupérer les données du pokemon
const getPokemonData = async () => {
    try {
        const response = await fetch(`https://pokebuildapi.fr/api/v1/pokemon/${pokemonId.value}`);
        // Si aucun pokemon n'a été trouvé on redirige vers la 404
        if (!response.ok) {
            router.push({ name: 'NotFound' });
        } else {
            const data = await response.json();
            updatePokemonPage(data)
        }
    } catch (error) {
        console.error(error);
    }
}

</script> 

<template>
    <h2 class="waiting__title" v-if="!pokemon || Object.keys(pokemon).length === 0">Récupération des informations du pokemon
        en cours</h2>
    <div v-else class="pokemon">
        <div class="pokemon__introduction">
            <h2>{{ pokemon.name }}</h2>
            <img :src="pokemon.image" :alt="pokemon.name">
            <div class="types">
                <img v-for="type in pokemon.apiTypes" :key="type.name" :src="type.image" :alt="type.name">
            </div>
        </div>

        <div class="pokemon__ stats">
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
    width: 850px;
    margin: 0 auto;
    background-color: rgba(218, 225, 225, 0.672);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    div {
        width: 45%;
        padding: 1rem;
    }

    h2 {
        color: rgb(234, 38, 38);
        font-size: 2rem;
        font-weight: 700;
        text-align: center;
    }

    &__introduction {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-bottom: 2rem;

        img {
            width: 200px;
            height: 200px;
        }

        .types {
            display: flex;
            gap: 1rem;

            ul {
                display: flex;
                gap: 1rem;
            }

            img {
                width: 50px;
                height: 50px;
            }
        }

    }

    &__evolutions {
        text-align: center;
    }

    &__types,
    &__stats,
    &__evolutions {
        // margin-bottom: 2rem;
    }
}
</style>
