<template>
    <Table 
        @change="handleTableChange"
        :hoverable="props.options?.row?.hover"
        :bordered="get(props.options, 'row.border')"
        :stripe="props.options?.row?.stripe"
        :columns="columns" 
        :expandable="expandable"
        :column-resizable="get(props.options, 'column.resizable')"
        :virtual-list-props="get(props.options, 'body.virtualList')" 
        :pagination="get(props.options, 'pagination') !== false && props.pagination"
        :show-header="get(props.options, 'header.visible')"
        :scroll="get(props.options, 'body.scroll')"
        :row-selection="get(props.options, 'row.selection')"
        :data="props.data">

        <template #input="{ rowIndex, column, record }">
            <Input 
                :placeholder="getEval(get(column.formSchema, 'widget.placeholder') || '请输入', record, column, rowIndex)"
                :allow-clear="column.widget?.clearable"
                v-model="record[column.dataIndex]" 
            />
        </template>

        <template #inputNumber="{ rowIndex, column, record }">
            <InputNumber 
                :placeholder="getEval(get(column.formSchema, 'widget.placeholder') || '请输入', record, column, rowIndex)"
                :allow-clear="column.widget?.clearable"
                v-model="record[column.dataIndex]" 
            />
        </template>

        <template #textArea="{ rowIndex, column, record }">
            <!-- {{ column }} -->
            <Textarea 
                auto-size
                :placeholder="getEval(get(column.formSchema, 'widget.placeholder') || '请输入', record, column, rowIndex)"
                :allow-clear="column.widget?.clearable"
                v-model="record[column.dataIndex]"
            />
        </template>

        <template #select="{ rowIndex, column, record }">
             <!-- <p>{{column}}</p>
             <p>{{record}}</p>  -->
            <Select 
                :options="selectOptions[column.dataIndex] || []" 
                @change="handleKeepWatchDeps(column, record)" 
                v-model="record[column.dataIndex]" />
        </template>

        <template #selectCascader="{ rowIndex, column, record }">
            <Select 
                :options="selectOptions[record[column.keepWatch]] || []" 
                v-model="record[column.dataIndex]" />
        </template>

        <template #format="{ rowIndex, column, record }">
            {{ getEval(column.format, record, column, rowIndex) }}
        </template>

        <template #operationList="{ record }">
            
    
            <Component :is="item.type" 
                v-for="item in props.options.operation.operationList" 
                @click="$modal.info({ title:'Name', content: record.name })">{{item.title}}</Component>
    
        </template>

    </Table>

</template>

<script setup name="ArcoCrudTable">

import { getEval, getEval2 } from "@/utils";
import { get, merge, set, upperFirst } from "lodash"

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
    pagination: {
        type: Object,
        default: {}
    },
})


const columns = ref([]);

const selectOptions = ref({
    '北京': ['海淀', '朝阳', '昌平'],
    '四川': ['成都', '绵阳'],
    '广东': ['广州', '深圳']
})

const keepWatchDeps = ref({
    'province': ['海淀', '朝阳', '昌平'],
})


debugger

let expandable = false
let expandRender = get(props.options, "row.expand")

if (expandRender && expandRender.render) {
    expandable = merge(expandRender, {
      expandedRowRender: (record) => {
        return getEval(expandRender.render, record, {}, null)
      }
    })

    console.log("展开")
    console.log(expandable)
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

onMounted(() => {

    Object.keys(props.schema).forEach(key => {
        let formSchema = props.schema[key]

        let title = get(formSchema, "title.name") || key
        let titleUpperFirst = get(formSchema, "title.upperFirst")

        let selectOpList = get(formSchema, "widget.options")
        if (selectOpList) {
            selectOptions.value[key] = selectOpList
        }

        let keepWatch = get(formSchema, "widget.keepWatch")
        if (keepWatch) {
            keepWatchDeps.value[keepWatch] = key        
        }

        let format = get(formSchema, "widget.format")

        let filterRender = get(formSchema, "filterable.render")
        if (filterRender) {
            set(formSchema, "filterable.filter", (value, record) => {
                return getEval2(filterRender, value, record)
            })
        }

        const filter = get(formSchema, "filterable")
        console.log("filter")
        console.log(filter)

        columns.value.push({
            title: titleUpperFirst ? upperFirst(title) : title,
            dataIndex: key,
            width: get(formSchema, "title.width"),
            // slotName: 'name',
            align: get(formSchema, "title.align") || 'left',
            keepWatch,
            format,
            formSchema,
            sortable: get(formSchema, "sortable"),
            filterable: get(formSchema, "filterable"),
            fixed: get(formSchema, "column.fixed"),
            ellipsis: get(formSchema, "cell.ellipsis"),
            tooltip: get(formSchema, "cell.tooltip"), 
            widget: get(formSchema, "widget") || {},
            slotName: (props.options.edit && get(formSchema, "editable") != false) 
                ? getWidgetType(formSchema)
                : (format ? 'format' : null),
        })

    })

    let operationList = get(props.options, "operation.operationList")
    if (operationList && Object.keys(operationList).length > 0) {
        columns.value.push({
            title: '操作栏',
            slotName: 'operationList'
        })
    }
})


const handleTableChange = (data) => {
    console.log(data)
}

const handleKeepWatchDeps = (column, record) => {
    let deps = keepWatchDeps.value[column.dataIndex]
    if (deps) {
        record[deps] = ""
    }
}
</script>