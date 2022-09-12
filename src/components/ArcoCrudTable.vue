<template>
    <div>

                
        <ARow style="margin-bottom: 10px" v-if="get(formOptions, 'search.enabled')" :gutter="20">
    
            <ACol flex="auto">
                <AForm :layout="get(formOptions, 'search.layout')" label-align="left">

                <!-- @fix 需要指定宽度为 100%  -->
                <AGrid :cols="get(formOptions, 'search.cols')" :colGap="12" style="width: 100%;">
                     
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
    
                    <AButton type="primary" @click="handleSearch">
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

        <ADivider v-if="get(formOptions, 'search.enabled')" />

        <ARow :gutter="12" style="margin-bottom: 20px;">
            <ACol :span="12" align="left">
            <ASpace>
                <AButton v-if="get(formOptions, 'save.url')" 
                    type="primary" @click="handleAdd">
                    <template #icon>
                        <IconPlus style="cursor: pointer;" />
                        </template>
                    新增
                </AButton>

                <AButton 
                    @click="beginEditBatch"
                    v-if="!formOptions?.edit?.enabled && !editing && get(formOptions, 'updateBatch.url')">
                    <template #icon>
                        <IconEdit style="cursor: pointer;" />
                        </template>
                    批量编辑
                </AButton>

                <AButton 
                    @click="handleUpdateBatch"
                    v-if="formOptions?.edit?.enabled && editing && get(formOptions, 'updateBatch.url')">
                    <template #icon>
                        <IconSync style="cursor: pointer;" />
                        </template>
                    保存编辑
                </AButton>

                <AButton status="danger" v-if="selectedKeys.length > 0 && get(formOptions, 'deleteBatch.url')" @click="handleRemoveBatch">
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
            :size="get(formOptions, 'size')"
            :hoverable="formOptions?.row?.hover"
            :stripe="formOptions?.row?.stripe" 
            :bordered="get(formOptions, 'row.border')" 
            :column-resizable="get(formOptions, 'column.resizable')"
            :expandable="expandable" 
            :pagination="pagination"
            :show-header="get(formOptions, 'header.visible')" 
            :scroll="get(formOptions, 'body.scroll')"
            :row-selection="get(formOptions, 'row.selection')" 
            :virtual-list-props="get(formOptions, 'body.virtualList')" 
            v-model:selectedKeys="selectedKeys"
            :columns="columns"
            :loading="tableLoading"
            @page-change="handlePageChange"
            @page-size-change="handlePageSizeChange"
            :data="list">

            <template #AInput="{ rowIndex, column, record }">
                <AInput v-model="record[column.dataIndex]" 
                    v-bind="{
                     'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                     placeholder: getEval(get(props.schema[column.dataIndex], 'widget.placeholder'), record, column, rowIndex) || '请输入',
                     ...get(props.schema[column.dataIndex], 'widget.props'),
                }" 
                    @blur="flagEdited(record)"
                />
            </template>

            <template #AInputNumber="{ rowIndex, column, record }">
                <AInputNumber v-model="record[column.dataIndex]" v-bind="{
                     'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                     placeholder: getEval(get(props.schema[column.dataIndex], 'widget.placeholder'), record, column, rowIndex) || '请输入',
                     ...get(props.schema[column.dataIndex], 'widget.props'),
                }" 
                @blur="flagEdited(record)"
                />
            </template>

            <template #ATextarea="{ rowIndex, column, record }">
                <!-- {{ column }} -->
                <ATextarea v-model="record[column.dataIndex]" v-bind="{
                     'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                     placeholder: getEval(get(props.schema[column.dataIndex], 'widget.placeholder'), record, column, rowIndex) || '请输入',
                     ...get(props.schema[column.dataIndex], 'widget.props'),
                }" 
                @blur="flagEdited(record)"
                />
            </template>

            <template #ASelect="{ rowIndex, column, record }">
                <!-- <p>{{column}}</p>
             <p>{{record}}</p>  -->
                <ASelect :options="selectOptions[column.dataIndex] || []" @change="handleKeepWatchDeps(column, record)"
                    v-model="record[column.dataIndex]" v-bind="{
                         'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                         placeholder: getEval(get(props.schema[column.dataIndex], 'widget.placeholder'), record, column, rowIndex) || '请输入',
                         ...get(props.schema[column.dataIndex], 'widget.props'),
                    }" 
                    @blur="flagEdited(record)"
                    />
            </template>

            <template #ASelectCascader="{ rowIndex, column, record }">
                <ASelect :options="selectOptions[record[column.keepWatch]] || []" v-model="record[column.dataIndex]"
                    v-bind="{
                         'allow-clear': get(props.schema[column.dataIndex], 'widget.clearable'),
                         placeholder: getEval(get(props.schema[column.dataIndex], 'widget.placeholder'), record, column, rowIndex) || '请输入',
                         ...get(props.schema[column.dataIndex], 'widget.props'),
                    }" 
                    @blur="flagEdited(record)"
                    />
            </template>

            <template #format="{ rowIndex, column, record }">
                {{ getEval(column.format, record, column, rowIndex) }}
            </template>

            <template #empty>

            </template>


            <template #operationList="{ record, column, rowIndex }">

                <!-- {{JSON.stringify(formOptions.operation.operationList)}} -->
                       
                    <template  v-for="item of formOptions.operation.operationList.filter(item => (formOptions?.edit?.enabled && item.name === 'edit') ? false : true)">
                        <APopconfirm v-if="item.needConfirm" 
                        type="warning"
                        :content="item.confirmText || '确认执行操作吗?'"
                        @ok="item.clickEmit ? $emit(item.clickEmit, {record}) : operationClickTrigger(item, record)">
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
                            @click="item.clickEmit ? $emit(item.clickEmit, {record}) : operationClickTrigger(item, record)">{{item.title}}</Component>
                    </template>
                  
            </template>

        </ATable>
     

        <AModal v-model:visible="visible" 
            :ok-loading="okLoading"
            @ok="modalOkTrigger"
            :title="modalTitleMapping[formEditMode]">
            <ArcoCrudForm 
                :data="currentRecord" 
                :options="modalOptions" 
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
import { IconSearch, IconEdit, IconSync, IconArrowDown, IconDownload, IconPlus, IconCloseCircle, IconDelete, IconDown, IconArrowLeft } from "@arco-design/web-vue/es/icon"
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
const okLoading = ref(false)
const editing = ref(false)

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
const editedKeys = ref([]);
const keyword = ref({})
const advancedSearch = ref(false)
const columns = ref([]);
const selectOptions = ref({})
const keepWatchDeps = ref({})

