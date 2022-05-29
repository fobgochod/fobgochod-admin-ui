<template>
    <div>
        <el-row>
            <el-col>
                <h1>{{title}}</h1>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="2">
                <h1>收</h1>
            </el-col>
            <el-col :span="22">
                <el-input v-model="value" disabled></el-input>
            </el-col>
        </el-row>

        <el-row>
            <el-col>
                <el-form :model="values" disabled label-width="50px">
                    <el-form-item label="数据1">
                        <el-input v-model="values.data1"></el-input>
                    </el-form-item>
                    <el-form-item label="数据2">
                        <el-input v-model="values.data2"></el-input>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
    </div>
</template>

<script>
export default {
    props: ['value', 'values'],
    data() {
        return {
            title: '兄弟页面2-收'
        }
    },
    watch: {
        value: function (val, oldVal) {
            console.log(val, oldVal);
        },
    },
}
</script>

<style scoped>
.el-row {
    margin-bottom: 40px;
}
</style>