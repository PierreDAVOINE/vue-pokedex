<script setup lang="ts">
import { ref } from 'vue';

// On récupére la props inputSearch
const props = defineProps({
  inputSearch: {
    type: String,
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
  <form v-on:submit="handleSubmit">
    <input type="text" :value="props.inputSearch" @input="(e) => updateInputSearch(e)" placeholder="Search a pokemon" />
    <button v-if="props.inputSearch.length > 0" v-on:click="handleReset">
      <img src="../assets/icons8-annuler.svg" alt="annuler">
    </button>
  </form>
</template>

<style scoped lang="scss"></style>
