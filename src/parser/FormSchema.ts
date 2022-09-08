import { merge, set, upperFirst, get } from "lodash"
import { toHandlers } from "vue"

export class FormSchema {

    json = {}

    context = ''

    constructor(json?: {}) {
        if (json) {
            this.json = merge(this.json, json)
        }
    }

    column() {
        this.context = "column"
        return this
    }

    fixed() {
        this.context = "column.fixed"
        return this
    }


    title(title?: string) {
        // this.context = "title"
        if (title) {
            set(this.json, 'title.name', title)
        }
        return this
    }

    widget(customComponentName?: string) {
        this.context = "widget"
        if (customComponentName) {
            set(this.json, 'widget.type', customComponentName)
        }
        return this
    }

    input() {
        this.context = "widget"
        set(this.json, 'widget.type', 'AInput')
        return this
    }

    format(format: string) {
        // this.context = "title"
        set(this.json, 'widget.format', format)
        return this
    }

    placeholder(placeholder: string) {
        
        if (this.context === "widget") {
            set(this.json, 'widget.placeholder', placeholder)
        }
        if (this.context === "searchable") {
            set(this.json, 'searchable.placeholder', placeholder)
        }
        return this
    }

    clearable(clearable = true) {
        this.context = "widget"
        set(this.json, 'widget.clearable', clearable)
        return this
    }

    select(options?: any) {
        this.context = "widget"
        set(this.json, 'widget.type', 'ASelect')
        set(this.json, 'widget.options', options)
        return this
    }

    props(props: {}) {
        if (this.context = "widget") {
            set(this.json, 'widget.props', props)
        }
        return this
    }

    inputNumber() {
        this.context = "widget"
        set(this.json, 'widget.type', 'AInputNumber')
        return this
    }

    textArea() {
        this.context = "widget"
        set(this.json, 'widget.type', 'ATextarea')
        return this
    }

    upperFirst() {
        set(this.json, 'title.upperFirst', true)
        return this
    }

    width(width: number) {
        set(this.json, 'title.width', width)

        return this
    }

    left() {
        if (this.context === "column.fixed") {
            set(this.json, 'column.fixed', 'left')
            return this
        }

        set(this.json, 'title.align', 'left')
        return this
    }

    right() {
        if (this.context === "column.fixed") {
            set(this.json, 'column.fixed', 'right')
            return this
        }

        set(this.json, 'title.align', 'right')
        return this
    }

    center() {
        // this.context = "title"
        set(this.json, 'title.align', 'center')
        return this
    }


    editable(editable = true) {
        set(this.json, 'editable', editable)
        return this
    }

    readonly() {
        set(this.json, 'editable', false)
        return this
    }

    /**
     * 联动
     * @param keepWatch 
     * @returns 
     */
    keepWatch(keepWatch: string) {
        set(this.json, 'widget.keepWatch', keepWatch)
        return this
    }



    sortable() {
        this.context = "sortable"
        return this
    }

    asc() {
        if (this.context === "sortable") {
            let sortDirections = get(this.json, "sortable.sortDirections") || []
            sortDirections.push('ascend')
            set(this.json, "sortable.sortDirections", sortDirections)
        }
        return this
    }


    desc() {
        if (this.context === "sortable") {
            let sortDirections = get(this.json, "sortable.sortDirections") || []
            sortDirections.push('descend')
            set(this.json, "sortable.sortDirections", sortDirections)
        }
        return this
    }


    filterable() {
        this.context = "filterable"
        return this
    }

    filter(render: string) {
        if (this.context === "filterable") {
            set(this.json, "filterable.render", render)
        }
        return this
    }

    gt(num: number) {
        if (this.context === "filterable") {
            let filters = get(this.json, "filterable.filters") || []
            filters.push({
                text: '> ' + num,
                value: num + "",
            })

            set(this.json, "filterable.filters", filters)
        }
        return this
    }

    eq(num: any) {
        if (this.context === "filterable") {
            let filters = get(this.json, "filterable.filters") || []
            filters.push({
                text: '= ' + num,
                value: num,
            })

            set(this.json, "filterable.filters", filters)
        }
        return this
    }

    lt(num: number) {
        if (this.context === "filterable") {
            let filters = get(this.json, "filterable.filters") || []
            filters.push({
                text: '< ' + num,
                value: num + "",
            })

            set(this.json, "filterable.filters", filters)
        }
        return this
    }

    
    searchable(enabled = true) {
        this.context = "searchable"
        set(this.json, 'searchable.enabled', enabled)
        return this
    }

    advandedOnly(enabled = true) {
        if (this.context === "searchable") {
            set(this.json, 'searchable.advancedOnly', enabled)
        }
        return this
    }


    cell() {
        this.context = "cell"
        return this
    }

    ellipsis(enabled = true) {
        set(this.json, 'cell.ellipsis', enabled)
        return this
    }

    tooltip(enabled = true) {
        set(this.json, 'cell.tooltip', enabled)
        return this
    }

    parse(json?: {}) {
        if (json) {
            this.json = merge(this.json, json)
        }
        return this.json
    }

}