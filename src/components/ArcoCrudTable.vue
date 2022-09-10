<template>
    <div>

        <ARow style="margin-bottom: 10px" v-if="get(props.options, 'search.enabled')" :gutter="20">
            
            <ACol flex="auto">

                <AForm :layout="get(props.options, 'search.layout')" label-align="left">

                <!-- @fix 需要指定宽度为 100%  -->
                <AGrid :cols="get(props.options, 'search.cols')" :colGap="12" style="width: 100%;">
                        
                    <AGridItem 
                        :key="advancedSearch + '_'"
                        v-for="column in columns.filter(column => get(column.formSchema, 'searchable.enabled') && ( advancedSearch || (!advancedSearch && !get(column.formSchema, 'searchable.advancedOnly'))) )"
                    >

                        <AFormItem
                            label-col-flex="60px"
                            
                            :field="column.dataIndex" 
                            :label="column.title">

                            <Component
                                :is="column.widget?.type || 'AInput'" 
                                v-model="keyword[column.dataIndex]"
                                @change="handleKeepWatchDeps(column, props.data)" 
                                v-bind="{
                                     ...get(column.formSchema, 'widget.props'),
                                     options: column.keepWatch ? selectOptions[props.data[column.keepWatch]] : selectOptions[column.dataIndex],
                                     'allow-clear': get(column.formSchema, 'widget.clearable'),
                                     placeholder: getEval(get(column.formSchema, 'searchable.placeholder'), {}, column, null) || ('请输入' + column.title),                                
                               }" />
                        </AFormItem>
                    </AGridItem>



                        <!-- {{ JSON.stringify(props.data, null, 2) }} -->
                   

                </AGrid>
                </AForm>

                
            </ACol>

            <!-- <Col flex="20px">
                <Divider direction="vertical" style="height: 100%;" />
            </Col> -->

            <ACol :flex="advancedSearch ? '50px' : '290px' ">
                <ASpace :direction="advancedSearch ? 'vertical' : 'horizontal'">
    
                    <AButton status="success" type="primary" @click="advancedSearch = !advancedSearch">
                        <template  #icon>
                            <IconDoubleLeft v-if="advancedSearch" />
                            <IconDoubleRight v-else /> 
                        </template>
                        {{ advancedSearch ? '收起' : '展开' }}
                    </AButton>
             
              
                    <AButton type="primary" status="warning" @click="keyword = {}">
                        <template #icon>
                            <IconCloseCircle />
                        </template>
                        重置
                    </AButton>
       
                    <AButton type="primary">
                        <template #icon>
                            <IconSearch />
                        </template>
                        查询
                    </AButton>
             
                </ASpace>

            </ACol>

        </ARow>

        <ADivider v-if="get(props.options, 'search.enabled')" />

        <ARow :gutter="12" style="margin-bottom: 20px;">
            <ACol :span="12" align="left">
            <ASpace>
                <AButton type="primary">
                    <template #icon>
                        <IconPlus style="cursor: pointer;" />
                        </template>
                    新增
                </AButton>
                <AButton v-if="selectedKeys.length > 0">
                    <template #icon>
                        <IconEdit style="cursor: pointer;" />
                        </template>
                  
                    批量更新
                </AButton>
                <AButton status="danger" v-if="selectedKeys.length > 0">
                    <template #icon>
                        <IconDelete style="cursor: pointer;" />
                        </template>
                  
                    批量删除
                </AButton>
            </ASpace>
            </ACol>

            <ACol :span="12" align="right">
                <AButton>
                    <template #icon>
                        <IconDownload style="cursor: pointer;" />
                        </template>
                 
                    下载
                </AButton>
            </ACol>

        </ARow>

        <!-- <Divider /> -->

        <ATable 
            :size="get(props.options, 'size')"
            :hoverable="props.options?.row?.hover"
            :stripe="props.options?.row?.stripe" 
            :bordered="get(props.options, 'row.border')" 
            :column-resizable="get(props.options, 'column.resizable')"
            :expandable="expandable" 
            :pagination="pagination"
            :show-header="get(props.options, 'header.visible')" 
            :scroll="get(props.options, 'body.scroll')"
            :row-selection="get(props.options, 'row.selection')" 
            :virtual-list-props="get(props.options, 'body.virtualList')" 
            v-model:selectedKeys="selectedKeys"
            :columns="columns"
            @page-change="handlePageChange"
            @page-size-change="handlePageSizeChange"
            :data="props.data">

            <template #AInput="{ rowIndex, column, record }">
                <AInput v-model="record[column.dataIndex]" v-bind="{
                     'allow-clear': get(column.formSchema, 'widget.clearable'),
                     placeholder: getEval(get(column.formSchema, 'widget.placeholder'), record, column, rowIndex) || '请输入',
                     ...get(column.formSchema, 'widget.props'),
                }" />
            </template>

            <template #AInputNumber="{ rowIndex, column, record }">
                <AInputNumber v-model="record[column.dataIndex]" v-bind="{
                     'allow-clear': get(column.formSchema, 'widget.clearable'),
                     placeholder: getEval(get(column.formSchema, 'widget.placeholder'), record, column, rowIndex) || '请输入',
                     ...get(column.formSchema, 'widget.props'),
                }" />
            </template>

            <template #ATextarea="{ rowIndex, column, record }">
                <!-- {{ column }} -->
                <ATextarea v-model="record[column.dataIndex]" v-bind="{
                     'allow-clear': get(column.formSchema, 'widget.clearable'),
                     placeholder: getEval(get(column.formSchema, 'widget.placeholder'), record, column, rowIndex) || '请输入',
                     ...get(column.formSchema, 'widget.props'),
                }" />
            </template>

            <template #ASelect="{ rowIndex, column, record }">
                <!-- <p>{{column}}</p>
             <p>{{record}}</p>  -->
                <ASelect :options="selectOptions[column.dataIndex] || []" @change="handleKeepWatchDeps(column, record)"
                    v-model="record[column.dataIndex]" v-bind="{
                         'allow-clear': get(column.formSchema, 'widget.clearable'),
                         placeholder: getEval(get(column.formSchema, 'widget.placeholder'), record, column, rowIndex) || '请输入',
                         ...get(column.formSchema, 'widget.props'),
                    }" />
            </template>

            <template #ASelectCascader="{ rowIndex, column, record }">
                <ASelect :options="selectOptions[record[column.keepWatch]] || []" v-model="record[column.dataIndex]"
                    v-bind="{
                         'allow-clear': get(column.formSchema, 'widget.clearable'),
                         placeholder: getEval(get(column.formSchema, 'widget.placeholder'), record, column, rowIndex) || '请输入',
                         ...get(column.formSchema, 'widget.props'),
                    }" />
            </template>

            <template #format="{ rowIndex, column, record }">
                {{ getEval(column.format, record, column, rowIndex) }}
            </template>

            <template #operationList="{ record, column, rowIndex }">

                <!-- {{JSON.stringify(props.options.operation.operationList)}} -->
                    <Component 
                        :is="item.type || 'AButton'" 
                        v-for="item of props.options.operation.operationList" 
                        v-bind="{
                        'allow-clear': get(column.formSchema, 'widget.clearable'),
                        type: 'text',
                        size: 'small',
                        status: item.status,
                        // long: true,
                        style: {paddingLeft: '4px', paddingRight: '4px'},
                        placeholder: getEval(get(column.formSchema, 'widget.placeholder'), record, column, rowIndex) || '请输入',
                        ...get(column.formSchema, 'widget.props'),
                    }" 
                    
                    @click="item.clickEmit ? $emit(item.clickEmit, {record}) : defaultTrigger(item, record)">{{item.title}}</Component>
            </template>

        </ATable>
     

        <AModal v-model:visible="visible" :title="formEditMode ? '编辑' : '查看'">
            <ArcoCrudForm 
                :data="currentRecord" 
                :options="formOptions" 
                :schema="props.schema" 
            />
        </AModal>

    </div>

