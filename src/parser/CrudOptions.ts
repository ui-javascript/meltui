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
            set(this.json, "row.border", hasBorder)
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