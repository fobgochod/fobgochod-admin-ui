export default [
    {
        name: '药品管理',
        icon: 'el-icon-thumb',
        path: '/medicines',
        parentId: '0',
        level: 1,
        order: 1,
        children: [
            {
                name: '药品管理',
                icon: 'el-icon-first-aid-kit',
                path: '/medicines/info',
                parentId: null,
                level: 2,
                order: 1
            },
            {
                name: '今日吃药',
                icon: 'el-icon-user',
                path: '/medicines/today',
                parentId: null,
                level: 2,
                order: 2
            },
            {
                name: '吃药记录',
                icon: 'el-icon-tickets',
                path: '/medicines/record',
                parentId: null,
                level: 2,
                order: 3
            }
        ]
    },
    {
        name: '附件管理',
        icon: 'el-icon-reading',
        path: '/attachments',
        parentId: '0',
        level: 1,
        order: 2,
        children: [
            {
                name: '文件信息',
                icon: 'el-icon-document',
                path: '/attachments/info',
                parentId: null,
                level: 2,
                order: 1
            },
            {
                name: '目录信息',
                icon: 'el-icon-folder',
                path: '/attachments/directory',
                parentId: null,
                level: 2,
                order: 2
            },
            {
                name: '缩放信息',
                icon: 'el-icon-zoom-in',
                path: '/attachments/image/shrink',
                parentId: null,
                level: 2,
                order: 3
            },
            {
                name: '图片库',
                icon: 'el-icon-picture-outline',
                path: '/attachments/image',
                parentId: null,
                level: 2,
                order: 4
            },
            {
                name: '文件树',
                icon: 'el-icon-files',
                path: '/attachments/tree',
                parentId: null,
                level: 2,
                order: 5
            },
            {
                name: '目录树',
                icon: 'el-icon-folder-opened',
                path: '/attachments/directory/tree',
                parentId: null,
                level: 2,
                order: 6
            },
            {
                name: '回收站',
                icon: 'el-icon-takeaway-box',
                path: '/attachments/recycle',
                parentId: null,
                level: 2,
                order: 7
            }
        ]
    },
    {
        name: '个人设置',
        icon: 'el-icon-user',
        path: '/settings',
        parentId: '0',
        level: 1,
        order: 3,
        children: [
            {
                name: '个人资料',
                icon: 'el-icon-thumb',
                path: '/settings/profile',
                parentId: null,
                level: 2,
                order: 1
            },
            {
                name: '密码修改',
                icon: 'el-icon-view',
                path: '/settings/security',
                parentId: null,
                level: 2,
                order: 2
            },
            {
                name: '参数设定',
                icon: 'el-icon-set-up',
                path: '/settings/appearance',
                parentId: null,
                level: 2,
                order: 3
            }
        ]
    },
    {
        name: '菜单管理',
        icon: 'el-icon-s-grid',
        path: '/menus',
        parentId: '0',
        level: 1,
        order: 4,
        children: [
            {
                name: '菜单管理',
                icon: 'el-icon-menu',
                path: '/menus/basic',
                parentId: null,
                level: 2,
                order: 1
            },
            {
                name: '角色菜单',
                icon: 'el-icon-s-tools',
                path: '/menus/setting',
                parentId: null,
                level: 2,
                order: 2
            }
        ]
    },
    {
        name: '系统管理',
        icon: 'el-icon-setting',
        path: '/systems',
        parentId: '0',
        level: 1,
        order: 5,
        children: [
            {
                name: '用户管理',
                icon: 'el-icon-user',
                path: '/systems/user',
                parentId: null,
                level: 2,
                order: 1
            },
            {
                name: '角色管理',
                icon: 'el-icon-apple',
                path: '/systems/role',
                parentId: null,
                level: 2,
                order: 2
            },
            {
                name: '租户管理',
                icon: 'el-icon-pear',
                path: '/systems/tenant',
                parentId: null,
                level: 2,
                order: 3
            },
            {
                name: '任务计划',
                icon: 'el-icon-place',
                path: '/systems/task',
                parentId: null,
                level: 2,
                order: 4
            },
            {
                name: '系统统计',
                icon: 'el-icon-data-analysis',
                path: '/systems/stats',
                parentId: null,
                level: 2,
                order: 5
            },
            {
                name: '系统日志',
                icon: 'el-icon-bell',
                path: '/systems/journal',
                parentId: null,
                level: 2,
                order: 6
            }
        ]
    },
    {
        name: '使用范例',
        icon: 'el-icon-thumb',
        path: '/demos',
        parentId: '0',
        level: 1,
        order: 6,
        children: [
            {
                name: '参数传输',
                icon: 'el-icon-position',
                path: '/demos/transfer',
                parentId: null,
                level: 2,
                order: 1
            },
            {
                name: '富文本',
                icon: 'el-icon-tickets',
                path: '/demos/editor',
                parentId: null,
                level: 2,
                order: 2
            },
            {
                name: '日历',
                icon: 'el-icon-date',
                path: '/demos/calendar',
                parentId: null,
                level: 2,
                order: 3
            }
        ]
    }
]
