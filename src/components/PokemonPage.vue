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
        <div>
            <h2>Nom du pokemon : {{ pokemon.name }}</h2>
            <img :src="pokemon.image" :alt="pokemon.name">
        </div>
        <div>
            <h2>Types :</h2>
            <ul>
                <li v-for="type in pokemon.apiTypes" :key="type.name">{{ type.name }}</li>
            </ul>
        </div>

        <div>
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

        <div>
            <h2>Evolution :</h2>
            <ul v-if="pokemon.apiEvolutions">
                <li v-for="evolution in pokemon.apiEvolutions" :key="evolution.name">{{ evolution.name }}</li>
            </ul>
            <p v-else>Aucune évolution</p>
        </div>

    </div>
</template>

<style scoped lang="scss">
.pokemon {
    width: 80%;
    margin: 0 auto;

    h2 {
        color: rgb(189, 0, 222);
        font-size: 3rem;
        font-weight: 700;
        text-align: center;
    }
}
</style>
