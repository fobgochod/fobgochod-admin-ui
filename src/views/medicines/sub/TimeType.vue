<template>
    <el-select v-model='type' style='width: 100%' clearable allow-create filterable>
        <el-option key='1' label='早晨' value='早晨'></el-option>
        <el-option key='2' label='中午' value='中午'></el-option>
        <el-option key='3' label='晚上' value='晚上'></el-option>
        <el-option key='4' label='买入' value='买入'></el-option>
        <el-option key='5' label='卖出' value='卖出'></el-option>
    </el-select>
</template>

<script>
export default {
    props: {
        type: {
            type: String,
            required: false
        },
        success: {
            type: Function,
            default: () => {
            }
        }
    },
    watch: {
        type: function() {
            this.$emit('update:type', this.type)
            this.success()
        }
    }
}
</script>

<style scoped>

</style>
