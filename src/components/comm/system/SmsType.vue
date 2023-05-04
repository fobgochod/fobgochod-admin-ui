<template>
    <el-select v-model='option' :disabled=disabled clearable style='width: 100%'>
        <el-option label='生日提醒' value='生日提醒' />
        <el-option label='吃药提醒' value='吃药提醒' />
        <el-option label='挂号提醒' value='挂号提醒' />
        <el-option label='登陆验证码' value='登陆验证码' />
        <el-option label='测试短信' value='测试短信' />
    </el-select>
</template>

<script>
export default {
    props: {
        option: {
            type: String,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false
        },
        success: {
            type: Function,
            default: () => {
            }
        }
    },
    watch: {
        option: function(val, oldVal) {
            this.$emit('update:option', this.option)
            this.success()
        }
    }
}
</script>

<style scoped>

</style>
