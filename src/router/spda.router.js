const routes = [
    {
        path: '/medicine/:userId',
        name: 'MyMedicine',
        component: (resolve) => require(['@/views/spda/MyMedicineSub.vue'], resolve),
        meta: {
            title: '我的药',
            loginState: false,
            roles: []
        }
    },
    {
        path: '/spda/medicine/me',
        name: 'Medicine',
        component: (resolve) => require(['@/views/spda/MyMedicine.vue'], resolve),
        meta: {
            title: '按时吃药',
            loginState: true,
            roles: ['Admin', 'Owner']
        }
    },
    {
        path: '/spda/medicine/record',
        name: 'MedicineRecord',
        component: (resolve) => require(['@/views/spda/MedicineRecord.vue'], resolve),
        meta: {
            title: '吃药记录',
            loginState: true,
            roles: ['Admin', 'Owner']
        }
    },
    {
        path: '/spda/medicine',
        name: 'Medicine',
        component: (resolve) => require(['@/views/spda/Medicine.vue'], resolve),
        meta: {
            title: '药品管理',
            loginState: true,
            roles: ['Admin', 'Owner']
        }
    },
    {
        path: '/sms/record',
        name: 'MedicineRecord',
        component: (resolve) => require(['@/views/spda/SmsRecord.vue'], resolve),
        meta: {
            title: '提醒记录',
            loginState: true,
            roles: ['Admin', 'Owner']
        }
    }
]

export default routes
