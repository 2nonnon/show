<template>
    <section class="container center">
        <div class="page-item" v-if="control.start" @click="turn(start)">«</div>
        <div class="page-item" v-if="control.last" @click="turn(last)">‹</div>
        <div 
            :class="['page-item', { 'active': page === control.activePage }]" 
            v-for="page, i in control.pageShow" 
            :key="`${page}${i}`" 
            @click="turn(toPage, page)"
        >{{ page }}</div>
        <div class="page-item" v-if="control.next" @click="turn(next)">›</div>
        <div class="page-item" v-if="control.end" @click="turn(end)">»</div>
    </section>
</template>

<script setup>
import { ref, reactive, computed } from "@vue/reactivity";
import { defineEmits } from '@vue/runtime-core';
import bus from "../libs/bus";
// 获取总页数
const pages = ref([])
const getTotal = (total) => {
    console.log(total)
    pages.value.length = 0
    for (let i = 1; i <= total; i++) {
        pages.value.push(i);
    }
    start()
};
bus.on('totalGet', getTotal)

// 渲染控制数据
const control = reactive({
    activePage: 1,
    pageShow: computed(() => pages.value.filter(num => {
       return  num >= control.activePage - 2 && num <= control.activePage + 2
    })),
    start: computed(() => {
        if (control.activePage > 3) return true;
        else return false;
    }),
    last: computed(() => {
        if (control.activePage > 1) return true;
        else return false;
    }),
    next: computed(() => {
        if (pages.value.length - control.activePage > 0) return true;
        else return false;
    }),
    end: computed(() => {
        if (pages.value.length - control.activePage > 2) return true;
        else return false;
    })
})

// 换页触发事件
const emit = defineEmits(['pageChange']);
// 点击事件，换页，(策略模式)
const start = () => {
    control.activePage = 1
}
const last = () => {
    control.activePage -= 1
}
const next = () => {
    control.activePage += 1
}
const end = () => {
    control.activePage = pages.value.length
}
const toPage = (page) => {
    control.activePage = page
}
const turn = (handle, page = 0) => {
    page ? handle(page) : handle()
    emit('pageChange', control.activePage)
}
</script>

<style scoped>
.container {
    margin: 1rem auto;
    user-select: none;
}
.page-item {
    height: 2rem;
    width: 1.8rem;
    line-height: 2rem;
    font-size: .9rem;
    text-align: center;
    border: 1px solid #DEE2E6;
    border-right: none;
    cursor: pointer;
}
.container .page-item:first-child {
    border-radius: .2rem 0 0 .2rem;
}
.container .page-item:last-child {
    border-radius: 0 .2rem .2rem 0;
    border-right: 1px solid #DEE2E6;
}
.page-item:hover {
    background-color: #FFF6BF;
}
.container .page-item.active {
    background-color: #FFDD00;
    pointer-events: none;  /* 取消鼠标事件 */
}
</style>