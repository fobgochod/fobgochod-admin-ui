const routes = [
    {
        path: '/demo/editor',
        name: 'editor',
        component: (resolve) => require(['@/views/demo/Editor.vue'], resolve),
        meta: {
            title: '富文本编辑器',
            loginState: true,
            roles: ['Admin', 'Owner']
        }
    },
    // ************************************测试页面************************************
    {
        path: '/demo/transfer',
        name: 'BrotherTransferDemo',
        component: (resolve) => require(['@/views/demo/BrotherTransferDemo.vue'], resolve),
        meta: {
            title: '参数传输',
            loginState: true,
            roles: ['Admin', 'Owner']
        }
    },
    {
        path: '/demo/calendar',
        name: 'CalendarDemo',
        component: (resolve) => require(['@/views/demo/CalendarDemo.vue'], resolve),
        meta: {
            title: '日历',
            loginState: true,
            roles: ['Admin', 'Owner']
        }
    }
]

export default routes
