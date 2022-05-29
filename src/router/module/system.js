const routes = [
    {
        path: '/systems/user',
        name: 'User',
        component: (resolve) => require(['@/views/systems/UserApple.vue'], resolve),
        meta: {
            title: '用户管理',
            loginState: true,
            roles: ['Admin']
        }
    },
    {
        path: '/systems/role',
        name: 'Role',
        component: (resolve) => require(['@/views/systems/RoleApple.vue'], resolve),
        meta: {
            title: '角色管理',
            loginState: true,
            roles: ['Admin']
        }
    },
    {
        path: '/systems/tenant',
        name: 'Tenant',
        component: (resolve) => require(['@/views/systems/TenantApple.vue'], resolve),
        meta: {
            title: '租户管理',
            loginState: true,
            roles: ['Admin']
        }
    },
    {
        path: '/systems/task',
        name: 'Task',
        component: (resolve) => require(['@/views/systems/TaskApple.vue'], resolve),
        meta: {
            title: '任务计划',
            loginState: true,
            roles: ['Admin']
        }
    },
    {
        path: '/systems/stats',
        name: 'BucketStatsTotal',
        component: (resolve) => require(['@/views/systems/StatsApple.vue'], resolve),
        meta: {
            title: '系统统计',
            loginState: true,
            roles: ['Admin']
        }
    },
    {
        path: '/systems/journal',
        name: 'journal',
        component: (resolve) => require(['@/views/systems/SmsRecord.vue'], resolve),
        meta: {
            title: '系统日志',
            loginState: true,
            roles: ['Admin']
        }
    }
]

export default routes
