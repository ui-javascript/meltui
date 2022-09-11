<template>
    <div>

                
        <ARow style="margin-bottom: 10px" v-if="get(props.options, 'search.enabled')" :gutter="20">
    
            <ACol flex="auto">
                <AForm :layout="get(props.options, 'search.layout')" label-align="left">

                <!-- @fix 需要指定宽度为 100%  -->
                <AGrid :cols="get(props.options, 'search.cols')" :colGap="12" style="width: 100%;">
                     
                    <AGridItem 
                        :key="advancedSearch + '_'"
                        v-for="column in columns.filter(column => get(props.schema[column.dataIndex], 'searchable.enabled') && (advancedSearch || (!advancedSearch && !get(props.schema[column.dataIndex], 'searchable.advancedOnly'))) )"
                    >
                    
                        <AFormItem
                            label-col-flex="60px"
                            :field="column.dataIndex" 
                            :label="column.title">

                                <Component
                                :is="column.widget?.type || 'AInput'" 
                                v-model="keyword[column.dataIndex]"
                                @change="handleKeepWatchDeps(column, list)" 
                                v-bind="{
                                     ...get(props.schema[column.dataIndex], 'widget.props'),
                                     options: column.keepWatch ? selectOptions[list[column.keepWatch]] : selectOptions[column.dataIndex],
                                     'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                                     placeholder: getEval(get(props.schema[column.dataIndex], 'searchable.placeholder'), {}, column, null) || ('请输入' + column.title),                                
                               }" />

                            
                        </AFormItem>
                    </AGridItem>
                   

                </AGrid>
                </AForm>

                
            </ACol>

            <!-- <Col flex="20px">
                <Divider direction="vertical" style="height: 100%;" />
            </Col> -->

            <ACol :flex="advancedSearch ? '50px' : '290px' ">
                <ASpace :direction="advancedSearch ? 'vertical' : 'horizontal'">
    
                    <AButton type="primary" @click="fetchList">
                        <template #icon>
                            <IconSearch />
                        </template>
                        查询
                    </AButton>

                    <AButton  status="warning" @click="handleReset">
                        <template #icon>
                            <IconCloseCircle />
                        </template>
                        重置
                    </AButton>
       
                    <AButton status="success" @click="advancedSearch = !advancedSearch">
                        <template  #icon>
                            <IconArrowLeft v-if="advancedSearch" />
                            <IconArrowDown v-else /> 
                        </template>
                        {{ advancedSearch ? '收起' : '展开' }}
                    </AButton>

                </ASpace>

            </ACol>

        </ARow>

        <ADivider v-if="get(props.options, 'search.enabled')" />

        <ARow :gutter="12" style="margin-bottom: 20px;">
            <ACol :span="12" align="left">
            <ASpace>
                <AButton v-if="get(props.options, 'save.url')" 
                    type="primary" @click="handleSave">
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
            :loading="tableLoading"
            @page-change="handlePageChange"
            @page-size-change="handlePageSizeChange"
            :data="list">

            <template #AInput="{ rowIndex, column, record }">
                <AInput v-model="record[column.dataIndex]" v-bind="{
                     'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                     placeholder: getEval(get(props.schema[column.dataIndex], 'widget.placeholder'), record, column, rowIndex) || '请输入',
                     ...get(props.schema[column.dataIndex], 'widget.props'),
                }" />
            </template>

            <template #AInputNumber="{ rowIndex, column, record }">
                <AInputNumber v-model="record[column.dataIndex]" v-bind="{
                     'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                     placeholder: getEval(get(props.schema[column.dataIndex], 'widget.placeholder'), record, column, rowIndex) || '请输入',
                     ...get(props.schema[column.dataIndex], 'widget.props'),
                }" />
            </template>

            <template #ATextarea="{ rowIndex, column, record }">
                <!-- {{ column }} -->
                <ATextarea v-model="record[column.dataIndex]" v-bind="{
                     'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                     placeholder: getEval(get(props.schema[column.dataIndex], 'widget.placeholder'), record, column, rowIndex) || '请输入',
                     ...get(props.schema[column.dataIndex], 'widget.props'),
                }" />
            </template>

            <template #ASelect="{ rowIndex, column, record }">
                <!-- <p>{{column}}</p>
             <p>{{record}}</p>  -->
                <ASelect :options="selectOptions[column.dataIndex] || []" @change="handleKeepWatchDeps(column, record)"
                    v-model="record[column.dataIndex]" v-bind="{
                         'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                         placeholder: getEval(get(props.schema[column.dataIndex], 'widget.placeholder'), record, column, rowIndex) || '请输入',
                         ...get(props.schema[column.dataIndex], 'widget.props'),
                    }" />
            </template>

            <template #ASelectCascader="{ rowIndex, column, record }">
                <ASelect :options="selectOptions[record[column.keepWatch]] || []" v-model="record[column.dataIndex]"
                    v-bind="{
                         'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                         placeholder: getEval(get(props.schema[column.dataIndex], 'widget.placeholder'), record, column, rowIndex) || '请输入',
                         ...get(props.schema[column.dataIndex], 'widget.props'),
                    }" />
            </template>

            <template #format="{ rowIndex, column, record }">
                {{ getEval(column.format, record, column, rowIndex) }}
            </template>

            <template #empty>

            </template>


            <template #operationList="{ record, column, rowIndex }">

                <!-- {{JSON.stringify(props.options.operation.operationList)}} -->
                       
                    <template  v-for="item of props.options.operation.operationList">
                        <APopconfirm v-if="item.needConfirm" 
                        type="warning"
                        :content="item.confirmText || '确认执行操作吗?'"
                        @ok="item.clickEmit ? $emit(item.clickEmit, {record}) : defaultTrigger(item, record)">
                            <Component 
                                :is="item.type || 'AButton'" 
                                v-bind="{
                                'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                                type: 'text',
                                size: 'small',
                                status: item.status,
                                // long: true,
                                style: {paddingLeft: '4px', paddingRight: '4px'},
                                placeholder: getEval(get(props.schema[column.dataIndex], 'widget.placeholder'), record, column, rowIndex) || '请输入',
                                ...get(props.schema[column.dataIndex], 'widget.props'),
                            }" 

                            >{{item.title}}</Component>

                        </APopconfirm>

                        
                        <Component 
                            v-else
                            :is="item.type || 'AButton'" 
                            v-bind="{
                                'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                                type: 'text',
                                size: 'small',
                                status: item.status,
                                // long: true,
                                style: {paddingLeft: '4px', paddingRight: '4px'},
                                placeholder: getEval(get(props.schema[column.dataIndex], 'widget.placeholder'), record, column, rowIndex) || '请输入',
                                ...get(props.schema[column.dataIndex], 'widget.props'),
                            }" 
                            @click="item.clickEmit ? $emit(item.clickEmit, {record}) : defaultTrigger(item, record)">{{item.title}}</Component>
                    </template>
                  
            </template>

        </ATable>
     

        <AModal v-model:visible="visible" :title="modalTitleMapping[formEditMode]">
            <ArcoCrudForm 
                :data="currentRecord" 
                :options="formOptions" 
                :schema="props.schema" 
            />
        </AModal>

    </div>

