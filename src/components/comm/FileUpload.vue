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
            <h1>[{{this.name}}] 文件正在上传中...</h1>
            <el-progress :percentage='percentage' :stroke-width='20' :text-inside='true'></el-progress>
        </el-dialog>
    </div>
</template>

<script>
import fileMixin from '@/mixin/file.mixin'

export default {
    mixins: [fileMixin],
    methods: {
        uploadFile(file) {
            this.uploadByForm(file.raw)
        }
    }
}
</script>


<style scoped>
.inline-block {
    display: inline-block;
}
</style>
