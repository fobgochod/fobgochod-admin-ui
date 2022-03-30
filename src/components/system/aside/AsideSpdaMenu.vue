<template>
    <el-submenu index='1'>
        <template slot='title'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-thumb'></i>
            <span>药品管理</span>
        </template>

        <el-menu-item index='/spda/medicine/me'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-user'></i>
            <span>按时吃药</span>
        </el-menu-item>
        <el-menu-item index='/spda/medicine/record'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-tickets'></i>
            <span>吃药记录</span>
        </el-menu-item>
        <el-menu-item index='/spda/medicine'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-first-aid-kit'></i>
            <span>药品管理</span>
        </el-menu-item>

        <el-menu-item index='/sms/record'>
            <i :style='{ color: aside.aside_icon_color }' class='el-icon-bell'></i>
            <span>提醒记录</span>
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
