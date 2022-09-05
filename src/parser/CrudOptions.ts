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


    row() {
        this.context = "row"
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