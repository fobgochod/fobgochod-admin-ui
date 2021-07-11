<template>
    <div class='inline-block'>
        <el-upload :auto-upload='false'
                   :on-change='uploadFile'
                   :show-file-list='false'
                   action=''
                   class='upload-demo'>
            <slot></slot>
        </el-upload>

        <el-dialog :close-on-click-modal='false'
                   :modal='false'
                   :visible.sync='uploadVisible'
                   title='上传进度'
                   width='25%'>
            <h1>[{{this.fileName}}] 文件正在上传中...</h1>
            <el-progress :percentage='percentage' :stroke-width='20' :text-inside='true'></el-progress>
        </el-dialog>
    </div>
</template>

<script>
import store from '@/store'
import axios from '@/config/http'
import fileMixin from '@/mixin/file.mixin'

export default {
    mixins: [fileMixin],
    methods: {
        uploadFile(file) {
            this.uploadByStream(file.raw)
        },
        uploadByStream(file) {
            this.name = file.name
            this.uploadVisible = true

            this.formData = {
                name: file.name,
                displayName: null,
                tag: '文件',
                expireDate: new Date(2038, 1, 19, 11, 14, 7).format('Y-m-d H:i:s'),
                directoryId: this.directoryId,
                tenantId: store.state.tenantId
            }
            let reader = new FileReader()
            reader.readAsArrayBuffer(file)
            reader.onload = (e) => {
                axios({
                    method: 'post',
                    url: store.state.baseUri + '/api/dmc/v1/buckets/' + store.state.bucket + '/files',
                    headers: {
                        'digi-middleware-drive-arg': encodeURIComponent(JSON.stringify(this.formData))
                    },
                    data: e.target.result,
                    onUploadProgress: (progressEvent) => {
                        this.progressBar(progressEvent)
                    }
                })
                .then(() => {
                    this.percentage = 0
                    this.uploadVisible = false
                    this.$message.success('文件' + this.name + '上传成功')
                    this.success()
                })
                .catch(() => {
                    this.uploadVisible = false
                    this.$message.error('文件' + this.name + '上传失败')
                    this.$emit('fail')
                })
            }
        }
    }
}
</script>


<style scoped>
.inline-block {
    display: inline-block;
}
</style>
