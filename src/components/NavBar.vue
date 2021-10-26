<template>
    <section class="container">
        <div class="left center" @click="menuNav()">NON</div>
        <div class="right">
            <div class="search icon" :class="{ 'active': toggleS }" @click="searchToggle"></div>
            <div class="menu icon" @click="menuToggle"></div>
        </div>
        <div class="wrapper" v-if="toggleS">
            <input type="text" autofocus="autofocus" v-model.lazy="value" @keypress.enter="search"/>
            <div class="button" @click="search">SEARCH</div>
        </div>
        <div class="categories" v-if="toggleM">
            <div class="close" @click="menuToggle"></div>
            <div class="item" v-for="category, i in categories" :key="i">
                <span @click="menuNav(category)">{{ category }}</span>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router';
// import { defineEmits } from '@vue/runtime-core';
import { ref } from '@vue/reactivity';
import bus from '../libs/bus'
// 首页
const router = useRouter();
// 搜索切换
let toggleS = ref(false);
const searchToggle = () => {
    toggleS.value = !toggleS.value;
}
// 搜索事件触发
const value = ref('')
// const emit = defineEmits(['search']);
const search = () => {
    console.log(value.value);
    if (value.value !== '') bus.emit('search', value.value)
    value.value = ''
    searchToggle()
}
// 菜单切换
let toggleM = ref(false);
const menuToggle = () => {
    toggleM.value = !toggleM.value;
}
// 菜单选项
const categories = ref(['Home', 'Web', 'Other', 'Contact']);
const menuNav = (target) => {
    if (!target || target === 'Home') target = 'News';
    router.replace({ name: 'Category' , params:{ 'category': target.toLowerCase() }});
    bus.emit('cateChange', target)
    if (toggleM.value) menuToggle();
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
    background-image: url(../assets/img/menu_off.png);
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
    -webkit-tap-highlight-color: transparent;
}
.categories > .item > span {
    font-weight: bold;
    font-size: 1.25rem;
    padding-bottom: 0.5rem;
    border-bottom: 0.25rem solid #ffee7f;
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
    background-image: url(../assets/img/search_on.png);
}
.menu {
    background-size: cover;
    background-image: url(../assets/img/menu_on.png);
}
.active {
    background-image: url(../assets/img/menu_white_off.png);
}
.left,
.search,
.menu,
.button,
.close,
.item {
    cursor: pointer;
}
</style>