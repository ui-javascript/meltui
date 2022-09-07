<template>
    <Form>
        <FormItem v-for="column in columns" :field="column.dataIndex" :label="column.title">
            <Component 
                v-if="props.options.edit"
                :is="column.widget.type" 
                v-model="props.data[column.dataIndex]" 
                :placeholder="column.widget.placeholder" 
                :property="column.widget"
            />
            <span v-else>
                {{ props.data[column.dataIndex] }}
            </span>
        </FormItem>

        <!-- {{ JSON.stringify(props.data, null, 2) }} -->
    </Form>
</template>

<script setup name="ArcoCrudForm">

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

onMounted(() => {

    const selectOptions = ref({

    })

    Object.keys(props.schema).forEach(key => {
        let formSchema = props.schema[key]

        let title = get(formSchema, "title.name") || key
        let titleUpperFirst = get(formSchema, "title.upperFirst")

        let selectOpList = get(formSchema, "widget.options")
        if (selectOpList) {
            selectOptions.value[key] = selectOpList
        }

        // let keepWatch = get(formSchema, "widget.keepWatch")
        // if (keepWatch) {
        //     keepWatchDeps.value[keepWatch] = key
        // }

        let format = get(formSchema, "widget.format")

        let filterRender = get(formSchema, "filterable.render")
        if (filterRender) {
            set(formSchema, "filterable.filter", (value, record) => {
                return getEval2(filterRender, value, record)
            })
        }

        // const filter = get(formSchema, "filterable")
        // console.log("filter")
        // console.log(filter)

        columns.value.push({
            title: titleUpperFirst ? upperFirst(title) : title,
            dataIndex: key,
            width: get(formSchema, "title.width"),
            // slotName: 'name',
            align: get(formSchema, "title.align") || 'left',
            // keepWatch,
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

    console.log("columns: ")
    console.log(columns.value)

})

</script>

<style>

</style>