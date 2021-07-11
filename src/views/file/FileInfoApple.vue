<template>
    <frame-space>
        <file-space></file-space>
    </frame-space>
</template>

<script>
export default {
    components: {
        FileSpace: () => import('@/views/file/sub/FileSub')
    },
};
</script>

<style scoped>

</style>
