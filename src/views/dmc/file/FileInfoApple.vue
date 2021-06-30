<template>
    <frame-space>
        <file-space></file-space>
    </frame-space>
</template>

<script>
export default {
    components: {
        FileSpace: () => import('@/views/dmc/file/sub/FileSub')
    },
};
</script>

<style scoped>

</style>