<template>
    <ArcoCrudTable 
        data="data" 
        options="options"
    />
</template>

<script setup lang="ts">

import { CrudOptions } from '@/parser/CrudOptions';
import { reactive } from 'vue';

// console.log("当前表达式")
const options = new CrudOptions({ a: 1 }).parse({ b: 2 })

const data = reactive([{
    key: '1',
    name: 'Jane Doe',
    salary: 23000,
    address: '32 Park Road, London',
    province: 'Beijing',
    city: 'Haidian',
    email: 'jane.doe@example.com'
}, {
    key: '2',
    name: 'Alisa Ross',
    salary: 25000,
    address: '35 Park Road, London',
    email: 'alisa.ross@example.com'
}, {
    key: '3',
    name: 'Kevin Sandra',
    salary: 22000,
    address: '31 Park Road, London',
    province: 'Sichuan',
    city: 'Mianyang',
    email: 'kevin.sandra@example.com'
}, {
    key: '4',
    name: 'Ed Hellen',
    salary: 17000,
    address: '42 Park Road, London',
    email: 'ed.hellen@example.com'
}, {
    key: '5',
    name: 'William Smith',
    salary: 27000,
    address: '62 Park Road, London',
    email: 'william.smith@example.com'
}]);
</script>
    

<style lang="scss">
#app {
    font-family: 微软雅黑, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.title {
    margin: 0;
    font-size: 32px;
}

.box {
    // position: relative;
    max-width: 80vw;
    // max-height: 80vh;
    // box-shadow: 0 0 15px 1px rgba(0, 0, 0, 0.2);
    margin: 0 auto 10vh;
    // overflow-x: hidden;
    padding: 10px 0;

}

::-webkit-scrollbar-track {
    background: hsla(0, 0%, 100%, 0.15);
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgb(37 37 37 / 5%);
}

::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.12);
    border-radius: 3px;
    box-shadow: inset 0 0 5px rgb(0 21 41 / 5%);
}

::-webkit-scrollbar {
    width: 6px;
    height: 6px;
}
</style>
