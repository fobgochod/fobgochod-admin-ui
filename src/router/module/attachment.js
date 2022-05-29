const routes = [
    {
        path: '/attachments/directory',
        name: 'Directory',
        component: (resolve) => require(['@/views/attachments/directory/DirectoryApple.vue'], resolve),
        meta: {
            title: '目录信息',
            loginState: true,
            roles: ['Admin', 'User']
        }
    },
    {
        path: '/attachments/directory/tree',
        name: 'DirectoryTree',
        component: (resolve) => require(['@/views/attachments/directory/DirectoryTreeApple.vue'], resolve),
        meta: {
            title: '目录树',
            loginState: true,
            roles: ['Admin', 'User']
        }
    },
    {
        path: '/attachments/info',
        name: 'FileInfo',
        component: (resolve) => require(['@/views/attachments/FileInfoApple.vue'], resolve),
        meta: {
            title: '文件信息',
            loginState: true,
            roles: ['Admin', 'User']
        }
    },
    {
        path: '/attachments/tree',
        name: 'FileTree',
        component: (resolve) => require(['@/views/attachments/FileTreeApple.vue'], resolve),
        meta: {
            title: '文件树',
            loginState: true,
            roles: ['Admin', 'User']
        }
    },
    {
        path: '/attachments/image',
        name: 'Image',
        component: (resolve) => require(['@/views/attachments/image/ImageApple.vue'], resolve),
        meta: {
            title: '图片库',
            loginState: true,
            roles: ['Admin', 'User']
        }
    },
    {
        path: '/attachments/image/shrink',
        name: 'ImageShrink',
        component: (resolve) => require(['@/views/attachments/image/ImageShrinkApple.vue'], resolve),
        meta: {
            title: '缩放信息',
            loginState: true,
            roles: ['Admin', 'User']
        }
    },
    {
        path: '/attachments/recycle',
        name: 'RecycleBin',
        component: (resolve) => require(['@/views/attachments/RecycleBinApple.vue'], resolve),
        meta: {
            title: '回收站',
            loginState: true,
            roles: ['Admin', 'User']
        }
    }
]

export default routes
