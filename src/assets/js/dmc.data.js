export const COLOR = {
    aside_icon_color: '#000000',
    aside_text_color: '#000000',
    aside_background_color: '#E6E6E6',
    aside_active_text_color: '#409EFF',
    aside_title: 'DMC Admin',
    aside_small_title: 'DMC',
    aside_width: 200,
    aside_small_width: 60,
    head_icon_color: '#000000',
    head_text_color: '#000000',
    head_background_color: '#BED7EA',
    head_active_text_color: '#FFFFFF',
    head_height: 60,
    main_background_color: '#F2F2F2',
}

export const COLOR_1 = {
    aside_icon_color: '#000000',
    aside_text_color: '#000000',
    aside_background_color: '#f2f6fc',
    aside_active_text_color: '#67C23A',
    aside_title: 'DMC Admin',
    aside_small_title: 'DMC',
    aside_width: 200,
    aside_small_width: 60,
    head_icon_color: '#000000',
    head_text_color: '#000000',
    head_background_color: '#f2f6fc',
    head_active_text_color: '#67C23A',
    head_height: 60,
    main_background_color: '#f2f6fc',
}

export const TASKS = [
    {
        code: 'TS001',
        name: '测试Cron表达式',
        type: '测试',
        cron: '0 0/1 * * * ?',
        className: 'testTask',
        disable: true,
        remark: 'Cron测试',
    },
    {
        code: 'ST001',
        name: '系统使用状况统计',
        type: '统计',
        cron: '0 0 1 1/1 * ?',
        className: 'statsTask',
        disable: false,
        remark: '系统统计',
    },
    {
        code: 'FD001',
        name: '过期文件移动到回收站',
        type: '文件',
        cron: '0 0 1 1/1 * ?',
        className: 'fileExpiredToRecycleBinTask',
        disable: false,
        remark: '进回收站',
    },
    {
        code: 'FD002',
        name: '长期未使用文件移进回收站',
        type: '文件',
        cron: '0 0 1 1/1 * ?',
        className: 'fileUnusedToRecycleBinTask',
        disable: false,
        remark: '进回收站',
    },
    {
        code: 'FD003',
        name: '长期未使用文件直接删除',
        type: '文件',
        cron: '0 0 1 1/1 * ?',
        className: 'fileUnusedToDeleteTask',
        disable: false,
        remark: '永久删除',
    },
    {
        code: 'FD004',
        name: '回收站文件删除',
        type: '文件',
        cron: '0 0 1 1/1 * ?',
        className: 'fileRecycleBinToDeleteTask',
        disable: false,
        remark: '永久删除',
    },
]
