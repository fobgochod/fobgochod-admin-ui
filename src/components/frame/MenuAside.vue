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
                 unique-opened
                 class='el-menu-vertical-demo'
                 @select='changeAsideMenu'>

            <el-menu-item index='/home'>
                <i :style='{color: aside.aside_icon_color }' class='el-icon-s-home'></i>
                <span slot='title'>主页</span>
            </el-menu-item>

            <el-submenu v-for='menu in menus' :index='menu.path' :key='menu.id'>
                <template slot='title'>
                    <i :style='{ color: aside.aside_icon_color }' :class='menu.icon'></i>
                    <span>{{ menu.name }}</span>
                </template>

                <el-menu-item v-for='item in menu.children' :index='item.path' :key='item.id'>
                    <i :style='{ color: aside.aside_icon_color }' :class='item.icon'></i>
                    <span>{{ item.name }}</span>
                </el-menu-item>
            </el-submenu>

            <el-menu-item index='/menus/basic' v-if="userId === 'admin'">
                <i :style='{ color: aside.aside_icon_color }' class='el-icon-s-operation'></i>
                <span>生成菜单</span>
            </el-menu-item>
        </el-menu>
    </el-aside>
</template>

<script>
import Pass from '@/plugins/pass.js'
import Profile from '@/api/profile'
import {mapState} from 'vuex'

export default {
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
            },
            menus: []
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
    computed: {
        ...mapState(['userId'])
    },
    methods: {
        changeAsideMenu(index) {
            this.activie_index = index
            if (index !== this.$cookies.get('activie_index')) {
                this.$cookies.set('activie_index', index)
                this.$router.push(this.$cookies.get('activie_index'))
            }
        },
        getMenu() {
            Profile.getMenu().then(res => {
                this.menus = res.data
                sessionStorage.setItem('menus:' + this.userId, JSON.stringify(this.menus))
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
        }
    },
    mounted() {
        if (this.$cookies.get('activie_index') == null) {
            this.$cookies.set('activie_index', 1)
            this.$router.push(this.$cookies.get('activie_index'))
        }
        let menusCache = sessionStorage.getItem('menus:' + this.userId)
        if (menusCache == null) {
            this.getMenu()
        } else {
            this.menus = JSON.parse(menusCache)
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
