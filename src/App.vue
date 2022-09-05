<template>
    <ArcoCrudTable style="padding: 20px" :data="data" :options="options" :schema="schema" />
</template>

<script setup lang="ts">

import { CrudOptions } from '@/parser/CrudOptions';
import { Ref } from 'vue';
import { FormSchema } from './parser';

const options = new CrudOptions()
    .edit()
    .hover() // .border(false).stripe(false)
    .parse()

const schema: Ref = ref({
    name: new FormSchema().upperFirst().width(150).left()
        .format("'自定义22223333333' + record.name + '(No.' + rowIndex  + ')'")
        .parse(),
    salary: new FormSchema().title("工资").width(100).center() // .left()
        .readonly()
        .parse(),
    address: new FormSchema().title("地址").width(100).right().left()
        .readonly()
        .parse(),
    province: new FormSchema().width(100).title("省份")
        .select(['北京', '四川', '广东'])
        .parse(),
    city: new FormSchema().title("城市").width(100)
        .select().keepWatch("province")
        .parse(),
})

schema.value.name = new FormSchema(schema.value.name).title("姓名").parse()



const data = reactive([
    {
        key: '1',
        name: 'Jane Doe',
        salary: 23000,
        address: '32 Park Road, London',
        province: '北京',
        city: '海淀',
        email: 'jane.doe@example.com'
    },
    {
        key: '2',
        name: 'Alisa Ross',
        salary: 25000,
        address: '35 Park Road, London',
        email: 'alisa.ross@example.com'
    },
    {
        key: '3',
        name: 'Kevin Sandra',
        salary: 22000,
        address: '31 Park Road, London',
        province: '四川',
        city: '绵阳',
        email: 'kevin.sandra@example.com'
    },
    {
        key: '4',
        name: 'Ed Hellen',
        salary: 17000,
        address: '42 Park Road, London',
        email: 'ed.hellen@example.com'
    },
    {
        key: '5',
        name: 'William Smith',
        salary: 27000,
        address: '62 Park Road, London',
        email: 'william.smith@example.com'
    }
]);

for (let i = 10; i < 1000; i++) {
    data.push({
        key: i + "xx",
        name: 'William Smith',
        salary: 27000,
        address: '62 Park Road, London',
        email: 'william.smith@example.com'
    })
}

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
