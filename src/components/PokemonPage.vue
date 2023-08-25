<script setup lang="ts">
import { Pokemon } from '../@types/Pokemons';
defineProps({
    pokemon: {
        type: Object as () => Pokemon,
        required: true
    }
});

// TODO: ajouter le slug dans l'URL
</script> 
<template>
    <div class="pokemon">
        <div class="pokemon__introduction">
            <h2>{{ pokemon.name }}</h2>
            <img :src="pokemon.image" :alt="pokemon.name">
        </div>
        <div class="pokemon__types">
            <h2>Types :</h2>
            <ul>
                <li v-for="type in pokemon.apiTypes" :key="type.name">{{ type.name }} - <img :src="type.image"
                        :alt="type.name"></li>
            </ul>
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
            <h2>Evolution :</h2>
            <ul v-if="pokemon.apiEvolutions">
                <li v-for="evolution in pokemon.apiEvolutions" :key="evolution.name">{{ evolution.name }}</li>
            </ul>
            <p v-else>Aucune évolution</p>
        </div>

        <div class="pokemon__evolutions">
            <h2>Pré évolution :</h2>
            <ul v-if="pokemon.apiPreEvolution">
                <li v-for="preEvolution in pokemon.apiPreEvolution" :key="preEvolution.name">{{ preEvolution.name }}</li>
            </ul>
            <p v-else>Aucune pré-évolution</p>
        </div>

    </div>
</template>

<style scoped lang="scss">
.pokemon {
    width: 80%;
    margin: 0 auto;
    background-color: rgba(218, 225, 225, 0.672);

    h2 {
        color: rgb(234, 38, 38);
        font-size: 3rem;
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
    }

    &__types,
    &__stats,
    &__evolutions {
        margin-bottom: 2rem;
    }
}
</style>
