<template>
    <el-select v-model='option' clearable filterable style='width: 100%' :disabled='disabled'>
        <el-option-group v-for='group in options'
                         :key='group.key'
                         :label='group.label'>
            <el-option v-for='item in group.options'
                       :key='item.key'
                       :value='item.value'
                       :label='item.label'>
                <span style='float: left'>{{ item.value }}({{ item.label }})</span>
                <span style='float: right; color: #8492a6; font-size: 13px'>{{ item.other }}</span>
            </el-option>
        </el-option-group>
    </el-select>
</template>

<script>
import User from '@/api/system/user'
import {mapState} from 'vuex'

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
    data() {
        return {
            options: []
        }
    },
    computed: mapState(['userCode']),
    watch: {
        option: function() {
            this.$emit('update:option', this.option)
            this.success()
        }
    },
    methods: {
        getOptions() {
            User.getOptionGroups().then(res => {
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
