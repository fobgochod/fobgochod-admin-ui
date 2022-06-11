<template>
    <div>
        <div style='float:left'>
            <i :class="asideState===true?'el-icon-s-unfold':'el-icon-s-fold'"
               :style="{color:head.head_icon_color,padding:'20px',cursor: 'pointer'}"
               @click='changeAsideState' />
            <span :style='{color:head.head_icon_color}' @click="to('/settings/appearance')">{{ getLogin }}</span>
        </div>

        <el-menu :active-text-color='head.head_active_text_color'
                 :background-color='head.head_background_color'
                 :style="{float:'right'}"
                 :text-color='head.head_text_color'
                 class='el-menu-demo'
                 mode='horizontal'>

            <el-menu-item index='4'>
                <el-link :href='`/medicine/${userCode}`' target='_blank'><i class='el-icon-first-aid-kit' /></el-link>
            </el-menu-item>

            <el-menu-item index='5'>
                <el-link :href='`${baseUri}`' target='_blank'><i class='el-icon-link'></i></el-link>
            </el-menu-item>

            <el-menu-item index='6'>
                <head-color />
            </el-menu-item>

            <el-submenu index='9'>
                <template slot='title'>
                    {{ userName }}
                    <el-avatar :src='user.avatar' :key='user.avatar' shape='square'></el-avatar>
                </template>
                <el-menu-item index='9-1' @click="to('/settings/profile')">
                    <i class='el-icon-user'></i>
                    <span>个人中心</span>
                </el-menu-item>
                <el-menu-item index='9-2' @click="to('/settings/security')">
                    <i class='el-icon-unlock'></i>
                    <span>修改密码</span>
                </el-menu-item>
                <el-menu-item index='9-3' @click='fullScreen'>
                    <template slot='title'>
                        <i :style='{color:head.head_icon_color}' class='el-icon-full-screen' />
                        <span>全屏</span>
                    </template>
                </el-menu-item>
                <el-menu-item index='9-4' @click="to('/')">
                    <i class='el-icon-switch-button'></i>
                    <span>退出</span>
                </el-menu-item>
                <el-menu-item index='9-5'>
                    <head-about />
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import Pass from '@/plugins/pass.js'
import {mapGetters, mapMutations, mapState} from 'vuex'

export default {
    components: {
        HeadAbout: () => import('@/components/frame/head/HeadAbout'),
        HeadColor: () => import('@/components/frame/head/HeadColor')
    },
    data() {
        return {
            head: {
                head_icon_color: this.$cookies.get('setting').head_icon_color,
                head_background_color: this.$cookies.get('setting').head_background_color,
                head_text_color: this.$cookies.get('setting').head_text_color,
                head_active_text_color: this.$cookies.get('setting').head_active_text_color
            },
            user: {
                avatar: '/avatar.png'
            },
            asideState: false,
            fullscreen: false,
            database: ''
        }
    },
    computed: {
        ...mapState(['baseUri', 'tenantCode', 'userCode', 'userName']),
        ...mapGetters(['getLogin'])
    },
    methods: {
        ...mapMutations(['setUserName']),
        changeAsideState() {
            this.asideState = !this.asideState
            Pass.$emit('aside_state', this.asideState)
        },
        fullScreen() {
            //全屏切换函数
            let element = document.documentElement
            if (this.fullscreen) {
                if (document.exitFullscreen) {
                    document.exitFullscreen()
                } else if (document.webkitCancelFullScreen) {
                    document.webkitCancelFullScreen()
                } else if (document.mozCancelFullScreen) {
                    document.mozCancelFullScreen()
                } else if (document.msExitFullscreen) {
                    document.msExitFullscreen()
                }
            } else {
                if (element.requestFullscreen) {
                    element.requestFullscreen()
                } else if (element.webkitRequestFullScreen) {
                    element.webkitRequestFullScreen()
                } else if (element.mozRequestFullScreen) {
                    element.mozRequestFullScreen()
                } else if (element.msRequestFullscreen) {
                    // IE11
                    element.msRequestFullscreen()
                }
            }
            this.fullscreen = !this.fullscreen //判断全屏状态
        },
        to(link) {
            this.$router.push(link)
        }
    },
    mounted() {
        if (!this.userName) {
            this.setUserName('游客')
        }
    }
}
</script>

<style scoped>
.el-menu {
    /* 去除右侧边框线 */
    border-bottom: 0 !important;
}
</style>
