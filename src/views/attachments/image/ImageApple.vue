<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filter' class='demo-form-inline' size='small'>
            <el-form-item label='关键词' prop='fileName'>
                <el-input v-model='pageData.filter.like.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='文件类型' prop='mediaType'>
                <el-input v-model='pageData.filter.eq.mediaType' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>

        <fo-file-upload-drag :success='searchData' />

        <div class='demo-image__error'>
            <div class='block' v-for='image in tableData' :key='image.id'>
                <el-image :src='image.url' lazy fit='fit'
                          :preview-src-list='[image.url]'
                          style='width: 300px; height: 200px;'>
                    <div slot='error'>
                        <div style='height: 200px' class='el-image__error'>当前文件不支持预览</div>
                    </div>
                </el-image>
                <span class='title'>
                    <el-link :underline='false' @click='editDialog(image)'>{{ image.name }}</el-link>
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

                            <el-dropdown-item icon='el-icon-edit' @click.native='editDialog(image)'>
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
                    <el-image fit='fit' :src='formData.url' style='width: 100%; height: 100%'>
                    </el-image>
                </el-header>
                <el-main>
                    <el-form ref='form' :model='formData' label-width='80px' label-position='top' size='medium'>
                        <el-form-item label='附件名'>
                            <el-input v-model='formData.name' disabled>
                                <el-button slot='append' icon='el-icon-edit' @click='changeNameDialog'></el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item label='附件类型'>
                            <el-input v-model='formData.mediaType' disabled />
                        </el-form-item>
                        <el-form-item label='附件大小'>
                            <el-input v-model='formData.sizeShow' disabled />
                        </el-form-item>
                        <el-form-item label='图片尺寸'>
                            <el-input v-model='formData.imageSize' disabled />
                        </el-form-item>
                        <el-form-item label='上传日期'>
                            <el-input v-model='formData.createDate' disabled />
                        </el-form-item>
                        <el-form-item label='普通链接'>
                            <el-input v-model='formData.url' disabled>
                                <el-button slot='append' icon='el-icon-copy-document' @click='copyUrl'></el-button>
                            </el-input>
                        </el-form-item>
                    </el-form>
                </el-main>
                <el-footer>
                    <div style='float: right;'>
                        <el-button @click='editDialogVisible=false' type='info'>关 闭</el-button>
                    </div>
                </el-footer>
            </el-container>
        </el-drawer>

        <el-dialog :title='modFileNameTitle' :visible.sync='modFileNameVisible' width='400px'>
            <el-form ref='form' :model='formData'>
                <el-form-item>
                    <el-row :gutter='10'>
                        <el-col :span='20'>
                            <el-input v-model='fileName'></el-input>
                        </el-col>
                        <el-col :span='4'><span>.{{ formData.suffix }}</span></el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot='footer' class='dialog-footer'>
                <el-button @click='modFileNameVisible = false'>取 消</el-button>
                <el-button type='primary' @click='changeName'>确 定</el-button>
            </div>
        </el-dialog>
    </frame-space>
</template>

<script>
import pageMixin from '@/mixin/form.mixin'
import Shrink from '@/api/image/image.shrink'
import File from '@/api/file/file'
import FileInfo from '@/api/file/file.info'
import {mapState} from 'vuex'
import Utils from '@/assets/js/utils'

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
            dragUploadVisible: false,

            fileName: {},
            modFileNameTitle: '重命名',
            modFileNameVisible: false
        }
    },
    computed: mapState(['baseUri']),
    methods: {
        shrinkDialog(image) {
            this.shrink = {
                fileId: image.id,
                fileName: image.name,
                width: image.width,
                height: image.height
            }
            this.shrinkDialogVisible = true
        },
        shrinkFile() {
            Shrink.shrinkImage(this.shrink).then(() => {
                this.getByPage()
            })
            this.shrink = {}
            this.shrinkDialogVisible = false
        },
        delFileForce(image) {
            File.delFileForce(image.id).then(() => {
                this.getByPage()
            })
        },
        editDialog(image) {
            this.editDialogVisible = true
            this.formData = image
        },
        modData() {
            FileInfo.modData(this.formData).then(() => {
                this.getByPage()
            })
            this.editDialogVisible = false
        },
        dragUpload() {
            this.dragUploadVisible = true
        },
        getByPage() {
            let that = this
            FileInfo.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.tableData = res.data.list

                this.tableData.forEach(function(item, index, arr) {
                    arr[index].sizeShow = Utils.byteSwitch(item.size)
                    arr[index].imageSize = item.width + 'X' + item.height
                    if (item.width > 0) {
                        // 有宽度的就是图片
                        arr[index].url = `${that.baseUri}/file/preview?fileId=${item.id}`
                    }
                })
            })
        },
        changeNameDialog() {
            let len = this.formData.name.lastIndexOf('.')
            this.fileName = this.formData.name.slice(0, len)
            this.modFileNameVisible = true
        },
        changeName() {
            this.formData.name = this.fileName + '.' + this.formData.suffix
            FileInfo.changeName(this.formData.id, this.formData.name)
            .then(() => {
                this.getByPage()
            })
            this.modFileNameVisible = false
        },
        copyUrl() {
            this.$copyText(this.formData.url).then(() => {
                this.$notify({
                    message: '复制成功',
                    type: 'success',
                    position: 'bottom-left'
                })
            })
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
