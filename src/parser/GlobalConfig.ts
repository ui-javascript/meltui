import { merge } from "lodash"

export class GlobalConfig {
    
    json = {}
    context = null
    
    constructor(json?: {}) {
        if (json) {
            this.json = merge(this.json, json)
        }
    }

    parse(json?: {}) {
        if (json) {
            this.json = merge(this.json, json)
        }
        return this.json
    }
    
}