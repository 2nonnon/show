<template>
    <div class="main">
        <div class="category">NEWS</div>
        <ArticleCard class="item"></ArticleCard>
    </div>
</template>

<script setup>
import ArticleCard from './ArticleCard.vue';
</script>

<style scoped>
.main {
    display: grid;
    grid-template-columns: 1fr;
    grid-auto-rows: auto;
    gap: 1rem;
    padding: 1rem;
}
.main .category {
    height: 1.5rem;
    line-height: 1.5rem;
    font-size: 1.2rem;
    font-weight: 500;
    text-align: center;
    background-image: linear-gradient(to bottom, #fff 0%, #fff 50%, #ffee7f 50%, #ffee7f 100%);
}
</style>