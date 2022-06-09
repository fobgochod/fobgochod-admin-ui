<template>
    <el-popconfirm title='确定删除集合吗？' @confirm='dropData'>
        <el-button slot='reference' icon='el-icon-lock' size='small' type='danger' circle plain
                   style='margin-left: 10px;' />
    </el-popconfirm>
</template>

<script>
import User from '@/api/system/user'
import Role from '@/api/system/role'
import Tenant from '@/api/system/tenant'
import Task from '@/api/system/task'
import Menu from '@/api/menu/menu'
import FileInfo from '@/api/file/file.info'
import Medicine from '@/api/medicine/medicine'
import MedicineRecord from '@/api/medicine/medicine.record'
import SmsRecord from '@/api/system/sms.record'

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
        dropData() {
            if (this.table === 'User') {
                this.dropUser()
            } else if (this.table === 'Role') {
                this.dropRole()
            } else if (this.table === 'Tenant') {
                this.dropTenant()
            } else if (this.table === 'Medicine') {
                this.dropMedicine()
            } else if (this.table === 'MedicineRecord') {
                this.dropMedicineRecord()
            } else if (this.table === 'SmsRecord') {
                this.dropSmsRecord()
            } else if (this.table === 'Task') {
                this.dropTask()
            } else if (this.table === 'Menu') {
                this.dropMenu()
            } else if (this.table === 'FileInfo') {
                this.dropFileInfo()
            }
        },
        dropUser() {
            User.dropData().then(() => {
                this.success()
                this.$message.success('清空成功')
            }).catch(() => {
                this.$message.error('清空失败')
            })
        },
        dropRole() {
            Role.dropData().then(() => {
                this.success()
                this.$message.success('清空成功')
            }).catch(() => {
                this.$message.error('清空失败')
            })
        },
        dropTenant() {
            Tenant.dropData().then(() => {
                this.success()
                this.$message.success('清空成功')
            }).catch(() => {
                this.$message.error('清空失败')
            })
        },
        dropMedicine() {
            Medicine.dropData().then(() => {
                this.success()
                this.$message.success('清空成功')
            }).catch(() => {
                this.$message.error('清空失败')
            })
        },
        dropMedicineRecord() {
            MedicineRecord.dropData().then(() => {
                this.success()
                this.$message.success('清空成功')
            }).catch(() => {
                this.$message.error('清空失败')
            })
        },
        dropSmsRecord() {
            SmsRecord.dropData().then(() => {
                this.success()
                this.$message.success('清空成功')
            }).catch(() => {
                this.$message.error('清空失败')
            })
        },
        dropTask() {
            Task.dropData().then(() => {
                this.success()
                this.$message.success('清空成功')
            }).catch(() => {
                this.$message.error('清空失败')
            })
        },
        dropMenu() {
            Menu.dropData().then(() => {
                this.success()
                this.$message.success('清空成功')
            }).catch(() => {
                this.$message.error('清空失败')
            })
        },
        dropFileInfo() {
            FileInfo.dropData().then(() => {
                this.success()
                this.$message.success('清空成功')
            }).catch(() => {
                this.$message.error('清空失败')
            })
        },
    }
}
</script>
