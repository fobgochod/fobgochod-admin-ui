<template>
    <frame-space>
        <el-row>
            <top-space/>
        </el-row>
        <el-row>
            <main-space/>
        </el-row>
    </frame-space>
</template>

<script>
export default {
    components: {
        TopSpace: () => import("@/views/dmc/home/sub/TopSub"),
        MainSpace: () => import("@/views/dmc/home/sub/MainSub")
    }
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}
</style>