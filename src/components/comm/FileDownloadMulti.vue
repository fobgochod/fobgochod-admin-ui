<template>
    <el-button icon='el-icon-download' size='small' style='margin-left: 10px;'
               @click='downloadFile'>批量下载
    </el-button>
</template>

<script>
import FileDownload from '@/api/file/file.download'

export default {
    props: {
        fileIds: {
            type: Function,
            default: () => {
            }
        },
        dirIds: {
            type: Function,
            default: () => {
            }
        },
        success: {
            type: Function,
            default: () => {
            }
        }
    },
    methods: {
        downloadFile() {
            let body = {
                fileIds: this.fileIds(),
                dirIds: this.dirIds()
            }
            let size = this.fileIds.length + this.dirIds.length
            let fileName = '批量下载' + new Date().format('Y-m-d') + '.zip'
            FileDownload.batchDownload(body).then((res) => {
                const blob = new Blob([res.data])
                const href = window.URL.createObjectURL(blob)
                const el = document.createElement('a')
                el.href = href
                el.download = fileName
                document.body.appendChild(el)
                el.click()
                document.body.removeChild(el)
                window.URL.revokeObjectURL(href)

                this.$message.success('批量下载[' + size + ']个成功')
                this.success()
            }).catch(() => {
                this.$message.error('批量下载[' + size + ']个失败')
            })
        }
    }
}
</script>