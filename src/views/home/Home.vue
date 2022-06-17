<template>
    <frame-space>
        <top-space />
        <main-space />
    </frame-space>
</template>

<script>
export default {
    components: {
        TopSpace: () => import('@/views/home/sub/TopSub'),
        MainSpace: () => import('@/views/home/sub/MainSub')
    }
}
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}
</style>
