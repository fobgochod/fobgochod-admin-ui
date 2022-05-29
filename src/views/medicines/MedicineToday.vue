<template>
    <frame-space>
        <my-medicine></my-medicine>
    </frame-space>
</template>

<script>
export default {
    components: {
        MyMedicine: () => import('@/views/medicines/sub/MyMedicine.vue')
    }
}
</script>

<style scoped>

</style>
