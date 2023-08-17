<script setup lang="ts">

defineProps<{ title: string }>()

</script>

<template>
  <header>
    <div class="header_bg">
      <h1>{{ title }}</h1>

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
    @media screen and (min-width: 1000px) {
      font-size: 2.5rem;
      right: 3rem;
      top: 0.5rem;
    }
  }
}

.header_bg {
  background: no-repeat url(public/img/header.png) center top / contain;
  width: 100%;
  margin: 0 auto;
  height: 30vh;
  position: relative;
  @media screen and (min-width: 768px) {
    height: 23vh;
  }
  @media screen and (min-width: 1180px) {
    width: 1180px;
  }
}

</style>
