const routes = [
    {
        path: '/menus/basic',
        name: 'Menu',
        component: (resolve) => require(['@/views/menus/MenuApple.vue'], resolve),
        meta: {
            title: '菜单管理',
            loginState: true,
            roles: ['Admin']
        }
    },
    {
        path: '/menus/setting',
        name: 'MenuRole',
        component: (resolve) => require(['@/views/menus/MenuRoleApple.vue'], resolve),
        meta: {
            title: '角色菜单',
            loginState: true,
            roles: ['Admin']
        }
    }
]

export default routes
