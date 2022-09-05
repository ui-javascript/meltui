<template>
    <Table :span-method="dataSpanMethod" :columns="columns" :data="props.data">
        <template #name="{ rowIndex }">
            <Input v-model="props.data[rowIndex].name" />
        </template>
        <template #province="{ rowIndex }">
            <Select v-model="props.data[rowIndex].province" @change="() => handleChange(rowIndex)">
                <Option v-for="value of Object.keys(options)">{{ value }}</Option>
            </Select>
        </template>
        <template #city="{ rowIndex }">
            <Select
                :options="options[props.data[rowIndex].province] || []"
                v-model="props.data[rowIndex].city"
            />
        </template>
    </Table>
    
</template>

<script setup name="ArcoCrudTable">

import ArcoCrudTableProps from '@/types'

const props = defineProps<ArcoCrudTableProps>({})

const options = {
    Beijing: ['Haidian', 'Chaoyang', 'Changping'],
    Sichuan: ['Chengdu', 'Mianyang', 'Aba'],
    Guangdong: ['Guangzhou', 'Shenzhen', 'Shantou']
}

const columns = [{
    title: 'Name',
    dataIndex: 'name',
    slotName: 'name'
}, {
    title: 'Salary',
    dataIndex: 'salary',
}, {
    title: 'Address',
    dataIndex: 'address',
}, {
    title: 'Province',
    dataIndex: 'province',
    slotName: 'province'
}, {
    title: 'City',
    dataIndex: 'city',
    slotName: 'city'
}, {
    title: 'Email',
    dataIndex: 'email',
}];



const handleChange = (rowIndex) => {
    data[rowIndex].city = ''
}

const  dataSpanMethod= ({record, column}) => {
    if (record.key === '2' && column.dataIndex === 'name') {
        return {
            rowspan: 2,
        }
    }
    // if (record.name === 'Alisa Ross' && column.dataIndex === 'name') {
    //     return {
    //         rowspan: 2,
    //     }
    // }
};
</script>