<template>
    <el-submenu index='800'>
        <template slot='title'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-reading'></i>
            <span slot='title'>附件信息</span>
        </template>
        <el-menu-item index='/file/directory/tree'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-folder-opened'></i>
            <span slot='title'>目录树</span>
        </el-menu-item>
        <el-menu-item index='/file/tree'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-files'></i>
            <span slot='title'>文件树</span>
        </el-menu-item>
        <el-menu-item index='/file/image'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-picture-outline'></i>
            <span slot='title'>图片库</span>
        </el-menu-item>
        <el-menu-item index='/file/recycle'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-delete'></i>
            <span slot='title'>回收站</span>
        </el-menu-item>
        <el-menu-item index='/file/directory'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-folder'></i>
            <span slot='title'>目录信息</span>
        </el-menu-item>
        <el-menu-item index='/file/info'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-document'></i>
            <span slot='title'>文件信息</span>
        </el-menu-item>
        <el-menu-item index='/file/image/shrink'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-zoom-in'></i>
            <span slot='title'>缩放信息</span>
        </el-menu-item>
        <el-menu-item index='/file/share'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-share'></i>
            <span slot='title'>分享信息</span>
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
