<script setup lang="ts">
import { ref } from 'vue';

// On récupére la props inputSearch
const props = defineProps({
  inputSearch: {
    type: String,
    required: true,
  },
  isSearchOpen: {
    type: Boolean,
    required: true,
  },
});

// On déclare la fonction update:inputSearch
// emit permet d'envoyer un événement au parent
const emit = defineEmits(['update:inputSearch']);

// On déclare une variable inputValue qui est une référence à la props inputSearch
const inputValue = ref(props.inputSearch);

// updateInputSearch permet de mettre à jour la props inputSearch
const updateInputSearch = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value;
  inputValue.value = newValue;
  // ici on emet l'evenement update:inputSearch avec la nouvelle valeur
  emit('update:inputSearch', newValue);
};

// handleReset permet de remettre à zéro la props inputSearch et donc de reset la recherche
const handleReset = () => {
  inputValue.value = '';
  emit('update:inputSearch', '');
};

// handleSubmit permet d'éviter le rechargement de la page lors de la soumission du formulaire
const handleSubmit = (event: Event) => {
  event.preventDefault();
};
</script>

<template>
  <form class="searchForm" v-on:submit="handleSubmit">

    <input type="text" :value="props.inputSearch" @input="(e) => updateInputSearch(e)" placeholder="Search a pokemon" />

    <button v-if="props.inputSearch.length > 0" v-on:click="handleReset">
      <img src="../assets/icons8-annuler.svg" alt="annuler">
    </button>
  </form>
</template>

<style scoped lang="scss">
.searchForm {
  position: relative;
  margin: 0 auto;
  width: 100%;
  max-width: 850px;
  padding: 1rem;
  background-color: #ec1d23;
  border-right: 7px solid black;
  border-left: 7px solid black;

  input {
    width: 100%;
    padding: 0.5rem;
    border-radius: 5px;
    border: none;
    outline: none;
    font-size: 1rem;
    font-weight: 400;
    color: #333;
    box-shadow: 0 3px 15px rgba(100, 100, 100, 0.2);

    @media screen and (min-width: 500px) {
      font-size: 1.5rem;
    }

    @media screen and (min-width: 700px) {
      font-size: 2rem;
    }
  }

  button {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: none;
    border: none;
    cursor: pointer;
  }
}
</style>
