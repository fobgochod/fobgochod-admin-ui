<template>
    <div>
        <el-row>
            <el-col>
                <h1>{{title}}</h1>
            </el-col>
        </el-row>

        <el-row>
            <el-col :span="2">
                <h1>写</h1>
            </el-col>
            <el-col :span="22">
                <el-input v-model="value"></el-input>
            </el-col>
        </el-row>

        <el-row>
            <el-col>
                <el-form :model="values" label-width="50px">
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
    props: ['value'],
    data() {
        return {
            title: '兄弟页面1-写',
            values: {
                data1: '',
                data2: ''
            }
        }
    },
    watch: {
        value: function (val, oldVal) {
            console.log(val, oldVal);
            this.$emit('update:value', this.value);
        },
        'values.data1': function () {
            this.$emit('change-data', this.values)
        },
        'values.data2': function () {
            this.$emit('change-data', this.values)
        }
    }
}
</script>

<style scoped>
.el-row {
    margin-bottom: 40px;
}
</style>