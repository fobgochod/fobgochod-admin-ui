<template>
    <el-submenu index='102'>
        <template slot='title'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-thumb'></i>
            <span>Demo</span>
        </template>

        <el-menu-item index='/demo/transfer'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-position'></i>
            <span>参数传输</span>
        </el-menu-item>

        <el-menu-item index='/demo/editor'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-tickets'></i>
            <span>富文本</span>
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