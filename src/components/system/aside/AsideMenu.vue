<template>
    <el-aside id='aside' :style='{ backgroundColor: aside.aside_background_color }' :width='aside.aside_width'>
        <div style='height: 60px; color: #fff'>
            <p :style='`padding-top: 10%; padding-left: 30%; color: ${aside.aside_icon_color}`'>
                {{ aside.aside_title }}
            </p>
        </div>
        <el-menu :active-text-color='aside.aside_active_text_color'
                 :background-color='aside.aside_background_color'
                 :collapse='aside.aside_state'
                 :default-active='activie_index'
                 :text-color='aside.aside_icon_color'
                 :unique-opened='true'
                 class='el-menu-vertical-demo'
                 @select='changeAsideMenu'>

            <el-menu-item index='/home'>
                <i :style='{color: aside.aside_icon_color }' class='el-icon-s-home'></i>
                <span slot='title'>主页</span>
            </el-menu-item>

            <aside-spda-menu />

            <el-submenu index='9'>
                <template slot='title'>
                    <i :style='{ color: aside.aside_icon_color }' class='el-icon-user'></i>
                    <span>我的账号</span>
                </template>
                <el-menu-item index='/admin/env'>
                    <i :style='{ color: aside.aside_icon_color }' class='el-icon-set-up'></i>
                    <span>参数设定</span>
                </el-menu-item>
                <el-menu-item index='/admin/user'>
                    <i :style='{ color: aside.aside_icon_color }' class='el-icon-thumb'></i>
                    <span>个人设置</span>
                </el-menu-item>
            </el-submenu>

            <el-submenu index='10'>
                <template slot='title'>
                    <i :style='{ color: aside.aside_icon_color }' class='el-icon-setting'></i>
                    <span>系统管理</span>
                </template>
                <el-menu-item index='/system/user'>
                    <i :style='{ color: aside.aside_icon_color }' class='el-icon-user'></i>
                    <span>用户管理</span>
                </el-menu-item>
                <el-menu-item index='/system/tenant'>
                    <i :style='{ color: aside.aside_icon_color }' class='el-icon-pear'></i>
                    <span>租户管理</span>
                </el-menu-item>
                <el-menu-item index='/system/task'>
                    <i :style='{ color: aside.aside_icon_color }' class='el-icon-place'></i>
                    <span>任务计划</span>
                </el-menu-item>
                <el-menu-item index='/system/stats'>
                    <i :style='{ color: aside.aside_icon_color }' class='el-icon-data-analysis'></i>
                    <span>系统统计</span>
                </el-menu-item>
            </el-submenu>
            <aside-file-menu />
            <aside-demo-menu />
        </el-menu>
    </el-aside>
</template>

<script>
import Pass from '@/plugins/pass.js'

export default {
    components: {
        AsideDemoMenu: () => import('@/components/system/aside/AsideDemoMenu'),
        AsideFileMenu: () => import('@/components/system/aside/AsideFileMenu'),
        AsideSpdaMenu: () => import('@/components/system/aside/AsideSpdaMenu')
    },
    data() {
        return {
            activie_index: this.$cookies.get('activie_index'),
            aside: {
                aside_background_color: this.$cookies.get('setting').aside_background_color,
                aside_text_color: this.$cookies.get('setting').aside_text_color,
                aside_icon_color: this.$cookies.get('setting').aside_icon_color,
                aside_active_text_color: this.$cookies.get('setting').aside_active_text_color,
                aside_state: false,
                aside_title: this.$cookies.get('setting').aside_title,
                aside_small_title: this.$cookies.get('setting').aside_small_title,
                aside_width: this.$cookies.get('setting').aside_width + 'px'
            }
        }
    },
    created() {
        Pass.$on('aside_state', (val) => {
            this.aside.aside_state = val
            if (this.aside.aside_state) {
                this.aside.aside_width = this.$cookies.get('setting').aside_small_width + 'px'
                this.aside.aside_title = this.$cookies.get('setting').aside_small_title
            } else {
                this.aside.aside_width = this.$cookies.get('setting').aside_width + 'px'
                this.aside.aside_title = this.$cookies.get('setting').aside_title
            }
        })
    },
    methods: {
        changeAsideMenu(index) {
            this.activie_index = index
            if (index !== this.$cookies.get('activie_index')) {
                this.$cookies.set('activie_index', index)
                this.$router.push(this.$cookies.get('activie_index'))
            }
        }
    },
    mounted() {
        if (this.$cookies.get('activie_index') == null) {
            this.$cookies.set('activie_index', 1)
            this.$router.push(this.$cookies.get('activie_index'))
        }
    }
}
</script>

<style scoped>
.el-menu {
    /* 去除右侧边框线 */
    border-right: 0 !important;
}

#aside::-webkit-scrollbar {
    display: none;
}

#aside {
    height: 100vh;
    overflow-x: hidden;
    overflow-y: scroll;
}

a {
    color: black;
    text-decoration: none;
}
</style>
