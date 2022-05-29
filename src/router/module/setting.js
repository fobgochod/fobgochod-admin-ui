const routes = [
    {
        path: '/settings/profile',
        name: 'setting_user',
        component: (resolve) => require(['@/views/settings/Profile.vue'], resolve),
        meta: {
            title: '个人设置',
            loginState: true,
            roles: ['Admin', 'User']
        }
    },
    {
        path: '/settings/security',
        name: 'setting_user',
        component: (resolve) => require(['@/views/settings/Security.vue'], resolve),
        meta: {
            title: '密码修改',
            loginState: true,
            roles: ['Admin', 'User']
        }
    },
    {
        path: '/settings/appearance',
        name: 'Env',
        component: (resolve) => require(['@/views/settings/Appearance.vue'], resolve),
        meta: {
            title: '参数设定',
            loginState: true,
            roles: ['Admin', 'User']
        }
    }
]

export default routes
