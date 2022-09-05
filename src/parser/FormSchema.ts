import { merge, set, upperFirst, get } from "lodash"

export class FormSchema {
    
    json = {}
    context = ''
    
    constructor(json?: {}) {
        if (json) {
            this.json = merge(this.json, json)
        }
    }


    title(title: string) {
        // this.context = "title"
        set(this.json, 'title.name', title)
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
        set(this.json, 'widget.type', 'input')
        return this
    }

    format(format: string) {
        // this.context = "title"
        set(this.json, 'widget.format', format)
        return this
    }

    placeholder() {
        this.context = "widget"
        set(this.json, 'widget.placeholder', 'input')
        return this
    }

    select(options? : any[]) {
        this.context = "widget"
        set(this.json, 'widget.type', 'select')
        set(this.json, 'widget.options', options)
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
        // this.context = "title"
        set(this.json, 'title.align', 'left')
        return this
    }

    right() {
        // this.context = "title"
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

    readonly(readonly = true) {
        set(this.json, 'editable', !readonly)
        return this
    }

    keepWatch(keepWatch: string) {
        set(this.json, 'widget.keepWatch', keepWatch)
        return this
    }

    parse(json?: {}) {
        if (json) {
            this.json = merge(this.json, json)
        }
        return this.json
    }
    
}