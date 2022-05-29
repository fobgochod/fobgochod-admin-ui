<template>
    <el-popconfirm title='确定初始化数据吗？' @confirm='initData'>
        <el-button slot='reference' icon='el-icon-s-data' size='small' type='warning' circle plain
                   style='margin-left: 10px;' />
    </el-popconfirm>
</template>

<script>
import {ITEMS, ROLES, TASKS, TENANTS, USERS} from '@/assets/js/base.data'
import MenuData from '@/assets/js/menu'
import User from '@/api/system/user'
import Role from '@/api/system/role'
import Tenant from '@/api/system/tenant'
import Task from '@/api/system/task'
import Menu from '@/api/menu/menu'
import MedicineItem from '@/api/medicine/medicine.item'

export default {
    props: {
        id: {
            type: String
        },
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
            } else if (this.table === 'Role') {
                this.initRole()
            } else if (this.table === 'Tenant') {
                this.initTenant()
            } else if (this.table === 'Task') {
                this.initTask()
            } else if (this.table === 'Menu') {
                this.initMenu()
            } else if (this.table === 'MedicineItem') {
                this.initMedicineItem()
            }
        },
        async initUser() {
            for (let task of USERS) {
                await User.addData(task)
            }
            this.success()
        },
        async initRole() {
            for (let task of ROLES) {
                await Role.addData(task)
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
        },
        async initMenu() {
            for (let menu of MenuData) {
                const res = await Menu.addData(menu)
                for (let subMenu of menu.children) {
                    subMenu.parentId = res.data.id
                    await Menu.addData(subMenu)
                }
            }
            this.success()
        },
        async initMedicineItem() {
            for (let task of ITEMS) {
                task.medicineId = this.id
                await MedicineItem.addData(task)
            }
            this.success()
        }
    }
}
</script>
