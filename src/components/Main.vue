<script setup lang="ts">
import Card from './Card.vue'

// On récupère les pokemons via les props
const props = defineProps({
    pokemons: {
        type: Array,
        required: true
    }
})

</script>

<template>
    <main>
        <div class="cards_container">
            <!-- Pour chaque pokemons on appel le composant Card -->
            <Card v-for="pokemon in props.pokemons" :key="pokemon.name" :pokemon="pokemon" />
        </div>

    </main>
</template>

<style scoped lang="scss">
.cards_container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    grid-gap: 1rem;
    padding: 1rem;
    margin: 0 auto;
    width: 100%;
    max-width: 850px;
}
</style>
