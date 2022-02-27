<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filters' class='demo-form-inline' size='small'>
            <el-form-item label='ID' prop='id'>
                <el-input v-model='pageData.filters.id' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='名称' prop='fileName'>
                <el-input v-model='pageData.filters.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='描述' prop='displayName'>
                <el-input v-model='pageData.filters.displayName' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='父ID' prop='parentId'>
                <el-input v-model='pageData.filters.parentId' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-button :disabled='selectionButtonState' icon='el-icon-finished' size='small' type='danger'
                       @click='consoleSelection'>
                {{selectionButtonTitle}}
            </el-button>
            <el-button icon='el-icon-plus' size='small' type='success' @click='addDialog'>
                新增
            </el-button>
        </el-row>
        <el-table :data='realData' border max-height='520' stripe @selection-change='selection'>
            <el-table-column type='selection' width='50'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='名称' property='name' width='200'></el-table-column>
            <el-table-column label='描述' property='displayName' width='200'></el-table-column>
            <el-table-column label='父ID' property='parentId' width='150'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>
            <el-table-column label='租户ID' property='tenantId' width='100'></el-table-column>
            <el-table-column align='center' label='Bucket' property='bucket' width='120'></el-table-column>

            <el-table-column align='center' fixed label='操作' width='80'>
                <template slot-scope='scope'>
                    <el-button icon='el-icon-edit-outline' title='编辑' type='text'
                               @click='modDialog(scope.row)'>
                    </el-button>
                    <el-dropdown>
                         <span class='el-dropdown-link'>
                             <i class='el-icon-more-outline el-icon--right'></i>
                         </span>
                        <el-dropdown-menu slot='dropdown'>
                            <el-dropdown-item icon='el-icon-delete' @click.native='delData(scope.row)'>
                                删除
                            </el-dropdown-item>
                            <el-popconfirm icon-color='red' title='确定删除吗？' @confirm='delFileForce(scope.row)'>
                                <el-dropdown-item slot='reference' icon='el-icon-delete'>
                                    永久删除
                                </el-dropdown-item>
                            </el-popconfirm>
                            <file-upload :directoryId='scope.row.id'>
                                <el-dropdown-item icon='el-icon-upload2'>
                                    点击上传
                                </el-dropdown-item>
                            </file-upload>

                            <file-download directory :file='scope.row' :success='searchData' />

                            <el-dropdown-item icon='el-icon-share'
                                              @click.native='batchShare(scope.row)'>
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

        <el-dialog :title='addDialogTitle' :visible.sync='addDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-form-item label='名称'>
                    <el-input v-model='formData.name'></el-input>
                </el-form-item>
                <el-form-item label='描述'>
                    <el-input v-model='formData.displayName'></el-input>
                </el-form-item>
                <el-form-item label='父ID'>
                    <el-input v-model='formData.parentId'></el-input>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='addData'> 确认新增</el-button>
            </span>
        </el-dialog>

        <el-dialog :title='modDialogTitle' :visible.sync='modDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-form-item label='名称'>
                    <el-input v-model='formData.name'></el-input>
                </el-form-item>
                <el-form-item label='描述'>
                    <el-input v-model='formData.displayName'></el-input>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='modData'>确认修改</el-button>
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
    </frame-space>
</template>

<script>
import formMixin from '@/mixin/form.mixin'
import DirInfo from '@/api/file/dir.info'
import File from '@/api/file/file'
import Utils from '@/assets/js/utils'

export default {
    mixins: [formMixin],
    components: {
        FileUpload: () => import('@/components/comm/FileUpload'),
        FileDownload: () => import('@/components/comm/FileDownload')
    },
    data() {
        return {
            formData: {
                id: '',
                name: '',
                displayName: '',
                parentId: ''
            },
            batchShareDialogVisible: false,
            batchShareDialogTitle: '批量分享文件'
        }
    },
    methods: {
        addData() {
            DirInfo.addData(this.formData).then(() => {
                this.getByPage()
                this.$message.success('新增' + this.formData.name + '成功')
            }).catch(() => {
                this.$message.error('新增' + this.formData.name + '失败')
            })
            this.addDialogVisible = false
        },
        delData(row) {
            let body = {
                dirId: row.id
            }
            File.batchDelFile(body).then(() => {
                this.getByPage()
                this.$message.success('删除' + row.name + '成功')
            }).catch(() => {
                this.$message.error('删除' + row.name + '失败')
            })
        },
        delFileForce(row) {
            let body = {
                dirId: row.id
            }
            File.batchDelFileForce(body).then(() => {
                this.getByPage()
                this.$message.success('删除' + row.fileName + '成功')
            }).catch(() => {
                this.$message.error('删除' + row.fileName + '失败')
            })
        },
        modDialog(row) {
            this.formData = row
            this.modDialogTitle = '修改（' + this.formData.name + '）'
            this.modDialogVisible = true
        },
        modData() {
            this.update(this.formData)
            this.modDialogVisible = false
        },
        update(data) {
            DirInfo.modData(data).then(() => {
                this.getByPage()
                this.$message.warning('修改' + data.name + '成功')
            }).catch(() => {
                this.$message.warning('修改' + data.name + '失败')
            })
        },
        getByPage() {
            DirInfo.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.realData = res.data.list
                this.$message.success('查询文件成功')
            }).catch(() => {
                this.$message.error('查询文件失败')
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
        },
        batchShare(row) {
            this.formData = row
            this.batchData.dirId = row.id
            this.batchShareDialogVisible = true
        },
        batchShareFile() {
            this.batchData.expireDate = Utils.dateToStr(this.batchData.expireDate)
            File.shareFile(this.batchData).then(() => {
                this.$message.success('分享' + this.formData.name + '目录成功')
            }).catch(() => {
                this.$message.error('分享' + this.formData.name + '目录失败')
            })
            this.batchShareDialogVisible = false
        }
    },
    mounted() {
        this.getByPage()
    }
}
</script>

<style scoped>

</style>
