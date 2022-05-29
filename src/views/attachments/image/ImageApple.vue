<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filters' class='demo-form-inline' size='small'>
            <el-form-item label='关键词' prop='fileName'>
                <el-input v-model='pageData.filters.fileName' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='文件类型' prop='contentType'>
                <el-input v-model='pageData.filters.contentType' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>

        <el-button icon='el-icon-upload' size='small' type='primary' @click='dragUpload'>拖拽上传</el-button>
        <fo-file-upload-drag :success='searchData' :batchVisible.sync='dragUploadVisible' />


        <div class='demo-image__error'>
            <div class='block' v-for='image in realData' :key='image.uri'>
                <el-image :src='image.uri' lazy :preview-src-list='[image.uri]' fit='fit'
                          style='width: 300px; height: 200px;'>
                    <div slot='error' class='image-slot'>
                        <i class='el-icon-picture-outline'></i>
                    </div>
                </el-image>
                <span class='title'>
                    <span>{{ image.fileName }}</span>
                    <span style='float:right; margin-right: 10px'>
                         <el-dropdown>
                         <span class='el-dropdown-link'>
                             <i class='el-icon-more-outline el-icon--right'></i>
                         </span>
                        <el-dropdown-menu slot='dropdown'>
                            <el-dropdown-item icon='el-icon-rank' @click.native='shrinkDialog(image)'>
                                压缩
                            </el-dropdown-item>

                            <fo-file-download :file='image' />

                             <el-dropdown-item icon='el-icon-delete' @click.native='delFileForce(image)'>
                                删除
                            </el-dropdown-item>

                            <el-dropdown-item icon='el-icon-delete' @click.native='editDialog(image)'>
                                编辑
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                    </span>
                </span>
            </div>
        </div>

        <el-pagination :current-page='pageData.pageNum'
                       :page-size='pageData.pageSize'
                       :page-sizes='[10, 20, 50, 100]'
                       :total='pageData.total'
                       background
                       layout='total, sizes, prev, pager, next, jumper'
                       style='margin-top:10px'
                       @size-change='pageSizeChange'
                       @current-change='pageNumChange'>
        </el-pagination>

        <el-dialog :title='shrinkDialogTitle' :visible.sync='shrinkDialogVisible' center width='450px'>
            <el-form ref='form' label-width='80px'>
                <el-form-item label='文件ID'>
                    <el-input v-model='shrink.fileId' disabled></el-input>
                </el-form-item>
                <el-form-item label='文件名称'>
                    <el-input v-model='shrink.fileName' disabled></el-input>
                </el-form-item>
                <el-row :gutter='20'>
                    <el-col :span='12'>
                        <el-form-item label='宽度(px)'>
                            <el-input v-model='shrink.width'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='高度(px)'>
                            <el-input v-model='shrink.height'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='shrinkFile'>确认压缩</el-button>
            </span>
        </el-dialog>

        <el-drawer title='附件详情' :visible.sync='editDialogVisible' direction='rtl' size='30%'>
            <el-container style='height: 800px; border: 1px solid #eee'>
                <el-header height='300px'>
                    <el-image fit='fit' :src='formData.uri' style='width: 100%; height: 100%'>
                    </el-image>
                </el-header>
                <el-main style='background-color: #E9EEF3;'>
                    <el-form ref='form' :model='formData' label-width='80px' label-position='top' size='medium'>
                        <el-form-item label='附件名'>
                            <el-input v-model='formData.fileName'></el-input>
                        </el-form-item>
                        <el-form-item label='附件类型'>
                            <el-input v-model='formData.contentType'></el-input>
                        </el-form-item>
                        <el-form-item label='附件大小'>
                            <el-input v-model='formData.size'></el-input>
                        </el-form-item>
                        <el-form-item label='图片尺寸'>
                            <el-input v-model='formData.size'></el-input>
                        </el-form-item>
                        <el-form-item label='上传日期'>
                            <el-input v-model='formData.createDate'></el-input>
                        </el-form-item>
                        <el-form-item label='普通链接'>
                            <el-input v-model='formData.createDate'></el-input>
                        </el-form-item>
                    </el-form>
                </el-main>
                <el-footer>
                    <div style='float: right;'>
                        <el-button>取 消</el-button>
                        <el-button type='danger'>确 定</el-button>
                    </div>
                </el-footer>
            </el-container>
        </el-drawer>
    </frame-space>
</template>

<script>
import pageMixin from '@/mixin/form.mixin'
import Shrink from '@/api/image/image.shrink'
import File from '@/api/file/file'

export default {
    mixins: [pageMixin],
    data() {
        return {
            images: [],
            shrinkDialogVisible: false,
            shrinkDialogTitle: '压缩图片',
            shrink: {
                fileId: '',
                fileName: '',
                width: 0,
                height: 0
            },
            editDialogVisible: false,
            dragUploadVisible: false
        }
    },
    methods: {
        shrinkDialog(image) {
            this.shrink.fileId = image.fileId
            this.shrink.fileName = image.fileName
            this.shrinkDialogVisible = true
        },
        shrinkFile() {
            Shrink.shrinkImage(this.shrink).then(() => {
                this.getByPage()
                this.$message.success('压缩图片' + this.shrink.fileName + '成功')
            }).catch(() => {
                this.$message.error('压缩图片' + this.shrink.fileName + '失败')
            })
            this.shrinkDialogVisible = false
        },
        delFileForce(image) {
            File.delFileForce(image.fileId).then(() => {
                this.getByPage()
                this.$message.success('删除图片' + image.fileName + '成功')
            }).catch(() => {
                this.$message.error('删除图片' + image.fileName + '失败')
            })
        },
        editDialog(image) {
            this.editDialogVisible = true
            this.formData = image
        },
        dragUpload() {
            this.dragUploadVisible = true
        },
        getByPage() {
            Shrink.getImageByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.realData = res.data.list
                this.$message.success('查询图片成功')
            }).catch(() => {
                this.$message.error('查询图片失败')
            })
        },
        searchData() {
            this.pageData.pageNum = 1
            this.getByPage()
        },
        clearData(formName) {
            this.$refs[formName].resetFields()
            this.searchData()
            this.pageData.filters = {}
        },
        pageSizeChange(pageSize) {
            this.pageData.pageNum = 1
            this.pageData.pageSize = pageSize
            this.$message.success('每页显示' + pageSize + '条数据 ' + '正在展示第' + this.pageData.pageNum + '页数据')
            this.getByPage()
        },
        pageNumChange(pageNum) {
            this.pageData.pageNum = pageNum
            this.$message.success('每页显示' + this.pageData.pageSize + '条数据 ' + '正在展示第' + pageNum + '页数据')
            this.getByPage()
        }
    },
    mounted() {
        this.getByPage()
    }
}
</script>

<style scoped>
.demo-image__error {
    max-height: 700px;
    overflow: auto
}

.block {
    padding: 20px 0;
    text-align: center;
    border-right: 1px solid #eff2f6;
    display: inline-block;
    width: 20%;
    box-sizing: border-box;
    vertical-align: top;
}

.title {
    display: block;
    color: #8492a6;
    font-size: 16px;
    margin-top: 10px;
}
</style>
