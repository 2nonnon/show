<template>
    <section class="container">
        <div class="left center" @click="goHome">NON</div>
        <div class="right">
            <div class="search icon" @click="search"></div>
            <div class="menu icon" @click="menu"></div>
        </div>
        <div class="wrapper" v-if="toggleS">
            <input type="text" />
            <div class="button">SEARCH</div>
        </div>
        <div class="categories" v-if="toggleM">
            <div class="close" @click="menu"></div>
            <div class="item" v-for="category, i in categories" :key="i">
                <span>{{ category }}</span>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref } from '@vue/reactivity';
const router = useRouter();
const goHome = () => router.push({ name: 'Main' });
let toggleS = ref(false);
const search = () => {
    toggleS.value = !toggleS.value;
}
const categories = ref(['Home', 'Web', 'Other', 'Contact']);
let toggleM = ref(false);
const menu = () => {
    toggleM.value = !toggleM.value;
}
</script>

<style scoped>
.container,
.right,
.wrapper {
    display: flex;
}
.container {
    width: 100%;
    height: 100%;
    justify-content: space-between;
    background-color: #ffdd00;
    position: relative;
}
.left {
    font-size: 1.5rem;
    color: #fff;
    height: 100%;
    width: 4rem;
}
.wrapper {
    position: absolute;
    top: 110%;
    left: 50%;
    transform: translateX(-50%);
    padding: 0 0.5rem;
    width: 95%;
    justify-content: flex-end;
}
.wrapper > input[type="text"] {
    border: 0.1rem solid #eee;
    border-radius: 0.3rem 0 0 0.3rem;
    border-right: 0;
    /* box-shadow: 0 0 0 .1rem #eee inset; */
    padding-left: 0.3rem;
    height: 2rem;
    flex: 1;
    max-width: 20rem;
}
.wrapper > input[type="text"]:focus {
    outline: none;
}
.wrapper > .button {
    background-color: #ffdd00;
    font-weight: bold;
    font-size: 1rem;
    line-height: 2rem;
    padding: 0 0.3rem;
    border-radius: 0 0.3rem 0.3rem 0;
}
.categories {
    position: absolute;
    height: 100vh;
    width: 100%;
    background-color: #fff;
    padding-top: 8rem;
}
.categories > .close {
    background-image: url(https://nondesu.jp/control-panel/wp-content/themes/non-official/assets/img/menu_off.png);
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    height: 1.5rem;
    width: 1.5rem;
    position: absolute;
    top: 1.5rem;
    right: 1.5rem;
}
.categories > .item {
    text-align: center;
    margin-bottom: 2.25rem;
}
.categories > .item > span {
    font-weight: bold;
    font-size: 1.25rem;
    padding-bottom: .5rem;
    border-bottom: .25rem solid #ffee7f;
}
.right {
    width: 4rem;
    justify-content: space-evenly;
    align-items: center;
}
.icon {
    width: 1.2rem;
    height: 1.2rem;
    background-size: contain;
    background-position: center;
    background-repeat: no-repeat;
}
.search {
    background-image: url(https://nondesu.jp/control-panel/wp-content/themes/non-official/assets/img/search_on.png);
}
.menu {
    background-size: cover;
    background-image: url(https://nondesu.jp/control-panel/wp-content/themes/non-official/assets/img/menu_on.png);
}
</style>