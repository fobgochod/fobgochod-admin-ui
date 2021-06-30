<template>
    <el-container id="aside">
        <aside-menu/>
        <el-container>
            <el-header :height="head_height" :style="{backgroundColor:head_background_color}">
                <head-menu/>
            </el-header>
            <el-main id="main" :style="{backgroundColor:main_background_color}">
                <el-card class="card" shadow="hover">
                    <div slot="header">
                        <bread-crumb/>
                    </div>
                    <slot></slot>
                </el-card>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            head_background_color: this.$cookies.get("setting").head_background_color,
            head_height: this.$cookies.get("setting").head_height + "px",
            main_background_color: this.$cookies.get("setting").main_background_color,
        };
    },
    components: {
        BreadCrumb: () => import("@/components/system/BreadCrumb")
    }
};
</script>

<style scoped>
</style>