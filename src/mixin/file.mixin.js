import {mapState} from 'vuex'
import FileUpload from '@/api/file/file.upload'

export default {
    props: {
        batchVisible: {
            type: Boolean,
            default: false
        },
        directoryId: {
            type: String,
            required: true
        },
        success: {
            type: Function,
            default: () => {
            }
        }
    },
    data() {
        return {
            name: '',
            percentage: 0,
            // 单个上传
            uploadVisible: false,
            // 批量上传
            batchUploadTitle: '批量上传',
            batchUploadVisible: false,
            progressVisible: false,
            fileList: []
        }
    },
    computed: {
        ...mapState(['baseUri', 'bucket'])
    },
    watch: {
        batchVisible: function(val) {
            this.batchUploadVisible = val
        }
    },
    methods: {
        uploadByStream(file) {
            this.name = file.name
            this.uploadVisible = true
            // FileReader和axios返回还为解决
            FileUpload.uploadByStream(file, (progress) => this.progressBar(progress), this.directoryId)
            // .then(() => {
            //     this.percentage = 0
            //     this.uploadVisible = false
            //     this.$message.success('文件' + this.name + '上传成功')
            //     this.success()
            // })
            // .catch(() => {
            //     this.uploadVisible = false
            //     this.$message.error('文件' + this.name + '上传失败')
            //     this.$emit('uploadFail')
            // })
        },
        uploadByForm(file) {
            this.name = file.name
            this.uploadVisible = true
            FileUpload.uploadByForm(file, (progress) => this.progressBar(progress), this.directoryId)
            .then(() => {
                this.percentage = 0
                this.uploadVisible = false
                this.$message.success('文件' + this.name + '上传成功')
                this.success()
                // this.$emit('success')
            })
            .catch(() => {
                this.uploadVisible = false
                this.$message.error('文件' + this.name + '上传失败')
                this.$emit('fail')
            })
        },
        progressBar(progress) {
            this.percentage = Number(((progress.loaded / progress.total) * 100).toFixed(2))
        },

        onFileChange(file, fileList) {
            const isLt100MB = file.size / 1024 / 1024 < 100
            if (!isLt100MB) {
                this.$message.error('文件大小不能超过100MB哦!')
            }

            let existFile = fileList.slice(0, fileList.length - 1).find((f) => f.name === file.name)
            if (existFile) {
                this.$message.error('当前文件已经存在!')
                fileList.pop()
            }
            this.fileList = fileList

            let totalSize = this.fileList.reduce(function(prev, curr) {
                return prev + curr.size
            }, 0)
            const isLt1GB = totalSize / 1024 / 1024 / 1024 < 1
            if (!isLt1GB) {
                this.$message.error('文件总大小不能超过1GB哦!')
            }
        },
        onFileExceed(file, fileList) {
            this.$message.warning(
                `当前限制选择 10个文件，本次选择了 ${file.length} 个文件，共选择了 ${
                    file.length + fileList.length
                } 个文件`
            )
        },
        batchUpload() {
            if (this.fileList.length === 0) {
                this.$message.warning('请先选择文件')
                return
            }
            this.progressVisible = true
            FileUpload.batchUpload(this.fileList, (progress) => this.progressBar(progress), this.directoryId)
            .then(() => {
                this.progressPercent = 0
                this.fileList = []
                this.progressVisible = false
                this.batchUploadVisible = false
                this.$message.success('批量上传成功')
                this.success()
            })
            .catch(() => {
                this.progressPercent = 0
                this.fileList = []
                this.progressVisible = false
                this.batchUploadVisible = false
                this.$message.error('批量上传失败')
                this.$emit('fail')
            })
        }
    }
}
