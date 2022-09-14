# meltui

> 基于Arco和VXE的简单增删改查封装, 采用链式语法, 将JSONSchema改成ChainSchema

![image](https://user-images.githubusercontent.com/16240829/189589335-b5100772-86e2-41cd-9db5-f2106fc594ef.png)

---

# API @building

- https://static-59728804-d890-4267-8e45-393e10b3c780.bspapp.com/#/pages/test/noteDetail?id=63093bda553eac0001a5472e

# 原则

- 众所周知(其实就我), 链式的语法是最适合复制粘贴(Ctrl+CV)的
- 远程数据的配置优先级更高, 会覆盖对本地数据的配置

# 测试

- https://github.com/ui-javascript/demo-meltui-test-20220910

---

# 安装

- https://github.com/ui-javascript/demo-meltui-test-20220910/blob/master/src/main.js
- https://github.com/ui-javascript/demo-meltui-test-20220910/blob/master/src/views/01-melt-arco/page.vue

```bash
npm install meltui@latest lodash @arco-design/web-vue
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

# 主题

- 仿element主题
    - https://arco.design/themes/preview/2279
    - https://element-plus.gitee.io/zh-CN/component/color.html

# 示例 @demo

- 基础示例(带联动)

```js
const options = new CrudOptions()
    .edit() // 编辑模式
    .search() // 搜索模式
    .hover().border().stripe()
    
    .baseUrl("https://mock.apifox.cn/m1/1087009-0-default/api")
    .fetchList().get("/v1/fetchList") // 初始化列表
    .viewOperation().fetch().get("/v1/fetch") // 查看1条数据
    .editOperation().update().post("/v1/update") // 更新1条数据
    .editBatchOperation().updateBatch().post("/v1/updateBatch") // 批量更新
    .addOperation().save().post("/v1/save") // 新增1条数据
    .removeOperation()
        .needConfirm().confirmText("确定删除吗?") // 删除前需要确认
        .delete().post("/v1/delete") // 删除1条数据
    .removeBatchOperation().deleteBatch().post("/v1/deleteBatch") // 批量删除
    .customOperation("自定义").clickEmit("showItem") // 自定义按钮

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
        .textArea().clearable()
            .placeholder("{{ '请输入' + (record.name ? record.name + '的' : '') + '地址'}}")
            .props({
                autoSize: true
            })
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

- 校验数据

```js
const schema = {
    salary: new FormSchema()
        .validatable().blur().max(200_0000).required()
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

- 表格固定高度

```js 
const options = new CrudOptions()
    .body().scroll().y(400) 
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

- 调整列宽(需指定各列的width)

```js 
const options = new CrudOptions()
    .column().resizable() 
    // .body().scroll().x(1000) 
    .parse()
```

- 定制列 @todo

- 排序筛选

```js
const schema = {
    salary: new FormSchema()
        .sortable().asc().desc() // 排序
        .filterable() // 筛选
            // @todo 暂时只支持单选, 待加强
            // gt | lt | eq | startsWith | contains
            .gt(20000).gt([25000, 100000]) 
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