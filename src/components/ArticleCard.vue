<template>
    <div class="container">
        <div class="cover" @click="toArticle(id, tags[0])">
            <img :src="imgUrl" />
        </div>
        <div class="content">
            <div class="title" @click="toArticle(id, tags[0])">
                <h3>{{ title }}</h3>
            </div>
            <div class="tags">
                <span v-for="tag, i in tags" :key="i" @click="tagNav(tag)">{{ tag }}</span>
            </div>
            <div class="bottom">
                <div class="time">{{ props.time }}</div>
                <div class="continue" @click="toArticle(id, tags[0])">继续阅读</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { defineProps, defineEmits } from '@vue/runtime-core';
import { useRouter } from 'vue-router';
const router = useRouter();
const props = defineProps({
    imgUrl: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    tags: {
        type: Array,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
})
// 类别切换触发事件
const emit = defineEmits({
    'cateChange': function() {
        return true;
    }
})
// tag标签事件，进入相应类别主页
const tagNav = (tag) => {
    console.log(tag)
    emit('cateChange', tag)
    router.replace({
        name: 'Category',
        params: {
            'category': tag
        }
    })
}
// 进入文章页面
const toArticle = (id, tag) => {
    console.log(id, tag)
    router.replace({
        name: 'Container',
        params: {
            'tag': tag,
            'id': id,
        }
    })
}
</script>

<style scoped>
.container {
    /* display: flex;
    flex-direction: column; */
    background-color: #ffee7f;
    height: 20rem;
    width: 100%;
}
.cover {
    height: 50%;
    width: 100%;
    overflow: hidden;
}
.cover > img {
    width: 100%;
    object-fit: cover;
}
.content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 0.8rem;
    height: 50%;
    -webkit-tap-highlight-color: transparent;
}
.title {
    height: 5rem;
}
.tags {
    height: 1.5rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
}
.tags > span {
    font-size: .9rem;
    height: 1.2rem;
    line-height: 1.2rem;
    background-color: #fff8cc;
    padding: 0 0.4rem;
    color: rgb(85, 85, 85);
}
.bottom {
    display: flex;
    justify-content: space-between;
    height: 1.2rem;
}
.title > h3 {
    font-size: 1rem;
    line-height: 1.2rem;
}
.bottom > div {
    height: 1.2rem;
    line-height: 1.2rem;
}
.title > h3:hover,
.bottom > .continue:hover {
    text-decoration: underline;
}
.title > h3,
.bottom > .continue,
.tags > span {
    cursor: pointer;
}
</style>