<script setup lang="ts">

</script>

<template>
    <footer>
        <div class="footer_bg">
            <p>Pierre Davoine - Pokedex with Vue JS - 2023</p>
            <a href="https://github.com/PierreDAVOINE/vue-pokedex">
                <img src="../assets/github-logo.png" alt="Github">
            </a>
        </div>
    </footer>
</template>

<style scoped lang="scss">
footer {
    height: 10vh;
    max-width: 700px;
    margin: 0 auto;
}

.footer_bg {
    background-color: #ec1d23;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    border-bottom-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom: 7px solid black;
    border-top: 5px solid black;
    border-right: 7px solid black;
    border-left: 7px solid black;


    p {
        color: white;
        font-size: 1rem;
        font-weight: 700;
    }

    img {
        width: 2rem;
        height: 2rem;
    }
}
</style>
