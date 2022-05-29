<template>
    <el-radio-group v-model='radio' :disabled='disabled'>
        <el-radio v-for='option in options' :key='option.key' :label='option.value'>{{ option.label }}</el-radio>
    </el-radio-group>
</template>

<script>
import Role from '@/api/system/role'

export default {
    props: {
        radio: {
            type: String,
            required: false
        },
        disabled: {
            type: Boolean,
            required: false
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
        radio: function() {
            this.$emit('update:radio', this.radio)
        }
    },
    mounted() {
        this.getOptions()
    }
}
</script>

<style scoped>

</style>
