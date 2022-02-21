<template>
    <frame-space>
        <medicine-record></medicine-record>
    </frame-space>
</template>

<script>
export default {
    components: {
        MedicineRecord: () => import('@/views/spda/MedicineRecordSub.vue')
    },
};
</script>

<style scoped>

</style>
