export const COLOR = {
    aside_icon_color: '#000000',
    aside_text_color: '#000000',
    aside_background_color: '#E6E6E6',
    aside_active_text_color: '#409EFF',
    aside_title: 'Admin',
    aside_small_title: 'Admin',
    aside_width: 200,
    aside_small_width: 60,
    head_icon_color: '#000000',
    head_text_color: '#000000',
    head_background_color: '#BED7EA',
    head_active_text_color: '#FFFFFF',
    head_height: 60,
    main_background_color: '#F2F2F2'
}

export const COLOR_1 = {
    aside_icon_color: '#000000',
    aside_text_color: '#000000',
    aside_background_color: '#f2f6fc',
    aside_active_text_color: '#67C23A',
    aside_title: 'Admin',
    aside_small_title: 'Admin',
    aside_width: 200,
    aside_small_width: 60,
    head_icon_color: '#000000',
    head_text_color: '#000000',
    head_background_color: '#f2f6fc',
    head_active_text_color: '#67C23A',
    head_height: 60,
    main_background_color: '#f2f6fc'
}

export const USERS = [
    {
        code: 'admin',
        name: '管理员',
        lunar: false,
        birth: '1991-01-01',
        telephone: '18110308184',
        wechat: 'cookies',
        qq: '2041613',
        email: 'admin@nobody.com',
        contacts: [18110308184],
        password: 'QtspoWLqGqxDJJxmYTn4zNXrdKCkydPNhbvHSOlNmeA=',
        role: 'Admin',
        order: 1,
        tenantCode: 'fobgochod'
    },
    {
        code: 'zhouxiao',
        name: '周萧',
        lunar: true,
        birth: '1991-03-02',
        telephone: '18255396069',
        wechat: 'fobgochod',
        qq: '',
        email: 'zhouxiao@nobody.com',
        contacts: [15371028040],
        password: 'lU1aSf1w2bi82zXSUiZ4KZV/fvf6bHT4hBm9xegiCfQ=',
        role: 'User',
        order: 2,
        tenantCode: 'fobgochod'
    },
    {
        code: 'chentt',
        name: '陈甜甜',
        lunar: false,
        birth: '1990-01-27',
        telephone: '15371028040',
        wechat: 'cherry_sweet0127',
        qq: '',
        email: 'chentt@nobody.com',
        contacts: [18255396069],
        password: 'lU1aSf1w2bi82zXSUiZ4KZV/fvf6bHT4hBm9xegiCfQ=',
        role: 'User',
        order: 3,
        tenantCode: 'fobgochod'
    }
]

export const ROLES = [
    {
        code: 'Admin',
        name: '管理员',
        order: 1
    },
    {
        code: 'Owner',
        name: '所有者',
        order: 2
    },
    {
        code: 'User',
        name: '一般用户',
        order: 3
    }
]

export const TENANTS = [
    {
        code: 'fobgochod',
        name: '山有扶苏',
        telephone: '16800000001',
        email: 'fobgochod@nobody.com',
        owner: 'admin'
    },
    {
        code: 'seven',
        name: '隰有荷华',
        telephone: '16800000002',
        email: 'seven@nobody.com',
        owner: 'zhouxiao'
    }
]

export const TASKS = [
    {
        code: 'TS001',
        name: '测试Cron表达式',
        type: '测试',
        cron: '0/10 * * * * ?',
        className: 'testTask',
        disable: true,
        remark: 'Cron测试'
    },
    {
        code: 'TS002',
        name: '系统使用状况统计',
        type: '统计',
        cron: '0 0 1 1/1 * ?',
        className: 'statsTask',
        disable: false,
        remark: '系统统计'
    },
    {
        code: 'TS003',
        name: '回收站文件',
        type: '文件',
        cron: '0 0 1 1/1 * ?',
        className: 'statsTask',
        disable: false,
        remark: '文件删除'
    },
    {
        code: 'TS004',
        name: '吃药提醒',
        type: '生活',
        cron: '0 0 8-22/1 * * ?',
        className: 'medicineTask',
        disable: false,
        remark: '吃药提醒'
    },
    {
        code: 'TS005',
        name: '生日提醒',
        type: '生活',
        cron: '0 0 9 1/1 * ?',
        className: 'birthdayTask',
        disable: false,
        remark: '生日提醒'
    }
]

export const ITEMS = [
    {
        medicineId: '',
        type: '早晨',
        start: '09:00:00',
        end: '13:00:00',
        slice: 0
    },
    {
        medicineId: '',
        type: '中午',
        start: '13:00:00',
        end: '18:00:00',
        slice: 0
    },
    {
        medicineId: '',
        type: '晚上',
        start: '18:00:00',
        end: '22:00:00',
        slice: 0
    }
]
