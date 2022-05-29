<template>
    <frame-space>
        <el-row>
            <el-col :span="24">
                <h1 style="margin-bottom: 20px">{{title}}</h1>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
                <Brother1Demo :value.sync="value" @change-data="sendBrother2"></Brother1Demo>
            </el-col>
            <el-col :span="12">
                <Brother2Demo :values="parentValues" :value="value"></Brother2Demo>
            </el-col>
        </el-row>
    </frame-space>
</template>

<script>
export default {
    props: ['value'],
    data() {
        return {
            title: '父页面',
            title2: '2、利用属性',
            parentValues: []
        }
    },
    methods: {
        sendBrother2(broter1Data) {
            this.parentValues = broter1Data;
        },
    },
    components: {
        Brother1Demo: () => import('@/views/demos/Brother1Demo.vue'),
        Brother2Demo: () => import('@/views/demos/Brother2Demo.vue')
    }
};
</script>

<style scoped>

</style>
