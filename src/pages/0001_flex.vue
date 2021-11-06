<template>
    <div class="container">
        <div id="controller">
            <div>
                <span>flex-direction:</span>
                <select name="flexDirection" id="flexDirection" v-model="flex.flexDirectionValue">
                    <option v-for="value in flexDirectionValues" :key="value" :value="value">{{ value }}</option>
                </select>
            </div>
            <div>
                <span>flex-wrap:</span>
                <label for="nowrap">nowrap</label>
                <label for="wrap">wrap</label>
                <input type="radio" name="fw" id="nowrap" value="nowrap" v-model="flex.flexWrapValue">
                <input type="radio" name="fw" id="wrap" value="wrap" v-model="flex.flexWrapValue">
            </div>
            <div>
                <span>align-items:</span>
                <select name="alignItems" id="alignItems" v-model="flex.alignItemsValue">
                    <option v-for="value in alignItemsValues" :key="value" :value="value">{{ value }}</option>
                </select>
            </div>
            <div>
                <span>justify-content:</span>
                <select name="justifyContent" id="justifyContent" v-model="flex.justifyContentValue">
                    <option v-for="value in justifyContentValues" :key="value" :value="value">{{ value }}</option>
                </select>
            </div>
            <div>
                <span>align-content:</span>
                <select name="alignContent" id="alignContent" v-model="flex.alignContentValue">
                    <option v-for="value in alignContentValues" :key="value" :value="value">{{ value }}</option>
                </select>
            </div>
            <div>
                <span>justify-items:</span>
                <select name="justifyItems" id="justifyItems" v-model="flex.justifyItemsValue">
                    <option v-for="value in justifyItemsValues" :key="value" :value="value">{{ value }}</option>
                </select>
            </div>
            <div>
                <span>flex元素数量:</span>
                <span @click="totalController(true)">+</span>
                <span @click="totalController(false)">-</span>
            </div>
        </div>
        <div id="wrapper">
            <div class="flexCont">
                <div v-for="num in total" :key="num" class="flexElem">{{ new Array(num).fill(num).join('') }}</div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from "@vue/reactivity";
const total = ref(3)
const totalController = (flag) => {
    if (flag) {
         total.value < 10 && total.value++
    } else {
        total.value > 0 && total.value--
    }
}
const flexDirectionValues = ['row', 'row-reverse', 'column', 'column-reverse']
const alignItemsValues = ['normal', 'stretch', 'center', 'start', 'end', 'flex-start', 'flex-end', 'self-start', 'self-end', 'baseline', 'first baseline', 'last baseline',  'safe center', 'unsafe center','inherit', 'initial', 'unset']
const justifyContentValues = ['center', 'start', 'end', 'flex-start', 'flex-end', 'left', 'right', 'baseline', 'first baseline', 'last baseline', 'space-between', 'space-around', 'space-evenly', 'stretch', 'safe center', 'unsafe center', 'inherit', 'initial', 'unset']
const alignContentValues = ['center', 'start', 'end', 'flex-start', 'flex-end', 'normal', 'baseline', 'first baseline', 'last baseline', 'space-between', 'space-around', 'space-evenly', 'stretch', 'safe center', 'unsafe center', 'inherit', 'initial', 'unset']
const justifyItemsValues = ['center', 'start', 'end', 'flex-start', 'flex-end', 'normal', 'baseline', 'first baseline', 'last baseline', 'space-between', 'space-around', 'space-evenly', 'stretch', 'safe center', 'unsafe center', 'inherit', 'initial', 'unset']
const flex = reactive({
    justifyContentValue: 'flex-start',
    alignItemsValue: 'stretch',
    flexDirectionValue: 'row',
    flexWrapValue: 'nowrap',
    alignContentValue: 'normal',
    justifyItemsValue: 'stretch'
})
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 1080px;
}
#wrapper {
    width: 100%;
}
.flexCont {
    transition: all .3s;
    width: 100%;
    min-height: 7rem;
    max-height: 14rem;
    border: 2px solid #233;
    display: flex;
    flex-direction: v-bind("flex.flexDirectionValue");
    flex-wrap: v-bind("flex.flexWrapValue");
    justify-content: v-bind("flex.justifyContentValue");
    align-items: v-bind("flex.alignItemsValue");
    align-content: v-bind("flex.alignContentValue");
    justify-items: v-bind("flex.justifyItemsValue");
}
.flexCont .flexElem {
    /* height: 3rem;
    width: 3rem; */
    border: 2px solid #233;
    /* line-height: 3rem; */
    text-align: center;
    font-weight: bold;
}
.flexCont .special {
    flex: 0 1 auto;
    order: 1;
    align-self: auto;
}
</style>