<template>
    <div class="main">
        <div class="category">{{ category }}</div>
        <template v-for="item in show" :key="item.id">
            <!-- <ArticleCard
            :imgUrl="item.imgUrl" 
            :title="item.title" 
            :tags="item.tags"
            :time="item.time"
            :id="item.id"
            ></ArticleCard> -->
            <ArticleCard v-bind="item" @cate-change="changeCate"></ArticleCard> 
        </template>
    </div>
    <PageBar></PageBar>
</template>

<script setup>
import { ref } from '@vue/reactivity';
import { onBeforeUnmount } from '@vue/runtime-core';
// import { useRoute } from 'vue-router';
// import { watch } from '@vue/runtime-core';
import ArticleCard from '../components/ArticleCard.vue';
import PageBar from '../components/PageBar.vue';
import bus from '../libs/bus';
const category = ref('NEWS');
// const route = useRoute();
const articles = ref(null);
const show = ref(null);
// fetch请求本地文件时的路径应该相对于index.html
fetch('../json/articles.json')
    .then(_ => _.json())
    .then(res => {
        articles.value = res
        show.value = res
    })

// 根据页面改变类别
// watch(() => route.params.category, () => {
//     category.value = route.params.category.toUpperCase()
// })
const changeCate = tag => {
    console.log(tag)
    category.value = tag.toUpperCase()
}
bus.on('cateChange', changeCate);
// 卸载前移除监听
onBeforeUnmount(() => {
    bus.off('cateChange', changeCate);
})
</script>

<style scoped>
.main {
    display: grid;
    grid-template-columns: [start] 16rem [end];
    grid-auto-rows: auto;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
}
.main .category {
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
    grid-column: start / end;
    grid-row: 1 / 2;
    background-image: linear-gradient(
        to bottom,
        #fff 0%,
        #fff 50%,
        #ffee7f 50%,
        #ffee7f 100%
    );
    margin: .5rem 0 2rem 0;
}
@media (min-width: 720px) {
    .main {
        grid-template-columns: [start] repeat(2, 16rem) [end];
    }
}
@media (min-width: 1080px) {
    .main {
        grid-template-columns: [start] repeat(3, 16rem) [end];
    }
}
</style>