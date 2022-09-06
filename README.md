# meltui

> 基于Arco和VXE的增删改查简单封装, 采用链式语法, 将JSONSchema改成ChainSchema

# API草稿 @todo

- https://static-59728804-d890-4267-8e45-393e10b3c780.bspapp.com/#/pages/test/noteDetail?id=63093bda553eac0001a5472e

---

# 示例 @demo

- 基础示例(带联动)

```vue
<template>
    <ArcoCrudTable 
        :data="data" 
        :options="options" 
        :schema="schema" 
    />
</template>

<script setup lang="ts">
const options = new CrudOptions()
    .edit() // 编辑模式
    .hover().border().stripe()
    .parse()

const schema: Ref = ref({
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
        .select(['北京', '四川', '广东']) // 下拉框选项
        .parse(),
    city: new FormSchema().title("城市").width(100)
        .select().keepWatch("province") // 联动
        .parse(),
})
</script>
```

![image](https://user-images.githubusercontent.com/16240829/188521161-be5557dc-112f-49a9-a91e-930a086948f3.png)

- 行选择器

```js 
const options = ref(
    new CrudOptions()
        // .row().selection().radioType() // 单选
        .row().selection().checkboxType().checkAll().currentOnly(false) // 复选
    .parse()
)
```

- 展开行

```js
const options = ref(
    new CrudOptions()
        .expand().width(100).title("展开行").render("{{ '我的名字是 is' + record.name }}") 
    .parse()
)
```

- 自定义操作列

---

# 参考 @ref