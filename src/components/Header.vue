<script setup lang="ts">
import { ref, defineProps, defineEmits } from 'vue';

const props = defineProps({
  inputSearch: {
    type: String,
    required: true,
  },
});
// TODO: Relier la valeur de l'input à la valeur de inputSearch
// v-model ne peut pas être utilisé sur une props
const emit = defineEmits(['update:inputSearch']);
const inputValue = ref(props.inputSearch);

const updateInputSearch = (event: Event) => {
  const newValue = (event.target as HTMLInputElement).value;
  inputValue.value = newValue;
  emit('update:inputSearch', newValue);
};

</script>

<template>
  <header>
    <div class="header_bg">
      <h1>Pokedex with Vue JS = {{ props.inputSearch }}</h1>
      <form>
        <input type="text" :value="props.inputSearch" @input="(e) => updateInputSearch(e)"
          placeholder="Search a pokemon" />
      </form>
    </div>

  </header>
</template>

<style scoped lang="scss">
header {
  // padding: 10px;

  h1 {
    font-size: 1rem;
    margin: 0;
    color: white;
    font-weight: 700;
    display: inline;
    position: absolute;
    top: 0.1rem;
    right: 1rem;

    @media screen and (min-width: 500px) {
      font-size: 1.5rem;
    }

    @media screen and (min-width: 700px) {
      font-size: 2rem;
    }
  }
}

.header_bg {
  background: no-repeat url(/img/header.png) center top / contain, #ec1d23;
  width: 100%;
  margin: 0 auto;
  height: 30vh;
  position: relative;

  @media screen and (min-width: 768px) {
    height: 23vh;
  }

  @media screen and (min-width: 850px) {
    width: 850px;
  }
}
</style>
