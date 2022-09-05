# meltui

- 基础示例

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
        .format("record.name + '(No.' + rowIndex  + ')'") // 自定义显示格式
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

