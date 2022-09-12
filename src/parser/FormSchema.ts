import { merge, set, upperFirst, get, isArray } from "lodash"
import { toHandlers } from "vue"
import { isTypeError } from "xe-utils"

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
            set(this.json, 'title.align', 'center')
        }
        return this
    }

    eq(num: number|string|[]) {
        if (this.context === "filterable") {
            let filters = get(this.json, "filterable.filters") || []

            if (isArray(num)) {
                num.forEach(item => {
                    filters.push({
                        text: '= ' + item,
                        value: item,
                    })
                })
            } else {
                filters.push({
                    text: '= ' + num,
                    value: num,
                })
            }

            set(this.json, "filterable.filters", filters)
            set(this.json, "filterable.type", 'eq')
            set(this.json, 'title.align', 'center')
        }
        return this
    }

    gt(num: number|number[]) {
        if (this.context === "filterable") {
            let filters = get(this.json, "filterable.filters") || []
    

            if (isArray(num)) {
                num.forEach(item => {
                    filters.push({
                        text: '> ' + item,
                        value: item + "",
                    })
                })
            } else {
                filters.push({
                    text: '> ' + num,
                    value: num + "",
                })
            }

            set(this.json, "filterable.filters", filters)
            set(this.json, "filterable.type", 'gt')
            set(this.json, 'title.align', 'center')
        }
        return this
    }


    lt(num: number|number[]) {
        if (this.context === "filterable") {
            let filters = get(this.json, "filterable.filters") || []
 

            if (isArray(num)) {
                num.forEach(item => {
                    filters.push({
                        text: '< ' + item,
                        value: item + "",
                    })
                })
            } else {
                filters.push({
                    text: '< ' + num,
                    value: num + "",
                })
            }

            set(this.json, "filterable.filters", filters)
            set(this.json, "filterable.type", 'lt')
            set(this.json, 'title.align', 'center')
        }
        return this
    }

    startsWith(num: string | string[]) {
        if (this.context === "filterable") {
            let filters = get(this.json, "filterable.filters") || []

            if (isArray(num)) {
                num.forEach(item => {
                    filters.push({
                        text: '' + item,
                        value: item,
                    })
                })
            } else {
                filters.push({
                    text: '' + num,
                    value: num,
                })
            }

            set(this.json, "filterable.filters", filters)
            set(this.json, "filterable.type", 'startsWith')
            set(this.json, 'title.align', 'center')
        }
        return this
    }

    contains(num: string | string[]) {
        if (this.context === "filterable") {
            let filters = get(this.json, "filterable.filters") || []

            if (isArray(num)) {
                num.forEach(item => {
                    filters.push({
                        text: '' + item,
                        value: item,
                    })
                })
            } else {
                filters.push({
                    text: '' + num,
                    value: num,
                })
            }

            set(this.json, "filterable.filters", filters)
            set(this.json, "filterable.type", 'contains')
            set(this.json, 'title.align', 'center')
        }
        return this
    }


    
    searchable(enabled = true) {
        this.context = "searchable"
        set(this.json, 'searchable.enabled', enabled)
        return this
    }

    advancedOnly(enabled = true) {
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

    validatable(enabled = true) {
        this.context = "validatable"
        set(this.json, "validatable.enabled", enabled)
        return this
    }

    blur() {
        if (this.context === "validatable") {
            let trigger = get(this.json, "validatable.trigger") || []
            trigger.push('blur')
            set(this.json, "validatable.trigger", trigger)
        }
        return this
    }

    change() {
        if (this.context === "validatable") {
            let trigger = get(this.json, "validatable.trigger") || []
            trigger.push('change')
            set(this.json, "validatable.trigger", trigger)
        }
        return this
    }

    required(message?: string) {
        if (this.context === "validatable") {
            let trigger = get(this.json, "validatable.rules") || []
            trigger.push({
                required: true,
                message: message || "必填"
            })
            set(this.json, "validatable.rules", trigger)
        }
        return this
    }

    maxLength(num: number, message?: string) {
        if (this.context === "validatable") {
            let trigger = get(this.json, "validatable.rules") || []
            trigger.push({
                maxLength: num,
                message: message || "最大长度" + num
            })
            set(this.json, "validatable.rules", trigger)
        }
        return this
    }

    minLength(num: number, message?: string) {
        if (this.context === "validatable") {
            let trigger = get(this.json, "validatable.rules") || []
            trigger.push({
                maxLength: num,
                message: message || "最小长度" + num
            })
            set(this.json, "validatable.rules", trigger)
        }
        return this
    }

    
    max(val: number, message?: string) {
        if (this.context === "validatable") {
            let trigger = get(this.json, "validatable.rules") || []
            trigger.push({
                type:'number', 
                max: val,
                message: message || "最大值" + val
            })
            set(this.json, "validatable.rules", trigger)
        }
        return this
    }

    min(val: number, message?: string) {
        if (this.context === "validatable") {
            let trigger = get(this.json, "validatable.rules") || []
            trigger.push({
                type:'number', 
                min: val,
                message: message || "最小值" + val
            })
            set(this.json, "validatable.rules", trigger)
        }
        return this
    }


    equal(val: number | string, message?: string) {
        if (this.context === "validatable") {
            let trigger = get(this.json, "validatable.rules") || []
            trigger.push({
                equal: val,
                message: message || "应等于" + val
            })
            set(this.json, "validatable.rules", trigger)
        }
        return this
    }
   
    includes(val: [], message?: string) {
        if (this.context === "validatable") {
            let trigger = get(this.json, "validatable.rules") || []
            trigger.push({
                includes: [],
                message: message || "最小值" + val
            })
            set(this.json, "validatable.rules", trigger)
        }
        return this
    }


    parse(json?: {}) {
        if (json) {
            this.json = merge(this.json, json)
        }
        return this.json
    }

}