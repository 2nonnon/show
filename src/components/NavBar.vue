<template>
    <section class="container">
        <div class="left center">NON</div>

        <div class="right">
            <div class="wrapper">
                <input type="text" />
                <div class="search icon"></div>
            </div>
            <div class="menu icon"></div>
        </div>
    </section>
</template>

<script setup>
</script>

<style scoped>
.container,
.right,
.wrapper {
    display: flex;
}
.container {
    height: 100%;
    justify-content: space-between;
    background-color: #ffdd00;
}
.left {
    font-size: 1.5rem;
    color: #fff;
    height: 100%;
    width: 4rem;
}
.wrapper > input[type="text"] {
    display: none;
}
.icon {
    width: 1.5rem;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}
.search {
    background-image: url(https://nondesu.jp/control-panel/wp-content/themes/non-official/assets/img/search_on.png);
}
.menu {
    margin: 0.5rem;
    padding: 0.5rem 0;
    background-size: cover;
    background-image: url(https://nondesu.jp/control-panel/wp-content/themes/non-official/assets/img/menu_on.png);
}
</style>