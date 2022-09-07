<template>
    <div style="padding: 20px">
        <Switch type="round" v-model="editable">
            <template #checked>
                编辑模式
            </template>
            <template #unchecked>
                只读模式
            </template>
        </Switch>

        <ArcoCrudTable 
            @showItem="showItem"
            :key="editable + '_'" 
            class="mt-2" 
            :data="data" 
            :pagination="pagination"
            :options="options" 
            :schema="schema" />
    </div>
</template>

<script setup lang="ts">

import { CrudOptions } from '@/parser/CrudOptions';
import { Ref, getCurrentInstance } from 'vue';
import { FormSchema } from './parser';
import { Modal } from '@arco-design/web-vue';

const editable = ref(false)

const options = ref(new CrudOptions()
    .edit(editable.value) // 编辑模式
    // .header().visible(false) // 不显示表头
    .row().hover().border().stripe()
    // .row().selection().radioType()
    .row().selection().checkboxType().checkAll().currentOnly(false)
    .row().expand().width(50).title('展开行').render("{{ record.key % 2 === 0 ? '我的名字是 is' + record.name + ', 我的地址是 ' + record.address : JSON.stringify(record, null, 2)  }}")    
    // .body().virtualList().height(300)
    .body().scroll().x(1500)
    // .column().resizable()
    .viewOperation().clickEmit("showItem")
    .parse())

watch(() => editable.value, (current, prev) => {    
    // console.log(current, prev)
    // console.log(new CrudOptions(options.value).edit(current).parse())
    options.value = new CrudOptions(options.value).edit(current).parse()
})    


const schema: Ref = ref({
    name: new FormSchema()
        .title().upperFirst().width(200).left().format("{{ '[No.' + rowIndex  + ']' + record.name }}")
        // .readonly()
        .column().fixed().left()
        .input().placeholder("输入姓名").clearable()
        .cell().ellipsis().tooltip().width(150) // width会覆盖前面的
        .parse(),
    salary: new FormSchema()
        .title("工资").width(150) // .left() 
        .inputNumber().placeholder("输入工资").clearable(false)
        .sortable().asc().desc()
        .filterable().gt(10000).gt(20000).gt(100000).render("{{ record.salary > value }}")
        .parse(),
    address: new FormSchema()
        .title("地址").width(250).center()
        // .filterable().eq("北京海淀知春路").render(`{{ record.address === value }}`) // @tofix
        .textArea().clearable().placeholder("{{ '请输入' + record.name + '的地址'}}")
        .parse(),
    province: new FormSchema()
        .title("省份") // .width(100)
        // .column().fixed().right()
        .select(['北京', '四川', '广东']) // 下拉框选项
        .parse(),
    city: new FormSchema()
        .title("城市") // .width(100)
        // .column().fixed().right()
        .select().keepWatch("province") // 联动
        .parse(),
})

// schema.value.name = new FormSchema(schema.value.name).title("姓名").parse()

const data = reactive([
    {
        key: '1',
        name: 'Jane Doe',
        salary: 23000,
        address: '北京海淀知春路',
        province: '北京',
        city: '海淀',
        // disabled: true,
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

const pagination = ref({
    pageSize: 5
})

const showItem = (argv: any) => {
    const { record } = argv
    // getCurrentInstance()?.appContext.config.globalProperties.$modal.info({ title:'Name', content: record.name })

    Modal.info({
        title: 'Info Title',
        content: JSON.stringify(record, null, 2)
    });
}

</script>
    

<style lang="scss">
#app {
    font-family: 微软雅黑, Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
