const routes = [
    // ************************************文件信息************************************
    {
        path: '/file/directory',
        name: 'Directory',
        component: (resolve) => require(['@/views/file/directory/DirectoryApple.vue'], resolve),
        meta: {
            title: '目录信息',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
    {
        path: '/file/info',
        name: 'FileInfo',
        component: (resolve) => require(['@/views/file/FileInfoApple.vue'], resolve),
        meta: {
            title: '文件信息',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
    {
        path: '/file/share',
        name: 'FileShare',
        component: (resolve) => require(['@/views/file/FileShareApple.vue'], resolve),
        meta: {
            title: '分享信息',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
    {
        path: '/file/image/shrink',
        name: 'ImageShrink',
        component: (resolve) => require(['@/views/file/image/ImageShrinkApple.vue'], resolve),
        meta: {
            title: '缩放信息',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
    {
        path: '/file/recycle',
        name: 'RecycleBin',
        component: (resolve) => require(['@/views/file/RecycleBinApple.vue'], resolve),
        meta: {
            title: '回收站',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
    // ************************************文件管理************************************
    {
        path: '/file/tree',
        name: 'FileTree',
        component: (resolve) => require(['@/views/file/FileTreeApple.vue'], resolve),
        meta: {
            title: '文件树',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
    {
        path: '/file/directory/tree',
        name: 'DirectoryTree',
        component: (resolve) => require(['@/views/file/directory/DirectoryTreeApple.vue'], resolve),
        meta: {
            title: '目录树',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
    {
        path: '/file/image',
        name: 'Image',
        component: (resolve) => require(['@/views/file/image/ImageApple.vue'], resolve),
        meta: {
            title: '图片库',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
    // ************************************我的账号************************************
    {
        path: '/admin/env',
        name: 'Env',
        component: (resolve) => require(['@/views/admin/EnvApple.vue'], resolve),
        meta: {
            title: '参数设定',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
    {
        path: '/admin/user',
        name: 'setting_user',
        component: (resolve) => require(['@/views/admin/UserApple.vue'], resolve),
        meta: {
            title: '个人设置',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
    {
        path: '/admin/password',
        name: 'setting_password',
        component: (resolve) => require(['@/views/admin/PasswordApple.vue'], resolve),
        meta: {
            title: '密码修改',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
    // ************************************系统管理************************************
    {
        path: '/system/user',
        name: 'User',
        component: (resolve) => require(['@/views/system/UserApple.vue'], resolve),
        meta: {
            title: '用户管理',
            loginState: true,
            roles: ['Admin'],
        },
    },
    {
        path: '/system/tenant',
        name: 'Tenant',
        component: (resolve) => require(['@/views/system/TenantApple.vue'], resolve),
        meta: {
            title: '租户管理',
            loginState: true,
            roles: ['Admin'],
        },
    },
    {
        path: '/system/bucket',
        name: 'Bucket',
        component: (resolve) => require(['@/views/system/BucketApple.vue'], resolve),
        meta: {
            title: 'Bucket',
            loginState: true,
            roles: ['Admin'],
        },
    },
    {
        path: '/system/task',
        name: 'Task',
        component: (resolve) => require(['@/views/system/TaskApple.vue'], resolve),
        meta: {
            title: '任务计划',
            loginState: true,
            roles: ['Admin'],
        },
    },
    {
        path: '/system/stats',
        name: 'BucketStatsTotal',
        component: (resolve) => require(['@/views/system/StatsApple.vue'], resolve),
        meta: {
            title: '系统统计',
            loginState: true,
            roles: ['Admin'],
        },
    },
]

export default routes
