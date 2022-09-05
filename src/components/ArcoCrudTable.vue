<template>
    <Table 
        @change="handleTableChange"
        :hoverable="props.options?.row?.hover"
        :bordered="props.options?.row?.border"
        :stripe="props.options?.row?.stripe"
        :span-method="dataSpanMethod" :columns="columns" :data="props.data">

        <!-- <template v-for="column in columns" :key="column.dataIndex" 
            #[column.dataIndex]="{ rowIndex, column, record }">
            <Input v-model="props.data[rowIndex][column.dataIndex]" />
        </template> -->

        <!-- <template 
            #name="{ rowIndex }">
            <Input v-model="props.data[rowIndex]['name']" />
        </template> -->
<!-- 
        <template #province="{ rowIndex }">
            <Select v-model="props.data[rowIndex].province" @change="() => handleChange(rowIndex)">
                <Option :key="value" v-for="value of Object.keys(options)">{{ value }}</Option>
            </Select>
        </template>

        <template #select="{ rowIndex }">
            <Select :options="options[props.data[rowIndex].province] || []" v-model="props.data[rowIndex].city" />
        </template> -->

        <template #input="{ rowIndex, column, record }">
            <Input v-model="props.data[rowIndex][column.dataIndex]" />
        </template>

        <template #select="{ rowIndex, column, record }">
             <!-- <p>{{column}}</p>
             <p>{{record}}</p>  -->
            <Select :options="selectOptions[column.dataIndex] || []" @change="handleKeepWatchDeps(column, record)" v-model="record[column.dataIndex]" />
        </template>

        <template #selectCascader="{ rowIndex, column, record }">
            <Select :options="selectOptions[record[column.keepWatch]] || []" v-model="record[column.dataIndex]" />
        </template>

        <template #format="{ rowIndex, column, record }">
            {{ getEval(column.format, record, column, rowIndex) }}
        </template>

    </Table>

</template>

<script setup name="ArcoCrudTable">

import { getEval } from "@/utils";
import { get, set, upperFirst } from "lodash"

// import  {  ArcoCrudTableProps }  from '@/types/ArcoCrudTableProps';

// const props = withDefaults(defineProps<ArcoCrudTableProps>(), {
//     data: [],
//     schema: {},
//     options: {},
//     loading: false,
// })


const props = defineProps({
    data: {
        type: Array,
        default: []
    },
    schema: {
        type: Object,
        default: {}
    },
    options: {
        type: Object,
        default: {}
    },
    loading: {
        type: Boolean,
        default: false
    },
})

console.log("配置")
console.log(props.schema)
console.log(props.options?.row?.hover)

let columns = [
    // {
    //     title: 'Name',
    //     dataIndex: 'name',
    //     slotName: 'name'
    // }, 
    // {
    //     title: 'Salary',
    //     dataIndex: 'salary',
    // }, 
    // {
    //     title: 'Address',
    //     dataIndex: 'address',
    // }, 
    // {
    //     title: 'Province',
    //     dataIndex: 'province',
    //     slotName: 'province'
    // }, 
    // {
    //     title: 'City',
    //     dataIndex: 'city',
    //     slotName: 'city'
    // }, 
    // {
    //     title: 'Email',
    //     dataIndex: 'email',
    // }
];

// const selectOptions = {}

const selectOptions = {
    '北京': ['海淀', '朝阳', '昌平'],
    '四川': ['成都', '绵阳'],
    '广东': ['广州', '深圳']
}

const keepWatchDeps = {
    'province': ['海淀', '朝阳', '昌平'],
}

const getWidgetType = (formSchema) => {
    const widget = get(formSchema, "widget.type")
    const keepWatch = get(formSchema, "widget.keepWatch")
    
    if (widget) {
        if (keepWatch) {
            return widget + 'Cascader'
        }

        return widget
    }

    return 'input' 
}

Object.keys(props.schema).forEach(key => {
    let formSchema = props.schema[key]

    let title = get(formSchema, "title.name") || key
    let titleUpperFirst = get(formSchema, "title.upperFirst")

    let selectOpList = get(formSchema, "widget.options")
    if (selectOpList) {
        selectOptions[key] = selectOpList
    }

    let keepWatch = get(formSchema, "widget.keepWatch")
    if (keepWatch) {
        keepWatchDeps[keepWatch] = key        
    }

    let format = get(formSchema, "widget.format")

    columns.push({
        title: titleUpperFirst ? upperFirst(title) : title,
        dataIndex: key,
        width: get(formSchema, "title.width"),
        // slotName: 'name',
        align: get(formSchema, "title.align") || 'left',
        keepWatch,
        format,
        slotName: (props.options.edit && get(formSchema, "editable") != false) 
            ? getWidgetType(formSchema)
            : (format ? 'format' : null),
    })

})


// columns.forEach(column => {
//     if (column.keepWatch) {
//         const item = columns.filter(item => item.dataIndex === column.keepWatch)
//         item.controlWatch = column.dataIndex
//     }
// })



const handleChange = (rowIndex) => {
    props.data[rowIndex].city = ''
}

const dataSpanMethod = ({ record, column }) => {
    if (record.key === '2' && column.dataIndex === 'name') {
        return {
            rowspan: 2,
        }
    }
    // if (record.name === 'Alisa Ross' && column.dataIndex === 'name') {
    //     return {
    //         rowspan: 2,
    //     }
    // }
};

const handleTableChange = (data) => {
    console.log(data)
}

const handleKeepWatchDeps = (column, record) => {
    let deps = keepWatchDeps[column.dataIndex]
    if (deps) {
        record[deps] = ""
    }
}
</script>