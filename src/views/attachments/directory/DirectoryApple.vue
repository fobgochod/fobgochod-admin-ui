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
                {{ selectionButtonTitle }}
            </el-button>
            <el-button icon='el-icon-plus' size='small' type='success' @click='opDialog("add")'>
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

            <el-table-column align='center' fixed label='操作' width='50'>
                <template v-slot='scope'>
                    <el-dropdown>
                         <span class='el-dropdown-link'>
                             <i class='el-icon-s-operation el-icon--right'></i>
                         </span>
                        <el-dropdown-menu slot='dropdown'>
                            <el-dropdown-item icon='el-icon-plus' @click.native='opDialog("add",scope.row)'>
                                新增
                            </el-dropdown-item>
                            <el-popconfirm icon-color='red' title='确定删除吗？' @confirm='delFileForce(scope.row)'>
                                <el-dropdown-item slot='reference' icon='el-icon-delete'>
                                    删除
                                </el-dropdown-item>
                            </el-popconfirm>
                            <el-dropdown-item icon='el-icon-edit-outline' @click.native='opDialog("mod",scope.row)'>
                                编辑
                            </el-dropdown-item>
                            <el-dropdown-item icon='el-icon-takeaway-box' @click.native='delData(scope.row)'>
                                回收站
                            </el-dropdown-item>
                            <fo-file-upload :directoryId='scope.row.id'>
                                <el-dropdown-item icon='el-icon-upload2'>
                                    点击上传
                                </el-dropdown-item>
                            </fo-file-upload>

                            <fo-file-download directory :file='scope.row' :success='searchData' />
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

        <el-dialog :title='opDialogTitle' :visible.sync='opDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-form-item label='名称'>
                    <el-input v-model='formData.name'></el-input>
                </el-form-item>
                <el-form-item label='描述'>
                    <el-input v-model='formData.displayName'></el-input>
                </el-form-item>
                <el-form-item label='父ID'>
                    <el-input v-model='formData.parentId' disabled></el-input>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                  <el-button type='success' @click='opData(operation)'>保存</el-button>
            </span>
        </el-dialog>
    </frame-space>
</template>

<script>
import formMixin from '@/mixin/form.mixin'
import DirInfo from '@/api/file/dir.info'
import File from '@/api/file/file'

export default {
    mixins: [formMixin],
    data() {
        return {
            formData: {
                id: '',
                name: '',
                displayName: '',
                parentId: '0'
            }
        }
    },
    methods: {
        addDialog(row) {
            if (row) {
                this.formData = {
                    parentId: row.id
                }
            } else {
                this.formData = {
                    parentId: '0'
                }
            }
        },
        addData() {
            DirInfo.addData(this.formData).then(() => {
                this.getByPage()
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
            this.addDialogVisible = false
        },
        delData(row) {
            let body = {
                dirId: row.id
            }
            File.batchDelFile(body).then(() => {
                this.getByPage()
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
        },
        delFileForce(row) {
            let body = {
                dirId: row.id
            }
            File.batchDelFileForce(body).then(() => {
                this.getByPage()
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
        },
        modDialog(row) {
            this.formData = row
            this.opDialogTitle = '修改（' + this.formData.name + '）'
        },
        modData() {
            this.update(this.formData)
        },
        update(data) {
            DirInfo.modData(data).then(() => {
                this.getByPage()
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
        },
        getByPage() {
            DirInfo.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.realData = res.data.list
            }).catch((err) => {
                this.$message.error(err.response.data.message)
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

</style>
