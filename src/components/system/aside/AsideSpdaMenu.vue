<template>
    <el-submenu index='101'>
        <template slot='title'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-thumb'></i>
            <span>药品管理</span>
        </template>

        <el-menu-item index='/spda/medicine'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-place'></i>
            <span>按时吃药</span>
        </el-menu-item>
        <el-menu-item index='/spda/medicine/record'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-place'></i>
            <span>吃药记录</span>
        </el-menu-item>
    </el-submenu>
</template>

<script>
export default {
    data() {
        return {
            aside: {
                aside_icon_color: this.$cookies.get('setting').aside_icon_color
            }
        }
    }
}
</script>