</template>

<script setup name="ArcoCrudTable">

import { ref, computed, onMounted, watch } from 'vue';

import { getEval, getEval2 } from "@/utils";
import { get, merge, set, upperFirst } from "lodash"

import {CrudOptions} from "@/parser"

import { ArcoCrudForm } from "@/components"
import { IconSearch, IconEdit, IconArrowDown, IconDownload, IconPlus, IconCloseCircle, IconDelete, IconDown, IconArrowLeft } from "@arco-design/web-vue/es/icon"
import { Modal } from '@arco-design/web-vue';
import http from '@/http';

const props = defineProps({
    // data: {
    //     type: Array,
    //     default: []
    // },
    schema: {
        type: Object,
        default: {}
    },
    options: {
        type: Object,
        default: {}
    },
    // loading: {
    //     type: Boolean,
    //     default: false
    // },
})

const list = ref([])

const tableLoading = ref(false)

const pagination = ref({
    current: 1,
    pageSize: 10,
    showTotal: true,
    defaultPageSize: 10, 
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

const formEditMode = ref("") 
const formOptions = computed(() => new CrudOptions(props.options).edit(formEditMode.value === "edit").parse())

const init = () => {
    // debugger

    isVirtualList.value = !!get(props.options, "body.virtualList")

    // console.log("isVirtualList: ")
    // console.log(isVirtualList.value)

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
        formEditMode.value = "view"
        visible.value = true
    }

    if (item.name === 'edit') {
        formEditMode.value = "edit"
        visible.value = true
    }

    console.log("item.name: " + item.name)
    if (item.name === "remove") {
        handleDelete(record)
    }

}

const handleSave = () => {
    currentRecord.value = {}
    visible.value = true
    formEditMode.value = "save"
}


const modalTitleMapping = {
    'edit': "编辑",
    'save': "新增",
    'view': "查看"
}

onMounted(async () => {

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
            key: key,
            width: get(formSchema, "title.width"),
            align: get(formSchema, "title.align") || 'left',
            keepWatch,
            format,
            // formSchema,
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


        let resizable = get(props.options, 'column.resizable')

        columns.value.push({
            title: '操作栏',
            fixed: resizable ? false : 'right',
            align: 'center',
            width: operationList.length * 50 + 40,
            slotName: 'operationList'
        })

        
        if (resizable) {
            columns.value.push({
                title: '',
                fixed: resizable ? false : 'right',
                align: 'center',
                // wdith: "20px",
                slotName: 'empty'
            })
        }

   
    }

    // console.log("columns: ")
    // console.log(JSON.stringify(columns.value))

    // console.log("options: ")
    // console.log(JSON.stringify(props.options))

    // console.log("schema: ")
    // console.log(JSON.stringify(props.schema))

})

const fetchList = async () => {
    let baseUrl = get(props.options, "baseUrl")
    let fetchList = get(props.options, "fetchList")
    let fetchUrl = get(props.options, "fetchList.url")

    if (!baseUrl || !fetchList) {
        return
    }

    tableLoading.value = true
    let method = get(props.options, "fetchList.method")

    const { data } = await http(fetchUrl, {
        method,
        baseURL: baseUrl,
        [method === "GET" ? 'params' : 'data']: {
            page: pagination.value.current,
            pageSize: pagination.value.pageSize,
            ...keyword.value,
        }
    })

    list.value = data.list
    pagination.value.total = data.total

    tableLoading.value = false
}


const handleDelete = async (record) => {
    let baseUrl = get(props.options, "baseUrl")
    let deleteOne = get(props.options, "delete")
    let deleteUrl = get(props.options, "delete.url")

    if (!baseUrl || !deleteOne || !deleteUrl) {
        return
    }

    let method = get(props.options, "delete.method")

    // tableLoading.value = true
    await http( deleteUrl, {
        method,
        baseURL: baseUrl,
        [method === "GET" ? 'params' : 'data']: {
            id: record.id,
        }
    })
    // tableLoading.value = false

    fetchList()


}


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

watch([pagination], async () => {
    fetchList()
}, {
    immediate: true
})

const handleReset = () => {
    keyword.value = {}
    fetchList()
}

</script>
