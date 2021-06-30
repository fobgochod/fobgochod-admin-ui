<template>
    <frame-space>
        <unauthorized></unauthorized>
    </frame-space>
</template>

<script>
export default {
    components: {
        Unauthorized: () => import('@/components/error/Unauthorized')
    },
};
</script>
