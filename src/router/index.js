import Vue from 'vue'
import VueRouter from 'vue-router'
import demoRoutes from '@/router/demo.router'
import dmcRoutes from '@/router/dmc.router'
import RoleInterceptor from '@/router/auth/role'

Vue.use(VueRouter)

const baseRoutes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/views/login/Login.vue'),
        meta: {
            title: '登录',
            roles: [],
        },
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('@/views/login/Register.vue'),
        meta: {
            title: '注册',
            roles: [],
        },
    },
    {
        path: '/register/success',
        name: 'RegisterSuccess',
        component: () => import('@/views/login/RegisterSuccess.vue'),
        meta: {
            title: '注册成功',
            roles: [],
        },
    },
    {
        path: '/change/password',
        name: 'ChangePassword',
        component: () => import('@/views/login/ChangePassword.vue'),
        meta: {
            title: '修改密码',
            roles: [],
        },
    },
    {
        path: '/error/401',
        name: 'ServerError',
        component: () => import('@/views/error/401.vue'),
        meta: {
            title: '系统错误',
            loginState: false,
            roles: [],
        },
    },
    {
        path: '/error/404',
        name: 'NotFound',
        component: () => import('@/views/error/404.vue'),
        meta: {
            title: '页面不存在',
            loginState: false,
            roles: [],
        },
    },
    {
        path: '/error/500',
        name: 'ServerError',
        component: () => import('@/views/error/500.vue'),
        meta: {
            title: '系统错误',
            loginState: false,
            roles: [],
        },
    },
    {
        path: '/home',
        name: 'Home',
        component: () => import('@/views/home/Home.vue'),
        meta: {
            title: '主页',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
    ...dmcRoutes,
]

const routes = baseRoutes.concat(demoRoutes)

const router = new VueRouter({
    mode: 'history',
    base: process.env.VUE_APP_BASE_API,
    routes: routes,
})

router.beforeEach(RoleInterceptor)

export default router
