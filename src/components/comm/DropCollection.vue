<template>
    <el-popconfirm title='确定删除集合吗？' @onConfirm='dropData'>
        <el-button slot='reference' icon='el-icon-lock' size='small' type='danger' circle plain
                   style='margin-left: 10px;' />
    </el-popconfirm>
</template>

<script>
import User from '@/api/system/user'
import Tenant from '@/api/system/tenant'
import Bucket from '@/api/system/bucket'
import Task from '@/api/system/task'
import FileInfo from '@/api/file/file.info'
import FileShare from '@/api/file/file.share'
import Medicine from '@/api/system/medicine'
import MedicineRecord from '@/api/system/medicine.record'

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
            } else if (this.table === 'Tenant') {
                this.dropTenant()
            } else if (this.table === 'Bucket') {
                this.dropBucket()
            } else if (this.table === 'Medicine') {
                this.dropMedicine()
            } else if (this.table === 'MedicineRecord') {
                this.dropMedicineRecord()
            } else if (this.table === 'Task') {
                this.dropTask()
            } else if (this.table === 'FileInfo') {
                this.dropFileInfo()
            } else if (this.table === 'Share') {
                this.dropShare()
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
        dropTenant() {
            Tenant.dropData().then(() => {
                this.success()
                this.$message.success('清空成功')
            }).catch(() => {
                this.$message.error('清空失败')
            })
        },
        dropBucket() {
            Bucket.dropData().then(() => {
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
        dropTask() {
            Task.dropData().then(() => {
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
        dropShare() {
            FileShare.dropData().then(() => {
                this.success()
                this.$message.success('清空成功')
            }).catch(() => {
                this.$message.error('清空失败')
            })
        }
    }
}
</script>
