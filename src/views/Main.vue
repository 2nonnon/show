<template>
    <div class="main">
        <div class="category">{{ category }}</div>
        <template v-for="item in articles" :key="item.id">
            <ArticleCard
            :imgUrl="item.imgUrl" 
            :title="item.title" 
            :tags="item.tags"
            :time="item.time"
            :id="item.id"
            ></ArticleCard>
        </template>
    </div>
</template>

<script setup>
import { ref } from '@vue/reactivity';
// import { onUpdated } from '@vue/runtime-core';
import { useRoute } from 'vue-router';
import { watch } from '@vue/runtime-core';
import ArticleCard from '../components/ArticleCard.vue';
const category = ref('NEWS');
const route = useRoute();
const articles = ref([{
    imgUrl: require('../assets/6b70920d25d5be7b0a0b9bb6c23462e6.jpg'),
    title: 'のんYouTube「のんやろが！ちゃんねる」＃6 配信です！「ひげのん!?」YouTubeネームを考える',
    tags: ['Other', 'Web'],
    time: '2021.10.17',
    id: '0001'
},{
    imgUrl: require('../assets/6b70920d25d5be7b0a0b9bb6c23462e6.jpg'),
    title: 'のんYouTube「のんやろが！ちゃんねる」＃6 配信です！「ひげのん!?」YouTubeネームを考える',
    tags: ['Other', 'Web'],
    time: '2021.10.17',
    id: '0002'
},{
    imgUrl: require('../assets/6b70920d25d5be7b0a0b9bb6c23462e6.jpg'),
    title: 'のんYouTube「のんやろが！ちゃんねる」＃6 配信です！「ひげのん!?」YouTubeネームを考える',
    tags: ['Other', 'Web'],
    time: '2021.10.17',
    id: '0003'
},{
    imgUrl: require('../assets/6b70920d25d5be7b0a0b9bb6c23462e6.jpg'),
    title: 'のんYouTube「のんやろが！ちゃんねる」＃6 配信です！「ひげのん!?」YouTubeネームを考える',
    tags: ['Other', 'Web'],
    time: '2021.10.17',
    id: '0004'
}]);
watch(() => route.params.category, () => {
    console.log(route.params.category);
    category.value = route.params.category;
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