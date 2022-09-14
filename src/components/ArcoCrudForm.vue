<template>
    <AForm ref="formRef" auto-label-width :model="formData" :layout="get(props.options, 'layout.type')">
        <AFormItem 
        :field="column.dataIndex" 
        :label="column.title" 
        :rules="get(props.schema[column.dataIndex], 'validatable.enabled') ? get(props.schema[column.dataIndex], 'validatable.rules') : []"
        :validate-trigger="get(props.schema[column.dataIndex], 'validatable.enabled') ? get(props.schema[column.dataIndex], 'validatable.trigger') : []" 
        v-for="column in columns" >
            <Component 
                v-if="props.options.edit?.enabled"
                :is="column.widget.type" 
                v-model="formData[column.dataIndex]" 
                @change="handleKeepWatchDeps(column, formData)" 
                v-bind="{
                    'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                    placeholder: getEval(get(props.schema[column.dataIndex], 'widget.placeholder'), formData) || '请输入', 
                    ...get(props.schema[column.dataIndex], 'widget.props'),
                    options: column.keepWatch ? selectOptions[formData[column.keepWatch]] : selectOptions[column.dataIndex],
               }"
            />
            <span v-else>
                {{ formData[column.dataIndex] }}
            </span>
        </AFormItem>
        

        <!-- <AFormItem>
        <ASpace>
                <AButton type="primary">查询</AButton>
                <AButton>重置</AButton>
            </ASpace>
            </AFormItem> -->

        <!-- {{ JSON.stringify(formData, null, 2) }} -->
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
    }
})

const formData = ref(props.data)
const formRef = ref()
const columns = ref([]);
const selectOptions = ref({})
const keepWatchDeps = ref({})

console.log(props.options)

const handleKeepWatchDeps = (column, record) => {

    if (column.widget.type === "ASelect" && Object.keys(keepWatchDeps.value).includes(column.dataIndex)) {
        let deps = keepWatchDeps.value[column.dataIndex]

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

        columns.value.push({
            title: titleUpperFirst ? upperFirst(title) : title,
            dataIndex: key,
            width: get(formSchema, "title.width"),
            align: get(formSchema, "title.align") || 'left',
            keepWatch,
            format,
            widget: get(formSchema, "widget") || {},
        })

    })

    console.log("columns: ")
    console.log(columns.value)

})


defineExpose({
    formRef
})

</script>


<style lang="less">
    // @import "../assets/styles/color.less";
    body {
        --arcoblue-6: 64,158,255!important;
        --arcoblue-7: 64,158,255!important;
        // --primary-6: 64,158,255;
    
        --orange-6: 230,162,60!important;
        --orange-7: 230,162,60!important;
    
        --green-6: 103,194,58!important;
        --green-7: 103,194,58!important;
    
        --red-6: 245,108,108!important;
        --red-7: 245,108,108!important;
    }
    </style>