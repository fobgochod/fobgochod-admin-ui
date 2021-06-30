<template>
    <frame-space>
        <server-error></server-error>
    </frame-space>
</template>

<script>
export default {
    components: {
        ServerError: () => import('@/components/error/ServerError')
    },
};
</script>
