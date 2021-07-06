<template>
    <div>
        <el-form ref='formCondData' :inline='true' :model='pageData.filters' class='demo-form-inline' size='small'>
            <el-form-item label='文件ID' prop='id'>
                <el-input v-model='pageData.filters.id' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='名称' prop='name'>
                <el-input v-model='pageData.filters.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='租户' prop='tenantId'>
                <el-input v-model='pageData.filters.tenantId' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='是否完成' prop='completed'>
                <el-select v-model='pageData.filters.completed' placeholder='请选择'>
                    <el-option label='是' :value=true></el-option>
                    <el-option label='否' :value=false></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-button :disabled='selectionButtonState' icon='el-icon-finished' size='small'
                       type='danger' @click='consoleSelection'>
                {{selectionButtonTitle}}
            </el-button>

            <file-upload :directoryId='directoryId' :success='searchData'>
                <el-button icon='el-icon-upload2' size='small' style='margin-left: 10px'>上传</el-button>
            </file-upload>

            <file-upload-v1 :directoryId='directoryId' :success='searchData'>
                <el-button icon='el-icon-upload2' size='small' type='info' style='margin-left: 10px'>上传V1</el-button>
            </file-upload-v1>

            <el-button icon='el-icon-upload2' size='small' style='margin-left: 10px;' @click='batchUpload'>批量上传
            </el-button>
            <file-upload-multi :directoryId='directoryId' :success='searchData'
                               :batchVisible.sync='batchUploadVisible' />

            <file-download-multi :fileIds='selectionIds' :success='searchData' />

            <el-button icon='el-icon-share' size='small' @click='batchShareDialog'>
                批量分享
            </el-button>

            <el-popconfirm title='确定删除吗？' @onConfirm='batchDelFileForce'>
                <el-button slot='reference' icon='el-icon-delete' size='small' style='margin-left: 10px;'>
                    批量删除
                </el-button>
            </el-popconfirm>

            <el-button icon='el-icon-delete' size='small' style='margin-left: 10px;'
                       @click='batchDelFile'>批量回收站
            </el-button>

            <drop-collection table='FileInfo' :success='getByPage' />
        </el-row>
        <el-table :data='realData' border max-height='520' stripe @selection-change='selection'
                  @cell-dblclick='dblClick'>
            <el-table-column type='selection' width='50'></el-table-column>
            <el-table-column :index='getIndex' align='center' label='序号' type='index' width='60'></el-table-column>
            <el-table-column label='文件ID' property='id' width='180'>
                <template slot-scope='scope'>
                    <a :href='`${baseUri}/file/preview/${scope.row.id}`'
                       target='_blank'>{{scope.row.id}}</a>
                </template>
            </el-table-column>
            <el-table-column label='名称' property='name' width='200'></el-table-column>
            <el-table-column label='显示名称' property='displayName' width='200'></el-table-column>
            <el-table-column label='标签' property='tag' width='160'></el-table-column>
            <el-table-column label='大小' property='sizeShow' width='100'></el-table-column>
            <el-table-column label='后缀名' property='extension' width='80'></el-table-column>
            <el-table-column label='扩展名' property='contentType' width='200'></el-table-column>
            <el-table-column align='center' label='完成' width='60'>
                <template slot-scope='scope'>
                    <el-checkbox v-model='scope.row.completed'
                                 @change='checked=>completed(checked, scope.row)'></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column align='center' label='过期时间' property='expireDate' width='160'></el-table-column>
            <el-table-column label='目录ID' property='directoryId' width='180'></el-table-column>
            <el-table-column label='FileId' property='fileId' width='220'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>
            <el-table-column label='租户ID' property='tenantId' width='100'></el-table-column>

            <el-table-column align='center' fixed='left' label='操作' width='80'>
                <template slot-scope='scope'>
                    <el-button icon='el-icon-edit-outline' title='编辑' type='text' @click='modDialog(scope.row)'>
                    </el-button>
                    <el-dropdown>
                         <span class='el-dropdown-link'>
                             <i class='el-icon-more-outline el-icon--right'></i>
                         </span>
                        <el-dropdown-menu slot='dropdown'>
                            <el-dropdown-item icon='el-icon-delete' @click.native='delFile(scope.row)'>
                                删除
                            </el-dropdown-item>
                            <el-popconfirm icon-color='red' title='确定删除吗？' @onConfirm='delFileForce(scope.row)'>
                                <el-dropdown-item slot='reference' icon='el-icon-delete'>
                                    永久删除
                                </el-dropdown-item>
                            </el-popconfirm>

                            <file-download :file='scope.row' :success='searchData' />

                            <el-dropdown-item icon='el-icon-share' @click.native='shareFile(scope.row)'>
                                永久分享
                            </el-dropdown-item>
                            <el-dropdown-item icon='el-icon-share' @click.native='shareFile1(scope.row)'>
                                永久分享V1
                            </el-dropdown-item>
                            <el-dropdown-item icon='el-icon-share' @click.native='shareDialog(scope.row)'>
                                分享
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

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

        <el-dialog :title='modDialogTitle' :visible.sync='modDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='原始名称'>
                            <el-input v-model='formData.name' disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='显示名称'>
                            <el-input v-model='formData.displayName'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='过期时间'>
                            <el-date-picker v-model='formData.expireDate' placeholder='选择日期时间' type='datetime'>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='目录'>
                            <el-input v-model='formData.directoryId'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='6'>
                        <el-form-item label='租户'>
                            <el-input v-model='formData.tenantId'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='18'>
                        <el-form-item label='标签'>
                            <el-tag :key='tag' v-for='tag in dynamicTags'
                                    closable :disable-transitions='false'
                                    @close='tagClose(tag)'>
                                {{tag}}
                            </el-tag>
                            <el-input class='input-new-tag'
                                      v-if='tagInputVisible'
                                      v-model='tagInputValue'
                                      ref='saveTagInput'
                                      size='small'
                                      @keyup.enter.native='tagInputConfirm'
                                      @blur='tagInputConfirm'>
                            </el-input>
                            <el-button v-else class='button-new-tag' size='small' @click='tagInput'>+ New Tag
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='modData'>确认修改</el-button>
            </span>
        </el-dialog>

        <el-dialog :title='shareDialogTitle' :visible.sync='shareDialogVisible' center width='500px'>
            <el-form ref='form' label-width='80px'>
                <el-form-item label='文件名称'>
                    <el-input v-model='formData.name' disabled></el-input>
                </el-form-item>
                <el-row :gutter='20'>
                    <el-col :span='16'>
                        <el-form-item label='分享时间'>
                            <el-date-picker v-model='batchData.expireDate' placeholder='选择日期时间' type='datetime'>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-button type='success' @click='shareFileExpire'>分享</el-button>
                    </el-col>
                </el-row>
                <el-row :gutter='20'>
                    <el-col :span='16'>
                        <el-form-item label='分享时间'>
                            <el-input-number v-model='shareDays' :max='1000' :min='1'></el-input-number>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-button type='info' @click='shareFileDays'>分享V1</el-button>
                    </el-col>
                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
            </span>
        </el-dialog>

        <el-dialog :title='batchShareDialogTitle' :visible.sync='batchShareDialogVisible' center width='400px'>
            <el-form ref='form' label-width='80px'>
                <el-form-item label='分享时间'>
                    <el-date-picker v-model='batchData.expireDate' placeholder='选择日期时间' type='datetime'>
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='batchShareFile'>确认分享</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import formMixin from '@/mixin/form.mixin'
import '@/assets/js/date.format'
import Utils from '@/assets/js/utils'
import File from '@/api/file/file'
import FileInfo from '@/api/file/file.info'

