import { merge, set } from "lodash"

export class CrudOptions {

    json = {}

    context = ''

    constructor(json?: {}) {
        if (json) {
            this.json = merge(this.json, json)
        }
    }

    edit(editable: boolean = true) {
        this.context = ""
        set(this.json, "edit", editable)
        return this
    }


    header(visible = true) {
        this.context = "header"
        set(this.json, "header.visible", visible)
        return this
    }

    visible(visible = true) {
        if (this.context === 'header') {
            set(this.json, this.context + ".visible", visible)
            return this
        } 
       
        return this
    }


    body() {
        this.context = "body"
        return this
    }

    virtualList() {
        this.context = "body.virtualList"
        // set(this.json, "row.expand", {})
        set(this.json, "pagination", false)
        return this
    }

    height(height: number) {
        if (this.context === "body.virtualList") {
            set(this.json, "body.virtualList.height", height)
        }
        return this
    }


    column() {
        this.context = "column"
        return this
    }

    resizable(enable = true) {
        set(this.json, "column.resizable", enable)
        set(this.json, "row.border.cell", true)
        return this
    }

    scroll() {
        this.context = "body.scroll"
        return this
    }

    x(num: number) {
        if (this.context === "body.scroll") {
            set(this.json, "body.scroll.x", num)
        }
        
        return this
    }

    y(num: number) {
        if (this.context === "body.scroll") {
            set(this.json, "body.scroll.y", num)
        }
        
        return this
    }

    row() {
        this.context = "row"
        return this
    }

    selection() {
        this.context = "row.selection"
        return this
    }

    checkboxType() {
        set(this.json, "row.selection.type", 'checkbox')
        return this
    }

    radioType() {
        set(this.json, "row.selection.type", 'radio')
        return this
    }

    checkAll(checkAll = true) {
        set(this.json, "row.selection.showCheckedAll", checkAll)
        return this
    }

    currentOnly(currentOnly = true) {
        set(this.json, "row.selection.currentOnly", currentOnly)
        return this
    }

    expand(currentOnly = true) {
        this.context = "row.expand"
        return this
    }

    width(width: number) {
        if (this.context) {
            set(this.json, this.context + ".width", width)
            return this
        } 


        return this
    }

    title(title: string) {
        if (this.context) {
            set(this.json, this.context + ".title", title)
            return this
        } 

        return this
    }

    render(render: string) {
        if (this.context) {
            set(this.json, this.context + ".render", render)
            return this
        } 

        return this
    }

    hover(hoverable: boolean = true) {
        if (!this.context || this.context == "row") {
            set(this.json, "row.hover", hoverable)
        }

        return this
    }

    border(hasBorder: boolean = true) {
        if (!this.context || this.context == "row") {
            set(this.json, "row.border.cell", hasBorder)
        }

        return this
    }

    stripe(stripe: boolean = true) {
        if (!this.context || this.context == "row") {
            set(this.json, "row.stripe", stripe)
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