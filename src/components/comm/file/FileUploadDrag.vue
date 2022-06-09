<template>
    <div class='inline-block'>
        <el-button icon='el-icon-upload' size='small' type='primary' style='margin-left: 10px;'
                   @click='batchUploadVisible=true'>
            拖拽上传
        </el-button>

        <el-dialog :title='dragUploadTitle' :visible.sync='batchUploadVisible' center
                   style='width: 800px; margin:0 auto 50px'
                   @close="$emit('update:batchVisible', false)">
            <el-upload
                :auto-upload='false'
                :file-list='fileList'
                :limit='10'
                :on-change='onFileChange'
                :on-exceed='onFileExceed'
                class='upload-demo'
                drag
                action=''
                multiple>
                <i class='el-icon-upload'></i>
                <div class='el-upload__text'>将文件拖到此处，或<em>点击上传</em></div>

                <div class='el-upload__tip' slot='tip'>只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <el-button size='small' type='text' @click='batchUpload'>上传到服务器</el-button>
        </el-dialog>
    </div>
</template>

<script>
import fileMixin from '@/mixin/file.mixin'

export default {
    props: {
        dragVisible: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            dragUploadTitle: '拖拽上传'
        }
    },
    mixins: [fileMixin]
}
</script>
