<template>
    <el-tag v-if='value==="User"' type='primary'>{{ value }}</el-tag>
    <el-tag v-else-if='value==="Owner"' type='success'>{{ value }}</el-tag>
    <el-tag v-else-if='value==="Admin"' type='danger'>{{ value }}</el-tag>
    <el-tag v-else type='warning'>None</el-tag>
</template>

<script>
export default {
    props: {
        value: {
            type: String,
            required: false
        }
    },
    watch: {
        value: function() {
            this.$emit('update:value', this.value)
        }
    }
}
</script>

<style scoped>

</style>
