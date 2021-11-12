<template>
    <div class="wrapper center">
        <canvas id="game" ref="canvas">Your browser do not support canvas</canvas>
        <div class="win" v-if="win">You win !</div>
        <div class="board">
            <div :class="['key', 'left', { 'stop': win }, {'active': active === 'a'}]" ref="left" data-key="a"></div>
            <div :class="['key', 'up', { 'stop': win }, {'active': active === 'w'}]"  ref="up" data-key="w"></div>
            <div :class="['key', 'down', { 'stop': win }, {'active': active === 's'}]"  ref="down" data-key="s"></div>
            <div :class="['key', 'right', { 'stop': win }, {'active': active === 'd'}]"  ref="right" data-key="d"></div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "@vue/reactivity"
import { watch } from "@vue/runtime-core"
const canvas = ref(null)
const win = ref(false)
const active = ref('')

let ctx
const createMap = (ctx, size = 100, n = 3) => {
    ctx.beginPath();
    for (let i = 0; i < n * size; i += size) {
        for (let j = 0; j < n * size; j += size) {
            ctx.rect(i, j, size, size)
        }
    }
    ctx.rect(0, 0, size * n, size * n)
    ctx.stroke();
    ctx.closePath();
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
    const flag = player.x - target.x === -30 && player.y - target.y === -30
    if (flag) {
        window.removeEventListener('keypress', keypressHandler)
        win.value = true
        console.log('you win')
    }
}
const player = {
    x: 20,
    y: 220
}
const target = {
    x: 250,
    y: 50
}
const directions = {
    'w': () => {
        player.y = player.y - 100 > 0 ? player.y - 100 : player.y
    },
    'a': () => {
        player.x = player.x - 100 > 0 ? player.x - 100 : player.x
    },
    's': () => {
        player.y = player.y + 100 < 300 ? player.y + 100 : player.y
    },
    'd': () => {
        player.x = player.x + 100 < 300 ? player.x + 100 : player.x
    }
}
const move = (key) => {
    ctx.clearRect(player.x - 5, player.y - 5, 80, 80)
    directions[key]()
    createPlayer(ctx, player.x, player.y)
    getTarget()
}
const keypressHandler = (ev) => {
    move(ev.key)
}
watch(canvas, () => {
    canvas.value.width = '300'
    canvas.value.height = '300'
    ctx = canvas.value.getContext('2d')
    ctx.shadowOffsetX = 2;
    ctx.shadowOffsetY = 2;
    ctx.shadowBlur = 5;
    ctx.shadowColor = 'rgba(0,0,0,0.33)';
    createMap(ctx)
    createTarget(ctx, target.x, target.y)
    createPlayer(ctx, player.x, player.y)
    window.addEventListener('keypress', keypressHandler)
})
const touchStartHandler = (target) => {
    active.value = target.target.dataset.key
    target.target.dataset.key && move(target.target.dataset.key)
}
const touchEndHandler = () => {
    active.value = ''
}
const left = ref(null);
const up = ref(null);
const down = ref(null);
const right = ref(null);
watch(left, () => {
    left.value.addEventListener('touchstart', touchStartHandler)
    left.value.addEventListener('touchend', touchEndHandler)
})
watch(up, () => {
    up.value.addEventListener('touchstart', touchStartHandler)
    up.value.addEventListener('touchend', touchEndHandler)
})
watch(down, () => {
    down.value.addEventListener('touchstart', touchStartHandler)
    down.value.addEventListener('touchend', touchEndHandler)
})
watch(right, () => {
    right.value.addEventListener('touchstart', touchStartHandler)
    right.value.addEventListener('touchend', touchEndHandler)
})

</script>

<style scoped>
.wrapper {
    margin-top: 2rem;
    padding-bottom: 1rem;
    flex-direction: column;
    gap: 3rem 0;
}
/* #game {
    border: 1px solid #000;
} */
.win {
    position: absolute;
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
    box-shadow: .1rem .1rem .5rem rgba(0, 0, 0, 0.3);
    background-color: rgba(0, 0, 0, 0.1);
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
    box-shadow: inset .1rem .1rem .5rem rgba(0, 0, 0, 0.3);
}
.board .key {
    --width: 8.2rem;
    position: absolute;
    border-top: var(--width) solid transparent;
    border-left: var(--width) solid var(--key-color);
    transition: all .3s;
}
.board .key::after {
    content: '';
    display: block;
    position: absolute;
    width: 2rem;
    height: 2rem;
    background-image: linear-gradient(#fff 0%, #fff 100%),
    linear-gradient(#fff 0%, #fff 100%);
    background-position: 10% 50%, 50% 10%;
    background-size: 1rem .2rem, .2rem 1rem;
    background-repeat: no-repeat;
    --ratio: 0.3;
    bottom: calc(var(--width) * var(--ratio));
    right: calc(var(--width) * (1 - var(--ratio)));
    transform: translate(50%, 50%) rotateZ(-90deg);
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
.board .key.active {
    border-left-color: rgb(255, 145, 0);
}
.board .key.active::after {
    background-image: linear-gradient(#ff5 0%, #ff5 100%),
    linear-gradient(#ff5 0%, #ff5 100%);
}
.stop {
    pointer-events: none;
}
</style>