</template>

<script setup name="ArcoCrudTable">

import { ref, computed, onMounted } from 'vue';

import { getEval, getEval2 } from "@/utils";
import { get, merge, set, upperFirst } from "lodash"

import {CrudOptions} from "@/parser"

import { ArcoCrudForm } from "@/components"
import { IconSearch, IconEdit, IconDownload, IconPlus, IconCloseCircle, IconDelete, IconDoubleRight, IconDoubleLeft } from "@arco-design/web-vue/es/icon"
import { Modal } from '@arco-design/web-vue';

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

const pagination = ref({
    pageSize: 10,
    showTotal: true, 
    // showJumper: true, 
    showPageSize: true,

})


const visible = ref(false)
const currentRecord = ref({})
const selectedKeys = ref([]);
const keyword = ref({})
const advancedSearch = ref(false)
const columns = ref([]);
const selectOptions = ref({})
const keepWatchDeps = ref({})

let expandable = ref(void 0)
let expandRender = ref()
const isVirtualList = ref(false)

const formEditMode = ref(false) 
const formOptions = computed(() => new CrudOptions(props.options).edit(formEditMode.value).parse())

const init = () => {
    // debugger

    isVirtualList.value = !!get(props.options, "body.virtualList")

    console.log("isVirtualList: ")
    console.log(isVirtualList.value)

    columns.value = []
    selectOptions.value = {}
    keepWatchDeps.value = {}

    expandable.value = void 0
    expandRender.value = get(props.options, "row.expand")

    if (expandRender.value && expandRender.value.render) {
        expandable.value = merge(expandRender.value, {
            expandedRowRender:
                (record) => {
                    return getEval(expandRender.value.render, record, {}, null)
                }
        })

        // console.log("展开")
        // console.log(expandable.value)
    }
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

    return 'AInput'
}

