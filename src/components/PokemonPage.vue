<script setup lang="ts">
import { Pokemon } from '../@types/Pokemons';
import { onMounted } from 'vue';
const props = defineProps({
    pokemon: {
        type: Object as () => Pokemon,
        required: true
    }
});

// Au chargement du composant, on récupére les infos du pokemon si elles sont manquantes
onMounted(() => {
    // on vérifie si l'objet pokemon est vide
    if (Object.keys(props.pokemon).length === 0) {
        // si c'est le cas on récupére le slugName dans l'url
        const slugName = props.$slugName.params.slugName;
        const response = fetch(`https://pokebuildapi.fr/api/v1/pokemon/${slugName}`);
        const data = response.json();
        props.pokemon.value = data;
    }
})
</script> 
<template>
    <div class="pokemon">
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
.pokemon {
    width: 50%;
    margin: 0 auto;
    background-color: rgba(218, 225, 225, 0.672);
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;

    div {
        width: 35%;
    }

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

    &__types,
    &__stats,
    &__evolutions {
        margin-bottom: 2rem;
    }
}
</style>
