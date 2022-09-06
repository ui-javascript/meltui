# meltui

> 基于Arco和VXE的常规增删改查封装, 采用链式语法, 将JSONSchema改成ChainSchema

# API文档

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
    name: new FormSchema().upperFirst().width(150).left()
        .readonly()
        .format("'(No.' + rowIndex  + ')' + record.name") // 自定义显示格式
        .parse(),
    salary: new FormSchema().title("工资").width(100).center()
        .readonly()
        .parse(),
    address: new FormSchema().title("地址").width(100).right()
        .readonly()
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

- 自定义操作列

---

# 参考 @ref