const defaultTrigger = (item, record) => {  
    // console.log("key: ")
    // console.log(key)
    // console.log("item: ")
    // console.log(JSON.stringify(item, null, 2))

    currentRecord.value = record
    // currentRecord.value = Object.assign({}, record) // 副本模式

    if (item.name === 'view') {
        formEditMode.value = false
        visible.value = true
    }

    if (item.name === 'edit') {
        formEditMode.value = true
        visible.value = true
    }

    if (item.name === "remove") {
        Modal.confirm({
            title: "删除确认",
            content: `确认删除吗 ${record.name || record.title || record.id || record.key} ?`,
            status: 'danger'
        })
    }
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

        
        let filterable = get(formSchema, "filterable")

        if (filterable) {
            let filterRender = get(formSchema, "filterable.render")

            let filterableType = get(formSchema, "filterable.type") || 'eq'
            if (filterableType == 'eq') {
                filterRender = `{{ record.${key} === value[0] }}`
            } 
            if (filterableType == 'lt') {
                filterRender = `{{ record.${key} < value[0] }}`
            }
            if (filterableType == 'gt') {
                filterRender = `{{ record.${key} > value[0] }}`
            }
            if (filterableType == 'startsWith') {
                filterRender = `{{ record.${key}.startsWith(value[0]) }}`
            }
            if (filterableType == 'includes') {
                filterRender = `{{ record.${key}.includes(value[0]) }}`
            }

            set(formSchema, "filterable.filter", (value, record) => {
                console.log("value")
                console.log(value)

                return getEval2(filterRender, value, record)
            })
        }



        columns.value.push({
            title: titleUpperFirst ? upperFirst(title) : title,
            dataIndex: key,
            width: get(formSchema, "title.width"),
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
            slotName: (!get(props.options, "body.virtualList") && props.options?.edit?.enabled && get(formSchema, "editable") != false)
                ? getWidgetType(formSchema)
                : (format ? 'format' : null),
        })

    })

    let operationList = get(props.options, "operation.operationList")
    

    if (operationList && operationList.length > 0) {
        // 操作列排序
        operationList.sort((a, b) => {
            if (!a.idx) {
                return -1
            }
            if (!b.idx) {
                return 1
            }
            return a.idx - b.idx
        })
        set(props.options, "operation.operationList", operationList)

        columns.value.push({
            title: '操作栏',
            fixed: 'right',
            align: 'center',
            // width: operationList.length * 70 + 40,
            slotName: 'operationList'
        })
    }

    // console.log("columns: ")
    // console.log(JSON.stringify(columns.value))

    console.log("options: ")
    console.log(JSON.stringify(props.options))

})


const handleTableChange = (data) => {
    // console.log(data)
}

const handlePageSizeChange = (pageSize) => {
    pagination.value = Object.assign({}, pagination.value, {
        pageSize,
    })
}

const handlePageChange = (current) => {
    pagination.value = Object.assign({}, pagination.value, {
        current,
    })
}

const handleKeepWatchDeps = (column, record) => {
    let deps = keepWatchDeps.value[column.dataIndex]
    if (deps) {
        record[deps] = ""
    }
}
</script>
