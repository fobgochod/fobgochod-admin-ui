<template>
    <frame-space>
        <my-medicine-sub></my-medicine-sub>
    </frame-space>
</template>

<script>
export default {
    components: {
        MyMedicineSub: () => import('@/views/spda/MyMedicineSub.vue')
    },
};
</script>

<style scoped>

</style>