let expandable = ref(void 0)
let expandRender = ref()
const isVirtualList = ref(false)

const formEditMode = ref("") 

const formOptions = computed(() => new CrudOptions(props.options)
    .edit(editing.value)
    .parse())

const modalOptions = computed(() => new CrudOptions(formOptions.value)
    .edit(formEditMode.value === "edit")
    .parse())

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

const operationClickTrigger = (item, record) => {  
    // console.log("key: ")
    // console.log(key)
    // console.log("item: ")
    // console.log(JSON.stringify(item, null, 2))

    if (formOptions.value.edit?.enabled) {
        currentRecord.value = record
    } else {
        currentRecord.value = Object.assign({}, record) // 副本模式
    }

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
        handleRemove(record)
    }

}

const modalOkTrigger = async () => {
    let baseUrl = get(formOptions.value, "baseUrl")

    if (formEditMode.value === "edit") {      
        // 自定义事件 
        // if () {} 

        let updateUrl = get(formOptions.value, "update.url")
        let method = get(formOptions.value, "update.method")

        console.log(method)

        console.log("currentRecord")
        console.log(currentRecord.value)

        okLoading.value = true
        await http(updateUrl, {
            method,
            baseURL: baseUrl,
            [method === "GET" ? 'params' : 'data']: {
                ...currentRecord.value
            }
        })
        okLoading.value = false

        fetchList()
    }

    if (formEditMode.value === "add") {      
        // 自定义事件 
        // if () {} 

        let saveUrl = get(formOptions.value, "save.url")
        let method = get(formOptions.value, "save.method")

        console.log(method)

        // console.log("currentRecord")
        // console.log(currentRecord.value)
        okLoading.value = true
        await http(saveUrl, {
            method,
            baseURL: baseUrl,
            [method === "GET" ? 'params' : 'data']: {
                ...currentRecord.value
            }
        })
        okLoading.value = false

        fetchList()
    }

}

