<template>
    <div class="wrapper center">
        <canvas id="game" ref="canvas">Your browser do not support canvas</canvas>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity"
import { watch } from "@vue/runtime-core"
const canvas = ref(null)

let ctx
const createMap = (ctx, size = 100, n = 3) => {
    ctx.beginPath();
    ctx.rect(10, 10, n * size, n * size)
    for (let i = 10; i < n * size; i += size) {
        for (let j = 10; j < n * size; j += size) {
            ctx.rect(i, j, size, size)
        }
    }
    ctx.stroke();
    ctx.closePath();
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'rgba(0,0,0,0.33)';
}
const createTarget = (ctx, x, y, size = 30) => {
    ctx.beginPath();
    ctx.arc(x, y, size, 0, 2 * Math.PI, true)
    ctx.fillStyle = '#26C109';
    ctx.fill();
    ctx.closePath();
}
const createPlayer = (ctx, x, y, size = 60) => {
    ctx.beginPath();
    ctx.rect(x, y, size, size)
    ctx.fillStyle = '#D90814';
    ctx.fill();
    ctx.closePath();
}
const getTarget = () => {
    const flag = location.x - target.x === -30 && location.y - target.y === -30
    if (flag) {
        window.removeEventListener('keypress', keypressHandler)
        console.log('you win')
    }
}
const location = {
    x: 30,
    y: 230
}
const target = {
    x: 260,
    y: 60
}
const directions = {
    'w': () => {
        location.y = location.y - 100 > 0 ? location.y - 100 : location.y
    },
    'a': () => {
        location.x = location.x - 100 > 0 ? location.x - 100 : location.x
    },
    's': () => {
        location.y = location.y + 100 < 300 ? location.y + 100 : location.y
    },
    'd': () => {
        location.x = location.x + 100 < 300 ? location.x + 100 : location.x
    }
}
const move = (key) => {
    ctx.clearRect(location.x - 10, location.y - 10, 80, 80)
    directions[key]()
    createPlayer(ctx, location.x, location.y)
    getTarget()
}
const keypressHandler = (ev) => {
    // console.log(ev)
    move(ev.key)
}
watch(canvas, () => {
    console.log(canvas)
    canvas.value.width = '400'
    canvas.value.height = '400'
    ctx = canvas.value.getContext('2d')
    createMap(ctx)
    createTarget(ctx, 260, 60)
    createPlayer(ctx, 30, 230)
    window.addEventListener('keypress', keypressHandler)
})

</script>

<style scoped>
</style>