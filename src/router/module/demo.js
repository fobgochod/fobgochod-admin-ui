const routes = [
    {
        path: '/demos/editor',
        name: 'editor',
        component: (resolve) => require(['@/views/demos/Editor.vue'], resolve),
        meta: {
            title: '富文本编辑器',
            loginState: true,
            roles: ['Admin', 'Owner']
        }
    },
    {
        path: '/demos/transfer',
        name: 'BrotherTransferDemo',
        component: (resolve) => require(['@/views/demos/BrotherTransferDemo.vue'], resolve),
        meta: {
            title: '参数传输',
            loginState: true,
            roles: ['Admin', 'Owner']
        }
    },
    {
        path: '/demos/calendar',
        name: 'CalendarDemo',
        component: (resolve) => require(['@/views/demos/CalendarDemo.vue'], resolve),
        meta: {
            title: '日历',
            loginState: true,
            roles: ['Admin', 'Owner']
        }
    }
]

export default routes
