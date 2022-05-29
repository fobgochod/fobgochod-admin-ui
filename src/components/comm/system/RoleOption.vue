<template>
    <el-select v-model='option' style='width: 100%'>
        <el-option v-for='item in options'
                   :key='item.key'
                   :value='item.value'
                   :label='item.label'>
        </el-option>
    </el-select>
</template>

<script>
import Role from '@/api/system/role'

export default {
    props: {
        option: {
            type: String,
            required: false
        },
        success: {
            type: Function,
            default: () => {
            }
        }
    },
    data() {
        return {
            options: []
        }
    },
    methods: {
        getOptions() {
            Role.getOptions().then(res => {
                this.options = res.data
            }).catch((err) => {
                this.options = []
                this.$message.error(err.response.data.message)
            })
        }
    },
    watch: {
        option: function() {
            this.$emit('update:option', this.option)
            this.success()
        }
    },
    mounted() {
        this.getOptions()
    }
}
</script>

<style scoped>

</style>
