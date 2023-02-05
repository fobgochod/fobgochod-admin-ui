<template>
    <el-container id='aside'>
        <menu-aside />
        <el-container>
            <el-header :height='head_height' :style='{backgroundColor:head_background_color}'>
                <menu-head />
            </el-header>
            <el-main id='main' :style='`padding:0px; backgroundColor:${main_background_color}`'>
                <el-row>
                    <tabs-bar />
                </el-row>
                <el-card class='card' shadow='hover'>
                    <slot></slot>
                </el-card>
                <bottom-space />
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return {
            head_background_color: this.$cookies.get('setting').head_background_color,
            head_height: this.$cookies.get('setting').head_height + 'px',
            main_background_color: this.$cookies.get('setting').main_background_color
        }
    },
    components: {
        TabsBar: () => import('@/components/tools/TabsBar'),
        MenuAside: () => import('@/components/frame/MenuAside'),
        MenuHead: () => import('@/components/frame/MenuHead'),
        BottomSpace: () => import('@/components/frame/BottomSpace')
    }
}
</script>

<style scoped>
</style>
