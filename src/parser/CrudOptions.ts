import { merge, set, get } from "lodash"
import { toHandlers } from "vue"

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
        set(this.json, "edit.enabled", editable)
        set(this.json, "edit.mode", 'modal')
        return this
    }

    inlineMode() {
        this.context = ""
        set(this.json, "edit.mode", 'inline')
        return this
    }

    modalMode() {
        this.context = ""
        set(this.json, "edit.mode", 'modal')
        return this
    }

    drawerMode() {
        this.context = ""
        set(this.json, "edit.mode", 'drawer')
        return this
    }

    layout() {
        this.context = "layout"
        return this
    }

    inline(enabled = true) {
        if (this.context === "search" && enabled) {
            set(this.json, "search.layout", "inline")
        }

        // if (this.context === "layout" && enabled) {
        //     set(this.json, "layout.type", "inline")
        // }
        return this
    }

    cols(num?: number) {
        if (this.context === "search" && num) {
            set(this.json, "search.cols", num)
        }
        return this
    }

    /**
     * >= 1600px 响应式配置
     */
    xxl(num: number) {
        if (this.context === "search" && num) {
            let cols = get(this.json, "search.cols")
            set(this.json, "search.cols", merge(cols, { xxl: num }))
        }
        return this
    }

    /**
     * >= 1200px 响应式配置
     */
    xl(num: number) {
        if (this.context === "search" && num) {
            let cols = get(this.json, "search.cols")
            set(this.json, "search.cols", merge(cols, { xl: num }))
        }
        return this
    }


    /**
     * >= 992px 响应式配置
     */
    lg(num: number) {
        if (this.context === "search" && num) {
            let cols = get(this.json, "search.cols")
            set(this.json, "search.cols", merge(cols, { lg: num }))
        }
        return this
    }

    /**
     * >= 768px 响应式配置
     */
    md(num: number) {
        if (this.context === "search" && num) {
            let cols = get(this.json, "search.cols")
            set(this.json, "search.cols", merge(cols, { md: num }))
        }
        return this
    }

    /**
     * >= 576px 响应式配置
     */
    sm(num: number) {
        if (this.context === "search" && num) {
            let cols = get(this.json, "search.cols")
            set(this.json, "search.cols", merge(cols, { sm: num }))
        }
        return this
    }

    /**
     * < 576px 响应式配置
     */
    xs(num: number) {
        if (this.context === "search" && num) {
            let cols = get(this.json, "search.cols")
            set(this.json, "search.cols", merge(cols, { lg: num }))
        }
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

    search(enabled = true) {
        this.context = "search"
        set(this.json, "search.enabled", enabled)
        return this
    }

    virtualList() {
        this.context = "body.virtualList"
        set(this.json, "row.expand", false)
        set(this.json, "pagination", false)
        set(this.json, "edit", false)
        return this
    }

    height(height: number) {
        if (this.context === "body.virtualList") {
            set(this.json, "body.virtualList.height", height)
        }
        return this
    }


    size(size?: 'mini' | 'small' | 'medium' | 'large') {
        this.context = "size"
        if (size) {
            set(this.json, "size", size)
        }
        return this
    }


    mini() {
        if (this.context = "size") {
            set(this.json, "size", "mini")
        }
        
        return this
    }

    small() {
        if (this.context = "size") {
            set(this.json, "size", "small")
        }
        
        return this
    }

    medium() {
        if (this.context = "size") {
            set(this.json, "size", "medium")
        }
        
        return this
    }
    large() {
        if (this.context = "size") {
            set(this.json, "size", "large")
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

    x(num: number| string) {
        if (this.context === "body.scroll") {
            set(this.json, "body.scroll.x", num)
        }
        
        return this
    }

    y(num: number | string) {
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

    operation(currentOnly = true) {
        this.context = "operation"
        return this
    }

    viewOperation(enable = true) {
        if (!enable) {
            return this
        }
        this.context = "operation.view"
        const op = get(this.json, "operation.operationList") || []
        op.push({
            type: 'AButton',
            title: "查看",
            name: 'view',
            idx: 0
        })
        set(this.json, "operation.operationList", op)

        return this
    }

    editOperation(enable = true) {
        if (!enable) {
            return this
        }
        this.context = "operation.edit"
        const op = get(this.json, "operation.operationList") || []
        op.push({
            type: 'AButton',
            name: 'edit',
            idx: 1,
            title: "编辑"
        })
        set(this.json, "operation.operationList", op)

        return this
    }

    removeOperation(enable = true) {
        if (!enable) {
            return this
        }
        this.context = "operation.remove"
        const op = get(this.json, "operation.operationList") || []
        op.push({
            type: 'AButton',
            title: "删除",
            idx: 9999,
            name: "remove",
            status: "danger",
            needConfirm: true,
        })
        set(this.json, "operation.operationList", op)

        return this
    }

    customOperation(opName : string, enabled = true) {
        if (!enabled) {
            return this
        }

        this.context = "operation." + opName 
        const op = get(this.json, "operation.operationList") || []
        op.push({
            type: 'AButton',
            title: opName,
            name: 'custom',
            idx: 100,
            // size: 'mini',
        })
        set(this.json, "operation.customOperationList", op)

        return this
    }

    clickEmit(eventName: string) {
        const op = get(this.json, "operation.operationList") || {}

        if (this.context === "operation.view") {
            let item = op.find((item: any) => item.name === "view")
            if (item) {
                item.clickEmit = eventName
            }
            return this
        }

        if (this.context === "operation.edit") {
            let item = op.find((item: any) => item.name === "edit")
            if (item) {
                item.clickEmit = eventName
            }
            return this
        }
        
        if (this.context === "operation.remove") {
            let item = op.find((item: any) => item.name === "remove")
            if (item) {
                item.clickEmit = eventName
            }
            return this
        }

        
        if (this.context.startsWith("operation.")) {
            let idx = this.context.indexOf(".")
            if (idx > -1 && idx < this.context.length-1) {
                let opName = this.context.substring(idx+1)
                let item = op.find((item: any) => item.title === opName)
                if (item) {
                    item.clickEmit = eventName
                }
            }
        }


        return this
    }


    needConfirm(enabled = true) {
   
        const op = get(this.json, "operation.operationList") || {}

        if (this.context === "operation.view") {
            let item = op.find((item: any) => item.name === "view")
            if (item) {
                item.needConfirm = enabled
            }
            return this
        }

        if (this.context === "operation.edit") {
            let item = op.find((item: any) => item.name === "edit")
            if (item) {
                item.needConfirm = enabled
            }
            return this
        }
        
        if (this.context === "operation.remove") {
            let item = op.find((item: any) => item.name === "remove")
            if (item) {
                item.needConfirm = enabled
            }
            return this
        }

        
        if (this.context.startsWith("operation.")) {
            let idx = this.context.indexOf(".")
            if (idx > -1 && idx < this.context.length-1) {
                let opName = this.context.substring(idx+1)
                let item = op.find((item: any) => item.title === opName)
                if (item) {
                    item.needConfirm = enabled
                }
            }
        }


        return this
    }

    confirmText(text: string) {
   
        const op = get(this.json, "operation.operationList") || {}

        if (this.context === "operation.view") {
            let item = op.find((item: any) => item.name === "view")
            if (item) {
                item.confirmText = text
                item.needConfirm = true
            }
            return this
        }

        if (this.context === "operation.edit") {
            let item = op.find((item: any) => item.name === "edit")
            if (item) {
                item.confirmText = text
                item.needConfirm = true
            }
            return this
        }
        
        if (this.context === "operation.remove") {
            let item = op.find((item: any) => item.name === "remove")
            if (item) {
                item.confirmText = text
                item.needConfirm = true
            }
            return this
        }

        
        if (this.context.startsWith("operation.")) {
            let idx = this.context.indexOf(".")
            if (idx > -1 && idx < this.context.length-1) {
                let opName = this.context.substring(idx+1)
                let item = op.find((item: any) => item.title === opName)
                if (item) {
                    item.confirmText = text
                    item.needConfirm = true
                }
            }
        }


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


    baseUrl(url: string) {
        set(this.json, "baseUrl", url)
        return this
    }


    fetch() {
        this.context = "fetch"
        return this
    }

    fetchList() {
        this.context = "fetchList"
        return this
    }

    delete() {
        this.context = "delete"
        return this
    }

    deleteBatch() {
        this.context = "deleteBatch"
        return this
    }

    save() {
        this.context = "save"
        return this
    }

    saveBatch() {
        this.context = "saveBatch"
        return this
    }

    update() {
        this.context = "update"
        return this
    }

    updateBatch() {
        this.context = "updateBatch"
        return this
    }

    get(url: string) {
        if (this.context == "fetchList") {
            set(this.json, "fetchList.url", url)
            set(this.json, "fetchList.method", "GET")
        }

        if (this.context == "fetch") {
            set(this.json, "fetch.url", url)
            set(this.json, "fetch.method", "GET")
        }

        if (this.context == "save") {
            set(this.json, "save.url", url)
            set(this.json, "save.method", "GET")
        }

        return this
    }

    post(url: string) {
        if (this.context == "fetchList") {
            set(this.json, "fetchList.url", url)
            set(this.json, "fetchList.method", "POST")
        }
        if (this.context == "fetch") {
            set(this.json, "fetch.url", url)
            set(this.json, "fetch.method", "POST")
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