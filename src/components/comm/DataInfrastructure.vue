<template>
    <el-popconfirm title='确定初始化数据吗？' @confirm='initData'>
        <el-button slot='reference' icon='el-icon-s-data' size='small' type='warning' circle plain
                   style='margin-left: 10px;' />
    </el-popconfirm>
</template>

<script>
import {TASKS, TENANTS, USERS} from '@/assets/js/base.data'
import User from '@/api/system/user'
import Tenant from '@/api/system/tenant'
import Task from '@/api/system/task'

export default {
    props: {
        table: {
            type: String
        },
        success: {
            type: Function,
            default: () => {
            }
        }
    },
    methods: {
        initData() {
            if (this.table === 'User') {
                this.initUser()
            } else if (this.table === 'Tenant') {
                this.initTenant()
            } else if (this.table === 'Task') {
                this.initTask()
            }
        },
        async initUser() {
            for (let task of USERS) {
                await User.addData(task)
            }
            this.success()
        },
        async initTenant() {
            for (let task of TENANTS) {
                await Tenant.addData(task)
            }
            this.success()
        },
        async initTask() {
            for (let task of TASKS) {
                await Task.addData(task)
            }
            this.success()
        }
    }
}
</script>
