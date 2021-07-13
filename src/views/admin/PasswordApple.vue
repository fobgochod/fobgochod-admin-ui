<template>
    <frame-space>
        <el-row>
            <el-col :span="12">
                <password-sub/>
            </el-col>
            <el-col :span="12">
                <encrypt-sub/>
            </el-col>
        </el-row>
    </frame-space>
</template>

<script>
export default {
    components: {
        PasswordSub: () => import('@/views/admin/sub/PasswordSub'),
        EncryptSub: () => import('@/views/admin/sub/EncryptSub')
    }
};
</script>

<style scoped>

</style>
