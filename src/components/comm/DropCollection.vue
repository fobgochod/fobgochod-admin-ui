<template>
    <el-popconfirm title='确定删除集合吗？' @onConfirm='dropData'>
        <el-button slot='reference' icon='el-icon-lock' size='small' type='danger' circle plain
                   style='margin-left: 10px;' />
    </el-popconfirm>
</template>

<script>
import Task from '@/api/system/task'
import FileInfo from '@/api/file/file.info'

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
            if (this.table === 'Task') {
                this.dropTask()
            } else if (this.table === 'FileInfo') {
                this.dropFileInfo()
            }
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
        }
    }
}
</script>