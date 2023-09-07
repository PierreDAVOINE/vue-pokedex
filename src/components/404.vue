<script setup lang="ts">

</script>

<template>
    <div class="error404">
        <h2>Aucun pokemon trouvé avec ce nom</h2>
        <img src="../assets/404.png" alt="404 not found">
    </div>
</template>

<style scoped lang="scss">
.error404 {
    width: 100vw;
    max-width: 700px;
    margin: 0 auto;
    text-align: center;
    overflow-y: scroll;
    height: 75vh;
    border-right: 7px solid black;
    border-left: 7px solid black;
    overscroll-behavior-y: none;
    background-color: #ec1d23;
    position: relative;

    h2 {
        color: white;
        font-size: 3rem;
        font-weight: 700;
    }

    img {
        width: 55%;
        max-width: 500px;
    }
}
</style>
