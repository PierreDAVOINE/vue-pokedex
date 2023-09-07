<script setup lang="ts">


</script>

<template>
    <h2 class="loading_title">Chargement en cours...</h2>


    <div class="loader">
        <span class="loader__element"></span>
        <span class="loader__element"></span>
        <span class="loader__element"></span>
    </div>
</template>

<style scoped lang="scss">  .loading_title {
      color: white;
      font-size: 2rem;
      font-weight: 700;
      text-align: center;
      margin-top: 2rem;
  }

  // Variables

  $point-color: #ffffff;
  $size: 5px;


  .loader {
      overflow: hidden;
      width: 100%;
      height: 50%;
      position: relative;
      top: 0;
      left: 0;
      display: flex;
      align-items: center;
      align-content: center;
      justify-content: center;
      z-index: 100000;
  }

  .loader__element {
      border-radius: 100%;
      border: $size solid $point-color;
      margin: calc($size*2);
  }

  .loader__element:nth-child(1) {
      animation: preloader .6s ease-in-out alternate infinite;
  }

  .loader__element:nth-child(2) {
      animation: preloader .6s ease-in-out alternate .2s infinite;
  }

  .loader__element:nth-child(3) {
      animation: preloader .6s ease-in-out alternate .4s infinite;
  }

  @keyframes preloader {
      100% {
          transform: scale(2);
      }
  }
</style>
