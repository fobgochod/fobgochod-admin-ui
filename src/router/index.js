import Vue from 'vue'
import VueRouter from 'vue-router'
import medicines from '@/router/module/medicine'
import settings from '@/router/module/setting'
import systems from '@/router/module/system'
import menus from '@/router/module/menu'
import attachments from '@/router/module/attachment'
import demos from '@/router/module/demo'
import RoleInterceptor from '@/router/auth/role'

Vue.use(VueRouter)

const baseRoutes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
        meta: {
            title: '登录',
            loginState: false,
            roles: []
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/login/Register.vue'),
        meta: {
            title: '注册',
            loginState: false,
            roles: []
        }
    },
    {
        path: '/register/success',
        name: 'RegisterSuccess',
        component: () => import('@/views/login/RegisterSuccess.vue'),
        meta: {
            title: '注册成功',
            loginState: false,
            roles: []
        }
    },
    {
        path: '/change/password',
        name: 'ChangePassword',
        component: () => import('@/views/login/ChangePassword.vue'),
        meta: {
            title: '修改密码',
            loginState: false,
            roles: []
        }
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
            title: '主页',
            loginState: false,
            roles: []
        }
    },
    {
        path: '/error/401',
        name: 'ServerError',
        component: () => import('@/components/frame/error/Unauthorized.vue'),
        meta: {
            title: '系统错误',
            loginState: false,
            roles: []
        }
    },
    {
        path: '/error/404',
        name: 'NotFound',
        component: () => import('@/components/frame/error/NotFound.vue'),
        meta: {
            title: '页面不存在',
            loginState: false,
            roles: []
        }
    },
    {
        path: '/error/500',
        name: 'ServerError',
        component: () => import('@/components/frame/error/ServerError.vue'),
        meta: {
            title: '系统错误',
            loginState: false,
            roles: []
        }
    },

    ...medicines,
    ...settings,
    ...systems,
    ...menus,
    ...attachments
]

const routes = baseRoutes.concat(demos)

const router = new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_BASE_API,
    routes: routes
})

router.beforeEach(RoleInterceptor)

export default router
