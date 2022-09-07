<template>
    <div>

        <Row class="mb-1" v-if="get(props.options, 'search')">
            <Col flex="auto">
                <Row>
                    <Form :layout="get(props.options, 'layout.type')">
                        <Col :span="get(props.options, 'layout.cols')" v-for="column in columns">
                        <FormItem
                            v-if="get(column.formSchema, 'searchable') && ((!advancedSearch && !get(column.formSchema, 'searchable.advancedOnly')) || advancedSearch)"
                            :field="column.dataIndex" :label="column.title">
                            <Component
                                v-if="get(props.options, 'search') && get(column.formSchema, 'searchable') && ((!advancedSearch && !get(column.formSchema, 'searchable.advancedOnly')) || advancedSearch)"
                                :is="column.widget?.type || 'Input'" v-model="keyword[column.dataIndex]"
                                @change="handleKeepWatchDeps(column, props.data)" v-bind="{
                                     'allow-clear': get(column.formSchema, 'widget.clearable'),
                                     placeholder: getEval(get(column.formSchema, 'searchable.placeholder'), {}, column, null) || '请输入' + column.title, 
                                     ...get(column.formSchema, 'widget.props'),
                                     options: column.keepWatch ? selectOptions[props.data[column.keepWatch]] : selectOptions[column.dataIndex],
                                }" />
                        </FormItem>
                        </Col>



                        <!-- {{ JSON.stringify(props.data, null, 2) }} -->
                    </Form>

                </Row>
            </Col>
            <!-- <Col flex="20px">
                <Divider direction="vertical" style="height: 100%;" />
            </Col> -->
            <Col flex="50px">
                <Space direction="vertical">
    
                    <Button status="success" type="primary">
                        <template #icon>
                            <IconSearch />
                        </template>
                        查询
                    </Button>
              
                    <Button @click="keyword = {}">
                        <template #icon>
                            <IconCloseCircle />
                        </template>
                        重置
                    </Button>

                    <Button type="primary" @click="advancedSearch = !advancedSearch">
                        <template  #icon>
                            <IconUp v-if="advancedSearch" />
                            <IconDown v-else /> 
                        </template>
                        {{ advancedSearch ? '收起' : '展开' }}
                    </Button>
                </Space>

            </Col>
        </Row>

        <Divider v-if="get(props.options, 'search')" />

        <Row :gutter="12" class="mb-2">
            <Col :span="12" align="left">
            <Space>
                <Button type="primary">
                
                    <template #icon>
                        <IconPlus class="cursor-pointer" />
                        </template>
                    新增
                </Button>
                <Button status="danger" v-if="selectedKeys.length > 0">
                    <template #icon>
                        <IconDelete class="cursor-pointer" />
                        </template>
                  
                    批量删除
                </Button>
            </Space>
            </Col>

            <Col :span="12" align="right">
                <Button>
                    <template #icon>
                        <IconDownload class="cursor-pointer" />
                        </template>
                 
                    下载
                </Button>
            </Col>

        </Row>

        <!-- <Divider /> -->

        <Table 
            :size="get(props.options, 'size')"
            @change="handleTableChange" :hoverable="props.options?.row?.hover"
            :bordered="get(props.options, 'row.border')" :stripe="props.options?.row?.stripe" :columns="columns"
            :expandable="expandable" :column-resizable="get(props.options, 'column.resizable')"
            :virtual-list-props="get(props.options, 'body.virtualList')"
            :pagination="get(props.options, 'pagination') !== false && props.pagination"
            :show-header="get(props.options, 'header.visible')" :scroll="get(props.options, 'body.scroll')"
            :row-selection="get(props.options, 'row.selection')" v-model:selectedKeys="selectedKeys" :data="props.data">

            <template #input="{ rowIndex, column, record }">
                <Input v-model="record[column.dataIndex]" v-bind="{
                     'allow-clear': get(column.formSchema, 'widget.clearable'),
                     placeholder: getEval(get(column.formSchema, 'widget.placeholder'), record, column, rowIndex) || '请输入',
                     ...get(column.formSchema, 'widget.props'),
                }" />
            </template>

            <template #InputNumber="{ rowIndex, column, record }">
                <InputNumber v-model="record[column.dataIndex]" v-bind="{
                     'allow-clear': get(column.formSchema, 'widget.clearable'),
                     placeholder: getEval(get(column.formSchema, 'widget.placeholder'), record, column, rowIndex) || '请输入',
                     ...get(column.formSchema, 'widget.props'),
                }" />
            </template>

            <template #Textarea="{ rowIndex, column, record }">
                <!-- {{ column }} -->
                <Textarea v-model="record[column.dataIndex]" v-bind="{
                     'allow-clear': get(column.formSchema, 'widget.clearable'),
                     placeholder: getEval(get(column.formSchema, 'widget.placeholder'), record, column, rowIndex) || '请输入',
                     ...get(column.formSchema, 'widget.props'),
                }" />
            </template>

            <template #Select="{ rowIndex, column, record }">
                <!-- <p>{{column}}</p>
             <p>{{record}}</p>  -->
                <Select :options="selectOptions[column.dataIndex] || []" @change="handleKeepWatchDeps(column, record)"
                    v-model="record[column.dataIndex]" v-bind="{
                         'allow-clear': get(column.formSchema, 'widget.clearable'),
                         placeholder: getEval(get(column.formSchema, 'widget.placeholder'), record, column, rowIndex) || '请输入',
                         ...get(column.formSchema, 'widget.props'),
                    }" />
            </template>

            <template #SelectCascader="{ rowIndex, column, record }">
                <Select :options="selectOptions[record[column.keepWatch]] || []" v-model="record[column.dataIndex]"
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
                <Component :is="item.type" v-for="item in props.options.operation.operationList" v-bind="{
                    'allow-clear': get(column.formSchema, 'widget.clearable'),
                    type: 'text',
                    status: item.status,
                    placeholder: getEval(get(column.formSchema, 'widget.placeholder'), record, column, rowIndex) || '请输入',
                    ...get(column.formSchema, 'widget.props'),
                }" @click="$emit(item.clickEmit, {record})">{{item.title}}</Component>


            </template>

        </Table>
    </div>

</template>

<script setup name="ArcoCrudTable">

import { getEval, getEval2 } from "@/utils";
import { get, merge, set, upperFirst } from "lodash"

import { IconRefresh, IconSearch, IconDownload, IconPlus, IconCloseCircle, IconDelete, IconUp, IconDown } from "@arco-design/web-vue/es/icon"

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


const selectedKeys = ref([]);
const keyword = ref({})
const advancedSearch = ref(false)
const columns = ref([]);
const selectOptions = ref({})
const keepWatchDeps = ref({})

let expandable = ref(void 0)
let expandRender = ref()

const init = () => {
    debugger

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

        console.log("展开")
        console.log(expandable.value)
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

    return 'Input'
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

        let filterRender = get(formSchema, "filterable.render")
        if (filterRender) {
            set(formSchema, "filterable.filter", (value, record) => {
                return getEval2(filterRender, value, record)
            })
        }

        const filter = get(formSchema, "filterable")
        console.log("filter")
        console.log(filter)

        debugger

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

    let virtualList = get(props.options, "body.virtualList")
    let operationList = get(props.options, "operation.operationList")

    // 虚拟列表情况下不需要操作栏
    if (!virtualList && operationList && Object.keys(operationList).length > 0) {
        columns.value.push({
            title: '操作栏',
            slotName: 'operationList'
        })
    }

    console.log("columns: ")
    console.log(JSON.stringify(columns.value))

    console.log("options: ")
    console.log(JSON.stringify(props.options))

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