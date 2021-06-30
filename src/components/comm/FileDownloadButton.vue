<template>
    <el-button icon='el-icon-download' title='下载' type='text' @click='downloadFile'>
    </el-button>
</template>

<script>
import FileDownload from '@/api/file/file.download'

export default {
    props: {
        file: {
            type: Object,
            required: true
        },
        success: {
            type: Function,
            default: () => {
            }
        }
    },
    methods: {
        downloadFile() {
            if (this.file.type === 'File') {
                FileDownload.download(this.file.id).then((res) => {
                    const blob = new Blob([res.data])
                    const href = window.URL.createObjectURL(blob)
                    const el = document.createElement('a')
                    el.href = href
                    el.download = this.file.name
                    document.body.appendChild(el)
                    el.click()
                    document.body.removeChild(el)
                    window.URL.revokeObjectURL(href)

                    this.$message.success('下载' + this.file.name + '成功')
                    this.success()
                }).catch(() => {
                    this.$message.error('下载' + this.file.name + '失败')
                })
            } else {
                let fileName = this.file.name + '[' + new Date().format('Y-m-d') + '].zip'
                FileDownload.downloadDir(this.file.id).then((res) => {
                    const blob = new Blob([res.data])
                    const href = window.URL.createObjectURL(blob)
                    const el = document.createElement('a')
                    el.href = href
                    el.download = fileName
                    document.body.appendChild(el)
                    el.click()
                    document.body.removeChild(el)
                    window.URL.revokeObjectURL(href)

                    this.$message.success('批量下载[' + this.file.name + ']成功')
                    this.success()
                }).catch(() => {
                    this.$message.error('批量下载[' + this.file.name + ']失败')
                })
            }
        }
    }
}
</script>