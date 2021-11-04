<template>
    <div class="container">
        <div id="controll">
            <div>
                <span>flex-direction:</span>
                <select name="flexDirection" id="flexDirection" v-model="flex.FDV">
                    <option v-for="value in flexDirectionValues" :key="value" :value="value">{{ value }}</option>
                </select>
            </div>
            <div>
                <span>flex-wrap:</span>
                <label for="nowrap">nowrap</label>
                <label for="wrap">wrap</label>
                <input type="radio" name="fw" id="nowrap" value="nowrap" v-model="flex.FWV">
                <input type="radio" name="fw" id="wrap" value="wrap" v-model="flex.FWV">
            </div>
            <div>
                <span>align-items:</span>
                <select name="alignItems" id="alignItems" v-model="flex.AIV">
                    <option v-for="value in alignItemsValues" :key="value" :value="value">{{ value }}</option>
                </select>
            </div>
            <div>
                <span>justify-content:</span>
                <select name="justifyContent" id="justifyContent" v-model="flex.JCV">
                    <option v-for="value in justifyContentValues" :key="value" :value="value">{{ value }}</option>
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
                <div v-for="num in total" :key="num" class="flexElem">{{ num }}</div>
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
const alignItemsValues = ['center', 'start', 'end', 'flex-start', 'flex-end', 'baseline', 'self-start', 'self-end', 'stretch', 'initial']
const justifyContentValues = ['center', 'start', 'end', 'flex-start', 'flex-end', 'left', 'right', 'baseline', 'space-between', 'space-around', 'space-evenly', 'stretch', 'initial']
const flex = reactive({
    JCV: 'initial',
    AIV: 'initial',
    FDV: 'row',
    FWV: 'nowrap'
})
</script>

<style scoped>
.container {
    width: 100%;
    max-width: 1080px;
}
#wrapper {
    width: 80%;
    margin: 0 auto;
}
.flexCont {
    transition: all .3s;
    width: 100%;
    min-height: 7rem;
    max-height: 20rem;
    border: 2px solid #233;
    display: flex;
    flex-direction: v-bind("flex.FDV");
    flex-wrap: v-bind("flex.FWV");
    justify-content: v-bind("flex.JCV");
    align-items: v-bind("flex.AIV");
    align-content: initial;
    justify-items: initial;
}
.flexCont .flexElem {
    height: 3rem;
    width: 3rem;
    border: 2px solid #233;
    line-height: 3rem;
    text-align: center;
    font-weight: bold;
}
.flexCont .special {
    flex: 0 1 auto;
    order: 1;
    align-self: auto;
}
</style>