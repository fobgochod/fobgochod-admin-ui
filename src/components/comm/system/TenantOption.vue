<template>
    <el-select v-model='option' clearable filterable style='width: 100%'>
        <el-option v-for='item in options'
                   :key='item.key'
                   :value='item.value'
                   :label='item.label'>
            <span style='float: left'>{{ item.value }}({{ item.label }})</span>
            <span style='float: right; color: #8492a6; font-size: 13px'>{{ item.other }}</span>
        </el-option>
    </el-select>
</template>

<script>
import Tenant from '@/api/system/tenant'
import {mapState} from 'vuex'

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
    computed: mapState(['tenantCode']),
    watch: {
        option: function() {
            this.$emit('update:option', this.option)
            this.success()
        }
    },
    methods: {
        getOptions() {
            Tenant.getOptions().then(res => {
                this.options = res.data
            }).catch((err) => {
                this.options = []
                this.$message.error(err.response.data.message)
            })
        }
    },
    mounted() {
        this.getOptions()
    }
}
</script>

<style scoped>

</style>
