const routes = [
    {
        path: '/medicine/:userId',
        name: 'MyMedicine',
        component: (resolve) => require(['@/views/medicines/sub/MyMedicine.vue'], resolve),
        meta: {
            title: '我的药',
            loginState: false,
            roles: []
        }
    },
    {
        path: '/medicines/info',
        name: 'MedicineInfo',
        component: (resolve) => require(['@/views/medicines/MedicineInfo.vue'], resolve),
        meta: {
            title: '药品管理',
            loginState: true,
            roles: ['Admin', 'User']
        }
    },
    {
        path: '/medicines/today',
        name: 'Medicine',
        component: (resolve) => require(['@/views/medicines/MedicineToday.vue'], resolve),
        meta: {
            title: '今日吃药',
            loginState: true,
            roles: ['Admin', 'User']
        }
    },
    {
        path: '/medicines/record',
        name: 'MedicineRecord',
        component: (resolve) => require(['@/views/medicines/MedicineRecord.vue'], resolve),
        meta: {
            title: '吃药记录',
            loginState: true,
            roles: ['Admin', 'User']
        }
    }
]

export default routes
