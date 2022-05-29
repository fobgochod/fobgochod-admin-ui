<template>
    <el-dialog :title='batchUploadTitle' :visible.sync='batchUploadVisible' center
               @close="$emit('update:batchVisible', false)">
        <el-upload
            :auto-upload='false'
            :file-list='fileList'
            :limit='10'
            :on-change='onFileChange'
            :on-exceed='onFileExceed'
            class='upload-demo'
            multiple>
            <el-button slot='trigger' size='small' type='primary'>点击上传</el-button>
            <el-button size='small' style='margin-left: 10px;' type='success' @click='batchUpload'>上传到服务器
            </el-button>
            <div slot='tip' class='el-upload__tip'>单个文件最大为100MB，最多同时上传10个，总大小不超过1GB</div>
            <div v-show='progressVisible'>
                <el-progress :percentage='percentage' :stroke-width='14' :text-inside='true'
                             status='success'></el-progress>
            </div>
        </el-upload>
    </el-dialog>
</template>

<script>
import fileMixin from '@/mixin/file.mixin'

export default {
    mixins: [fileMixin]
}
</script>