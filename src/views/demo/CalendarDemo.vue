<template>
    <frame-space>
        <calendar></calendar>
    </frame-space>
</template>

<script>
export default {
    data() {
        return {}
    },
    components: {
        Calendar: () => import('@/components/tools/Calendar.vue')
    }
}
</script>
