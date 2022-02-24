const routes = [
    {
        path: '/m',
        name: 'M',
        component: (resolve) => require(['@/views/spda/M.vue'], resolve),
        meta: {
            title: '我的药',
            loginState: false,
            roles: [],
        },
    },
    {
        path: '/spda/medicine',
        name: 'Medicine',
        component: (resolve) => require(['@/views/spda/Medicine.vue'], resolve),
        meta: {
            title: '按时吃药',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
    {
        path: '/spda/medicine/record',
        name: 'MedicineRecord',
        component: (resolve) => require(['@/views/spda/MedicineRecord.vue'], resolve),
        meta: {
            title: '吃药记录',
            loginState: true,
            roles: ['Admin', 'Owner'],
        },
    },
]

export default routes
