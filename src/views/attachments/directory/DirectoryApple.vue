<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filter' class='demo-form-inline' size='small'>
            <el-form-item label='ID' prop='id'>
                <el-input v-model='pageData.filter.eq.id' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='名称' prop='fileName'>
                <el-input v-model='pageData.filter.like.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='父ID' prop='parentId'>
                <el-input v-model='pageData.filter.eq.parentId' @change='searchData'></el-input>
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
        <el-table :data='tableData' border max-height='520' stripe @selection-change='selection'>
            <el-table-column type='selection' width='50'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='名称' property='name' width='200'></el-table-column>
            <el-table-column label='父ID' property='parentId' width='150'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createCode' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyCode' width='140'></el-table-column>

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
            })
        },
        delData(row) {
            // DirInfo.delFile(row).then(() => {
            //     this.getByPage()
            // })
            File.delDir(row.id).then(() => {
                this.getByPage()
            })
        },
        modData() {
            DirInfo.modData(this.formData).then(() => {
                this.getByPage()
            })
        },
        getByPage() {
            DirInfo.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.tableData = res.data.list
            })
        },
        delFileForce(row) {
            File.delDirForce(row.id).then(() => {
                this.getByPage()
            })
        }
    },
    mounted() {
        this.getByPage()
    }
}
</script>

<style scoped>

</style>
