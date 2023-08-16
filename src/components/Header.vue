<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ title: string }>()

</script>

<template>
  <header>
    <h1>{{ title }}</h1>

  </header>


</template>

<style scoped lang="scss">



header {
  background-color: #f44336;
  padding: 10px;
  text-align: center;
  
  h1 {
    font-size: 2rem;
    margin: 0;
    color: white;
    font-weight: 700;
  }
}

</style>
