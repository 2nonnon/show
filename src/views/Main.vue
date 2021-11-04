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
            ></ArticleCard>-->
            <ArticleCard v-bind="item" @cateChange="changeCate"></ArticleCard>
        </template>
    </div>
    <PageBar @pageChange="changePage"></PageBar>
</template>

<script setup>
import { computed, ref } from '@vue/reactivity';
import { onBeforeUnmount } from '@vue/runtime-core';
// import { useRoute } from 'vue-router';
// import { watch } from '@vue/runtime-core';
import ArticleCard from '../components/ArticleCard.vue';
import PageBar from '../components/PageBar.vue';
import bus from '../libs/bus';
const category = ref('News');   // 页面类别
// const route = useRoute();
const articles = ref(null); // 总文章
const cateArticles = ref(null); // 展示类别的文章数
// const show = ref(null); // 本页展示的文章
const per = 6;  // 每页展示数量
// const len = ref(0); // 总文章数
// const pages = ref(0);   // 总页数
const len = computed(() => cateArticles.value.length || 0)
const pages = computed(() => Math.ceil(len.value / per))
const start = ref(0);   // 起始页数
const show = computed(() => cateArticles.value?.slice(start.value, start.value + per))
// fetch请求本地文件时的路径应该相对于index.html
fetch('../json/articles.json')
    .then(_ => _.json())
    .then(res => {
        articles.value = res
        cateArticles.value = [...res]
        // show.value = res.slice(start.value, start.value + per)
        // len.value = cateArticles.value.length
        // pages.value = Math.ceil(len.value / per)
        bus.emit('totalGet', pages.value)
    })

// 根据页码改变内容
const changePage = page => {
    start.value = (page - 1) * per
    // show.value = cateArticles.value.slice(start.value, start.value + per)
    scrollToTop()
}
const scrollToTop = () => {
    window.scrollTo(0, 0);
}

// 根据类别改变内容
const cache = new Map(); // 缓存
const cateShow = tag => {
    if (tag === 'News') {
        cateArticles.value = articles.value
    } else {
        if (!cache.has(tag)) {
            if (tag === 'Other') {
                cache.set(tag, articles.value.filter(item => item.tags.indexOf('Web') === -1))
            } else {
                cache.set(tag, articles.value.filter(item => item.tags.indexOf(tag) !== -1))
            }

        }
        cateArticles.value = cache.get(tag)
    }
}

// 根据搜索改变内容
const searchHandle = value => {
    category.value = `${value.slice(0, 12)}${value.length > 12 ? '...' : ''}的搜索结果`
    cateArticles.value = [...articles.value.filter(item => item.title.indexOf(value) !== -1), ...articles.value.filter(item => item.tags.indexOf(value) !== -1)]
    bus.emit('totalGet', pages.value)
    scrollToTop()
}
bus.on('search', searchHandle)

// 根据页面改变类别
// watch(() => route.params.category, () => {
//     category.value = route.params.category.toUpperCase()
// })
const changeCate = tag => {
    console.log(tag)
    category.value = tag.toUpperCase()
    cateShow(tag)
    bus.emit('totalGet', pages.value)
    scrollToTop()
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
    margin: 0.5rem 0 2rem 0;
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