<template>
    <el-dropdown-item icon='el-icon-download' @click.native='downloadFile'>
        下载
    </el-dropdown-item>
</template>

<script>
import FileDownload from '@/api/file/file.download'

export default {
    props: {
        directory: {
            type: Boolean,
            default: false
        },
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
            if (this.directory) {
                let name = this.file.name ? this.file.name : this.file.label
                let fileName = name + '[' + new Date().format('Y-m-d') + '].zip'
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

                    this.$message.success('批量下载[' + name + ']成功')
                    this.success()
                }).catch(() => {
                    this.$message.error('批量下载[' + name + ']失败')
                })
            } else {
                let fileId = this.file.id ? this.file.id : this.file.fileId
                FileDownload.download(fileId).then((res) => {
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
            }
        }
    }
}
</script>
