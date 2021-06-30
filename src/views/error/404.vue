<template>
    <frame-space>
        <not-found></not-found>
    </frame-space>
</template>

<script>
export default {
    components: {
        NotFound: () => import('@/components/error/NotFound')
    },
};
</script>
