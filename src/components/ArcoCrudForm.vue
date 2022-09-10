<template>
    <AForm auto-label-width v-model="props.data" :layout="get(props.options, 'layout.type')">
        <AFormItem :field="column.dataIndex" :label="column.title" v-for="column in columns" >
            <Component 
                v-if="props.options.edit?.enabled"
                :is="column.widget.type" 
                v-model="props.data[column.dataIndex]" 
                @change="handleKeepWatchDeps(column, props.data)" 
                v-bind="{
                    'allow-clear': get(column.formSchema, 'widget.clearable'),
                    placeholder: getEval(get(column.formSchema, 'widget.placeholder'), props.data) || '请输入', 
                    ...get(column.formSchema, 'widget.props'),
                    options: column.keepWatch ? selectOptions[props.data[column.keepWatch]] : selectOptions[column.dataIndex],
               }"
            />
            <span v-else>
                {{ props.data[column.dataIndex] }}
            </span>
        </AFormItem>
        

        <!-- <AFormItem>
        <ASpace>
                <AButton type="primary">查询</AButton>
                <AButton>重置</AButton>
            </ASpace>
            </AFormItem> -->

        <!-- {{ JSON.stringify(props.data, null, 2) }} -->
    </AForm>


</template>

<script setup name="ArcoCrudForm">

import { ref, onMounted } from 'vue';

import { getEval, getEval2 } from "@/utils";
import {get, set, upperFirst, merge } from "lodash"

const props = defineProps({
    data: {
        type: Object,
        default: {}
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
    }
})

const columns = ref([]);
const selectOptions = ref({})
const keepWatchDeps = ref({})

const handleKeepWatchDeps = (column, record) => {

    // console.log("column")
    // console.log(JSON.stringify(column))
    // console.log(JSON.stringify(record))
    // console.log(JSON.stringify(keepWatchDeps.value))

    if (column.widget.type === "ASelect" && Object.keys(keepWatchDeps.value).includes(column.dataIndex)) {
        let deps = keepWatchDeps.value[column.dataIndex]
        // console.log("deps:")
        // console.log(JSON.stringify(deps))
        if (deps) {
            record[deps] = ""
        }
    }

}

const init = () => {
    columns.value = []
    selectOptions.value = []
}

onMounted(() => {

    init()

    Object.keys(props.schema).forEach(key => {
        let formSchema = props.schema[key]

        let title = get(formSchema, "title.name") || key
        let titleUpperFirst = get(formSchema, "title.upperFirst")

    
        let selectOpList = get(formSchema, "widget.options")
        if (selectOpList) {
            selectOptions.value = Object.assign({}, selectOpList.value, selectOpList)
        }

        let keepWatch = get(formSchema, "widget.keepWatch")
        if (keepWatch) {
            keepWatchDeps.value[keepWatch] = key        
        }

        let format = get(formSchema, "widget.format")

        // let filterRender = get(formSchema, "filterable.render")
        // if (filterRender) {
        //     set(formSchema, "filterable.filter", (value, record) => {
        //         return getEval2(filterRender, value, record)
        //     })
        // }

        // const filter = get(formSchema, "filterable")
        // console.log("filter")
        // console.log(filter)

        columns.value.push({
            title: titleUpperFirst ? upperFirst(title) : title,
            dataIndex: key,
            width: get(formSchema, "title.width"),
            // slotName: 'name',
            align: get(formSchema, "title.align") || 'left',
            keepWatch,
            format,
            formSchema,
            // sortable: get(formSchema, "sortable"),
            // filterable: get(formSchema, "filterable"),
            // fixed: get(formSchema, "column.fixed"),
            // ellipsis: get(formSchema, "cell.ellipsis"),
            // tooltip: get(formSchema, "cell.tooltip"),
            widget: get(formSchema, "widget") || {},
            // slotName: (props.options.edit && get(formSchema, "editable") != false)
            //     ? getWidgetType(formSchema)
            //     : (format ? 'format' : null),
        })

    })

    // console.log("columns: ")
    // console.log(columns.value)

})

</script>

<style>

</style>