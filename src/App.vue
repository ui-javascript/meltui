<template>
    <div style="padding: 20px">
        <ASpace>
            <ASwitch type="round" v-model="searchable">
                <template #checked>
                    搜索模式
                </template>
                <template #unchecked>
                    简约模式
                </template>
            </ASwitch>

            <ASwitch type="round" v-model="editable">
                <template #checked>
                    编辑模式
                </template>
                <template #unchecked>
                    阅读模式
                </template>
            </ASwitch>
        </ASpace>


        <ADivider />

        <AConfigProvider size="small">
            
            <ArcoCrudTable 
                :key="editable + '_' + searchable"
                @showItem="showItem"
                class="mt-2"        
                :options="options" 
                :schema="schema" 
            />

        </AConfigProvider>
       

    </div>
</template>


<script setup lang="ts">



import { Ref } from 'vue';
import { get } from 'lodash';
import { Modal } from '@arco-design/web-vue';

// import { FormSchema, CrudOptions } from '../dist/melt-crud';
// import { ArcoCrudTable, ArcoCrudForm } from '../dist/melt-crud';

import { FormSchema, CrudOptions } from './parser';
import { ArcoCrudTable, ArcoCrudForm } from '@/components';


const searchable = ref(true)
const editable = ref(false)

let options = ref(new CrudOptions()
    .edit(editable.value) // 编辑模式
    // .header(false).visible(false) // 不显示表头
    .row().hover().border().stripe()
    .size().small()
    .layout()
    .search(searchable.value).inline().cols().sm(1).md(2).xl(2)
    // .row().selection().radioType()
    .row().selection().checkboxType().checkAll() // .currentOnly(false)
    // .row().expand().width(50).title('展开行').render("{{ record.key % 2 === 1 ? '我的名字是 is' + record.name + ', 我的地址是 ' + record.address : JSON.stringify(record, null, 2)  }}")    
    // @fix 开启虚拟列表后 复选款无法勾选 --> v-model:selected-keys
    // .body().virtualList().height(300)
    // .body().scroll().y(400)
    // .body().scroll().x(1000) 
    .column().resizable()
    .editOperation()
    .viewOperation() 
    .removeOperation().needConfirm().confirmText("确定删除吗?") 
    .customOperation("自定义").clickEmit("showItem")

    .baseUrl("https://mock.apifox.cn/m1/1087009-0-default/api")
    .fetchList().get("/v1/fetchList")
    .save().get("/v1/fetchList")


    // .customOperation("自定义2").clickEmit("showItem")
    .parse())

watch(() => editable.value, (current, prev) => {    
    // console.log(current, prev)
    // console.log(new CrudOptions(options.value).edit(current).parse())
    options.value = new CrudOptions(options.value).edit(current).parse()

    // console.log("更新")
    // console.log(JSON.stringify(options.value))
}, {
    deep: true
})    

watch(() => searchable.value, (current, prev) => {    
    // console.log(current, prev)
    // console.log(new CrudOptions(options.value).edit(current).parse())
    options.value = new CrudOptions(options.value).search(current).parse()

    // console.log("更新")
    // console.log(JSON.stringify(options.value))
}, {
    deep: true
})    

const schema: Ref = ref({
    name: new FormSchema()
        .title().upperFirst()
            .width(200)
            .left().format("{{ '[No.' + (rowIndex+1)  + ']' + record.name }}")
        .readonly()
        .column().fixed().left()
        .input().placeholder("输入姓名").clearable()
        .searchable() // .placeholder("{{ '请输入' + column.title }}")
        .parse(),

    salary: new FormSchema()
        .title("工资").width(150).center() 
        .inputNumber().placeholder("输入工资").clearable(false)
            // .props({
            //     allowClear: true
            // })
        .sortable().asc().desc()
        .filterable()
            .gt(20000)
            .gt([25000, 100000])
            // .filter("{{ record.salary > value[0] }}")
        .searchable().advancedOnly() // .placeholder("{{ '请输入' + column.title }}")
        .parse(),
   
    address: new FormSchema()
        .title("地址").width(250).center()
        .filterable()
            // .startsWith("北京海淀").startsWith("35 Park Road")
            // .startsWith(["北京海淀", "35 Park Road"])
            .includes(["北京", "绵阳", "Park Road"])
            // .filter(`{{ record.address.startsWith(value[0]) }}`) // 也可以不用写
        .textArea().clearable()
                .placeholder("{{ '请输入' + (record.name ? record.name + '的' : '') + '地址'}}")
                .props({
                    autoSize: true
                })
        .cell().ellipsis().tooltip().width(150) // width会覆盖
        .searchable().advancedOnly() // .placeholder("{{ '请输入' + column.title }}")
        .readonly()
        .parse(),

    province: new FormSchema()
        .title("省份")
            .width(150)
            .center()
        // .column().fixed().right()
        .select({ 
            province: ['北京', '四川', '广东'],
            // 'province': ['海淀', '朝阳', '昌平'],
            '北京': ['海淀', '朝阳', '昌平'],
            '四川': ['成都', '绵阳'],
            '广东': ['广州', '深圳']
        })
        // .props({
        //     allowClear: true
        // })
        .parse(),

    city: new FormSchema()
        .title("城市")
            .width(150)
            .center()
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
        address: '四川绵阳咩咩',
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