export default {
    mixins: [formMixin],
    props: ['directoryId'],
    components: {
        DropCollection: () => import('@/components/comm/DropCollection.vue'),
        FileUpload: () => import('@/components/comm/FileUpload'),
        FileUploadV1: () => import('@/components/comm/FileUploadV1'),
        FileUploadMulti: () => import('@/components/comm/FileUploadMulti'),
        FileDownload: () => import('@/components/comm/FileDownload'),
        FileDownloadMulti: () => import('@/components/comm/FileDownloadMulti')
    },
    data() {
        return {
            formData: {
                name: '',
                displayName: '',
                expireDate: null
            },
            dialogUpload: false,
            shareDialogTitle: '分享文件',
            shareDialogVisible: false,
            shareDays: 10,
            batchShareDialogVisible: false,
            batchShareDialogTitle: '批量分享文件',
            batchUploadVisible: false,
            dynamicTags: [],
            tagInputVisible: false,
            tagInputValue: ''
        }
    },
    computed: mapState(['baseUri', 'bucket']),
    methods: {
        tagClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },
        tagInput() {
            this.tagInputVisible = true
            this.$nextTick(_ => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        tagInputConfirm() {
            let inputValue = this.tagInputValue
            if (inputValue) {
                this.dynamicTags.push(inputValue)
            }
            this.tagInputVisible = false
            this.tagInputValue = ''
        },
        modDialog(row) {
            if (row.tag) {
                this.dynamicTags = row.tag.split(';')
            } else {
                this.dynamicTags = []
            }
            this.formData = row
            this.modDialogTitle = '修改（' + this.formData.name + '）'
            this.modDialogVisible = true
        },
        modData() {
            if (this.dynamicTags.length > 0) {
                this.formData.tag = this.dynamicTags.join(';')
            } else {
                this.formData.tag = null
            }
            this.formData.expireDate = Utils.dateToStr(this.formData.expireDate)
            FileInfo.modData(this.formData).then(() => {
                this.getByPage()
                this.$message.success('修改' + this.formData.name + '成功')
            }).catch(() => {
                this.$message.error('修改' + this.formData.name + '失败')
            })
            this.modDialogVisible = false
        },
        completed(checked, data) {
            FileInfo.completed(data.id, checked).then(() => {
                this.$message.success('修改状态成功')
                this.getByPage()
            }).catch(() => {
                this.$message.error('修改状态失败')
                this.getByPage()
            })
        },
        getByPage() {
            FileInfo.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.data.total
                this.realData = res.data.data.list
                // 修改文件大小显示方式
                this.realData.forEach(function(item, index, arr) {
                    arr[index].sizeShow = Utils.byteSwitch(item.size)
                    arr[index].complete = !item.completed
                })
                this.$message.success('查询文件成功')
            }).catch(() => {
                this.$message.error('查询文件失败')
            })
        },
        getByDirectoryId() {
            this.pageData.filters.directoryId = this.directoryId
            this.searchData()
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
        },
        batchUpload() {
            this.batchUploadVisible = true
        },
        delFileForce(row) {
            File.delFileForce(row.id).then(() => {
                this.getByPage()
                this.$message.success('删除' + row.name + '成功')
            }).catch(() => {
                this.$message.error('删除' + row.name + '失败')
            })
        },
        delFile(row) {
            File.delFile(row.id).then(() => {
                this.getByPage()
                this.$message.success('移' + row.name + '进回收站成功')
            }).catch(() => {
                this.$message.error('移' + row.name + '进回收站失败')
            })
        },
        shareFile(row) {
            this.batchData.fileId = row.id
            File.shareFile(this.batchData).then(() => {
                this.$message.success('分享' + row.name + '成功')
            }).catch(() => {
                this.$message.error('分享' + row.name + '失败')
            })
        },
        shareDialog(row) {
            this.formData = row
            this.batchData.fileId = row.id
            this.shareDialogVisible = true
        },
        shareFileExpire() {
            this.batchData.expireDate = Utils.dateToStr(this.batchData.expireDate)
            File.shareFile(this.batchData).then(() => {
                this.$message.success('分享' + this.formData.name + '成功')
            }).catch(() => {
                this.$message.error('分享' + this.formData.name + '失败')
            })
            this.shareDialogVisible = false
        },
        shareFile1(row) {
            let ids = [row.id]
            File.shareFile1(ids).then(() => {
                this.$message.success('分享' + row.name + '成功')
            }).catch(() => {
                this.$message.error('分享' + row.name + '失败')
            })
        },
        shareFileDays() {
            let ids = [this.batchData.fileId]
            File.shareFileDays(ids, this.shareDays).then(() => {
                this.$message.success('分享' + this.formData.name + '成功')
            }).catch(() => {
                this.$message.error('分享' + this.formData.name + '失败')
            })
            this.shareDialogVisible = false
        },
        getFileInfo(file) {
            this.formData = {}
            this.formData.name = file.name
            this.formData.displayName = null
            this.formData.description = null
            return encodeURIComponent(JSON.stringify(this.formData))
        },
        batchShareDialog() {
            this.batchShareDialogVisible = true
        },
        batchShareFile() {
            if (this.selectionData.length === 0) {
                this.$message.error('请选择要操作的文件!')
                this.batchShareDialogVisible = false
                return
            }
            this.batchData.fileIds = this.selectionIds()
            this.batchData.expireDate = Utils.dateToStr(this.batchData.expireDate)
            File.shareFile(this.batchData).then((res) => {
                this.$message.success(res.data)
                this.$message.success('分享' + this.batchData.fileIds.length + '个文件成功')
            }).catch(() => {
                this.$message.error('分享' + this.batchData.fileIds.length + '个文件失败')
            })
            this.batchShareDialogVisible = false
        },
        batchDelFileForce() {
            if (this.selectionData.length === 0) {
                this.$message.error('请选择要操作的文件!')
                return
            }
            let body = {
                fileIds: this.selectionIds()
            }
            File.batchDelFileForce(body).then(() => {
                this.searchData()
                this.$message.success('批量删除[' + this.selectionData.length + ']个文件成功')
            }).catch(() => {
                this.$message.error('批量删除' + this.selectionData.length + '个文件失败')
            })
        },
        batchDelFile() {
            if (this.selectionData.length === 0) {
                this.$message.error('请选择要操作的文件!')
                return
            }
            let body = {
                fileIds: this.selectionIds()
            }
            File.batchDelFile(body).then(() => {
                this.searchData()
                this.$message.success('批量删除[' + this.selectionData.length + ']个文件到回收站成功')
            }).catch(() => {
                this.$message.error('批量删除' + this.selectionData.length + '个文件到回收站失败')
            })
        },
        dblClick(row, column) {
            if (column.property === 'id') {
                let url = this.baseUri + '/api/dmc/v2/file/' + this.bucket + '/preview/' + row[column.property]
                this.$message.success(url)
            }
        }
    },
    watch: {
        directoryId: function() {
            this.getByDirectoryId()
        }
    },
    mounted() {
        this.getByPage()
    }
}
</script>

<style scoped>
a {
    color: #606266;
    text-decoration: none;
}

.inline-block {
    display: inline-block;
}

.el-tag + .el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
