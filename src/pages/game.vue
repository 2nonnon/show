<template>
    <div class="wrapper center">
        <canvas id="game" ref="canvas">Your browser do not support canvas</canvas>
        <div class="win" v-show="win">You win !</div>
        <div class="board">
            <div :class="['key', 'left', {'stop': win}]" @click="move('a')"></div>
            <div :class="['key', 'up', {'stop': win}]" @click="move('w')"></div>
            <div :class="['key', 'down', {'stop': win}]" @click="move('s')"></div>
            <div :class="['key', 'right', {'stop': win}]" @click="move('d')"></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity"
import { watch } from "@vue/runtime-core"
const canvas = ref(null)
const win = ref(false)

let ctx
const createMap = (ctx, size = 100, n = 3) => {
    ctx.beginPath();
    // ctx.rect(0, 0, n * size, n * size)
    for (let i = 0; i < n * size; i += size) {
        for (let j = 0; j < n * size; j += size) {
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
        win.value = true
        console.log('you win')
    }
}
const location = {
    x: 20,
    y: 220
}
const target = {
    x: 250,
    y: 50
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
    ctx.clearRect(location.x - 5, location.y - 5, 80, 80)
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
    canvas.value.width = '300'
    canvas.value.height = '300'
    ctx = canvas.value.getContext('2d')
    createMap(ctx)
    createTarget(ctx, target.x, target.y)
    createPlayer(ctx, location.x, location.y)
    window.addEventListener('keypress', keypressHandler)
})

</script>

<style scoped>
.wrapper {
    flex-direction: column;
    gap: 1.5rem 0;
}
#game {
    border: 1px solid #000;
    /* box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.33); */
}
.win {
    font-size: 2rem;
    font-weight: bold;
    color: rgb(95, 255, 47);
}
.board {
    position: relative;
    height: 10rem;
    width: 10rem;
    border-radius: 50%;
    overflow: hidden;
    --key-color: rgb(237, 194, 100);
}
.board::after {
    content: "";
    display: block;
    height: 4rem;
    width: 4rem;
    position: absolute;
    background: #fff;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
}
.board .key {
    position: absolute;
    border-top: 8.2rem solid transparent;
    border-left: 8.2rem solid var(--key-color);
}
.board .key.left {
    left: -50%;
    top: 50%;
    transform: translateY(-50%) rotateZ(-135deg);
}
.board .key.right {
    right: -50%;
    top: 50%;
    transform: translateY(-50%) rotateZ(45deg);
}
.board .key.up {
    top: -50%;
    left: 50%;
    transform: translateX(-50%) rotateZ(-45deg);
}
.board .key.down {
    bottom: -50%;
    left: 50%;
    transform: translateX(-50%) rotateZ(135deg);
}
.stop {
    pointer-events: none;
}
</style>