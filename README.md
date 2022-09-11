# meltui

> 基于Arco和VXE的简单增删改查封装, 采用链式语法, 将JSONSchema改成ChainSchema

# API草稿 @todo

- https://static-59728804-d890-4267-8e45-393e10b3c780.bspapp.com/#/pages/test/noteDetail?id=63093bda553eac0001a5472e

![image](https://user-images.githubusercontent.com/16240829/189215628-c5fe9741-6e3c-47b5-8253-def7163b1593.png)

---

# 安装

- https://github.com/ui-javascript/demo-meltui-test-20220910/blob/master/src/main.js
- https://github.com/ui-javascript/demo-meltui-test-20220910/blob/master/src/views/01-melt-arco/page.vue

```bash
npm install meltui@latest lodash @arco-design/web-vue/dist/arco.css
```

```js
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

// 全局样式
import '@/assets/styles/globals.scss'
app.use(ArcoVue, {
    size: 'small'
})
```

```vue
<template>
    <ArcoCrudTable 
        :options="options" 
        :schema="schema" 
    />
</template>
```

# 示例 @demo

- 基础示例(带联动)

```js
const options = new CrudOptions()
    .edit() // 编辑模式
    .search() // 搜索模式
    .hover().border().stripe()
    .baseUrl("https://mock.apifox.cn/m1/1087009-0-default/api")
    .fetchList().get("/v1/fetchList") // 初始化接口
    .parse()

const schema = {
    name: new FormSchema().upperFirst().width(100).left()
        // .readonly()
        .input().placeholder("输入姓名")
        .format("{{ '[No.' + rowIndex  + ']' + record.name }}")
        .parse(),
    salary: new FormSchema().title("工资").width(100).right() 
        .inputNumber().placeholder("输入工资").clearable()
        .parse(),
    address: new FormSchema().title("地址").width(200).center()
        .textArea().clearable().placeholder("{{ '请输入' + record.name + '的地址' }}")
        .parse(),
    province: new FormSchema().width(100).title("省份")
        // 下拉框
        .select({
            province: ['北京', '四川', '广东'],
            // 'province': ['海淀', '朝阳', '昌平'],
            '北京': ['海淀', '朝阳', '昌平'],
            '四川': ['成都', '绵阳'],
            '广东': ['广州', '深圳']
        }) 
        .parse(),
    city: new FormSchema().title("城市").width(100)
        .select().keepWatch("province") // 联动
        .parse(),
}
```

- 行选择器

```js 
const options = new CrudOptions()
    // .row().selection().radioType() // 单选
    .row().selection().checkboxType().checkAll().currentOnly(false) // 复选
    .parse()
```

- 展开行

```js
const options = new CrudOptions()
    .row().expand().width(50).title("展开行").render("{{ '我的名字是 ' + record.name }}") 
    .parse()
```

- 文本省略和提示

```js
const schema = {
    address: new FormSchema()
        .cell().ellipsis().tooltip().width(50)
        .parse(),
}
```

- 调整列宽

```js 
const options = new CrudOptions()
    .column().resizable()
    .parse()
```


- 排序筛选

```js
const schema = {
    salary: new FormSchema()
        .sortable().asc().desc() // 排序
        .filterable() // 筛选
            .gt(20000).gt([25000, 100000]) // gt | lt | eq | startsWith | includes
            // .filter("{{ record.salary > value }}") // filter可以不用写
        .parse(),
}
```

- 单元格合并

- 调整列宽

```js
const options = new CrudOptions()
    .column().resizable()
    .parse()
```

- 分组表头

- 自定义操作列

```js
const options = new CrudOptions()
    .editOperation()
    .viewOperation() 
    .removeOperation().needConfirm(true).confirmText("确定删除吗?")
    .customOperation("自定义").clickEmit("showItem")
    .parse()

===
<ArcoCrudTable 
    @showItem="showItem"
/>

===
const showItem = (argv) => {
    const { record } = argv
    Modal.info({ title: 'Info Title', content: JSON.stringify(record, null, 2)});
}
```

- 高级查询

```js
const options = new CrudOptions()
    .layout()
    .search(true).inline().cols().sm(1).md(2).xl(3)
    .parse()

const schema = {
    name: new FormSchema()
        .searchable()
        .parse(),

    salary: new FormSchema()
        .searchable().advancedOnly() // 仅在高级查询中显示
        .parse(),  
}
```

- 虚拟列表

```js
const options = new CrudOptions()
    .body().virtualList().height(300)
    .parse()
```

---

# 参考 @ref

- https://github.com/any86/crud-vue