const handleAdd = () => {
    currentRecord.value = {}
    visible.value = true
    formEditMode.value = "add"
}


const modalTitleMapping = {
    'edit': "编辑",
    'add': "新增",
    'view': "查看"
}



const fetchList = async () => {
    let baseUrl = get(formOptions.value, "baseUrl")
    let fetchList = get(formOptions.value, "fetchList")
    let fetchUrl = get(formOptions.value, "fetchList.url")

    if (!baseUrl || !fetchList) {
        return
    }

    tableLoading.value = true
    let method = get(formOptions.value, "fetchList.method")

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


const beginEditBatch = () => {
    formEditMode.value = "editBatch"
    editing.value = true
    initColumns()
    // console.log(formOptions.value)
}

const handleUpdateBatch = async () => {
    editing.value = false

    console.log(editedKeys.value)

    // Modal.info({
    //     content: JSON.stringify(editedKeys.value, null, 2)
    // })

    // Modal.info({
    //     content: JSON.stringify(list.value.filter(item => editedKeys.value.includes(item.key)), null, 2)
    // })

    let baseUrl = get(formOptions.value, "baseUrl")
    let method = get(formOptions.value, "updateBatch.method")
    let updateBatchUrl = get(formOptions.value, "updateBatch.url")

    await http(updateBatchUrl, {
        method,
        baseURL: baseUrl,
        [method === "GET" ? 'params' : 'data']: {
            list: list.value.filter(item => editedKeys.value.includes(item.key)),
        }
    })

    editedKeys.value = []
    formEditMode.value = ""
    initColumns()

    fetchList()
}

const handleRemove = async (record) => {
    let baseUrl = get(formOptions.value, "baseUrl")
    let deleteOne = get(formOptions.value, "delete")
    let deleteUrl = get(formOptions.value, "delete.url")

    if (!baseUrl || !deleteOne || !deleteUrl) {
        return
    }

    let method = get(formOptions.value, "delete.method")

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

const handleSearch = () => {
    pagination.value.current = 1
    fetchList()
}



const handleReset = () => {
    pagination.value.current = 1
    keyword.value = {}
    fetchList()
}

const handleRemoveBatch = async () => {
    let baseUrl = get(formOptions.value, "baseUrl")
    let deleteBatch = get(formOptions.value, "deleteBatch")
    let deleteBatchUrl = get(formOptions.value, "deleteBatch.url")

    if (!baseUrl || !deleteBatch || !deleteBatchUrl) {
        return
    }

    let method = get(formOptions.value, "deleteBatchUrl.method") || post

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

const flagEdited = (record) => {
    // console.log("record",  record)

    editedKeys.value.push(record.key)

    console.log(editedKeys.value)
}


const initColumns = () => {
    columns.value = []

    isVirtualList.value = !!get(formOptions.value, "body.virtualList")

    // console.log("isVirtualList: ")
    // console.log(isVirtualList.value)


    selectOptions.value = {}
    keepWatchDeps.value = {}

    expandable.value = void 0
    expandRender.value = get(formOptions.value, "row.expand")

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
            slotName: (!get(formOptions.value, "body.virtualList") && formOptions?.value.edit?.enabled && get(formSchema, "editable") != false)
                ? getWidgetType(formSchema)
                : (format ? 'format' : null),
        })

    })

    let operationList = get(formOptions.value, "operation.operationList")


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

        // @tofix
        set(formOptions.value, "operation.operationList", operationList)

        let resizable = get(formOptions.value, 'column.resizable')

        columns.value.push({
            title: '操作栏',
            fixed: 'right',
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

}

onMounted(async () => {
    initColumns()
})

watch(() => formEditMode.value, (current) => {
    if (current === "editBatch") {
        console.log("编辑模式")
        formOptions.value.edit.enabled = true 
    }
})

watch([pagination], async () => {
    fetchList()
}, {
    immediate: true
})


</script>
