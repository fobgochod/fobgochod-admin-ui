<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filters' class='demo-form-inline' size='small'>
            <el-form-item label='ID' prop='id'>
                <el-input v-model='pageData.filters.id' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='租户ID' prop='code'>
                <el-input v-model='pageData.filters.code' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='租户名' prop='name'>
                <el-input v-model='pageData.filters.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='所有者' prop='owner'>
                <el-input v-model='pageData.filters.owner' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>
        <el-button icon='el-icon-plus' size='small' type='success' @click='addDialog'>新增</el-button>
        <drop-collection table='Tenant' :success='getByPage' />
        <el-table :data='realData' border max-height='520' stripe @selection-change='selection'>
            <el-table-column :index='getIndex' align='center' label='序号' type='index'
                             width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='租户ID' property='code' width='100'></el-table-column>
            <el-table-column label='租户名' property='name' width='120'></el-table-column>
            <el-table-column label='Email' property='email' width='180'></el-table-column>
            <el-table-column label='手机' property='telephone' width='120'></el-table-column>
            <el-table-column label='所有者' property='owner' width='100'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>
            <el-table-column align='center' fixed label='操作' width='80'>
                <template slot-scope='scope'>
                    <el-button icon='el-icon-edit-outline' title='编辑' type='text' @click='modDialog(scope.row)'>
                    </el-button>
                    <el-popconfirm title='确定删除吗？' @onConfirm='delData(scope.row)'>
                        <el-button slot='reference' icon='el-icon-delete' title='删除' type='text'>
                        </el-button>
                    </el-popconfirm>
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
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='租户ID'>
                            <el-input v-model='formData.code' placeholder='请输入用户ID'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='租户名'>
                            <el-input v-model='formData.name' placeholder='请输入用户名'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='Email'>
                            <el-input v-model='formData.email' placeholder='请输入用户Email'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='手机'>
                            <el-input v-model='formData.telephone' placeholder='请输入用户手机'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label='所有者'>
                    <el-select v-model='formData.owner' clearable filterable placeholder='请选择租户所有者'
                               size='medium'
                               style='width: 100%'>
                        <el-option-group v-for='group in users'
                                         :key='group.key'
                                         :label='group.label'>
                            <el-option v-for='item in group.options'
                                       :key='item.key'
                                       :value='item.value'
                                       :label='item.label'>
                                <span style='float: left'>{{item.value}}({{item.label}})</span>
                                <span style='float: right; color: #8492a6; font-size: 13px'>{{item.other}}</span>
                            </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='addData'>确认新增</el-button>
            </span>
        </el-dialog>

        <el-dialog :title='modDialogTitle' :visible.sync='modDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='用户ID'>
                            <el-input disabled v-model='formData.code' placeholder='请输入用户ID'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='用户名'>
                            <el-input v-model='formData.name' placeholder='请输入用户名'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='Email'>
                            <el-input v-model='formData.email' placeholder='请输入用户Email'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='手机'>
                            <el-input v-model='formData.telephone' placeholder='请输入用户手机'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label='所有者'>
                    <el-input v-model='formData.owner' disabled></el-input>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='modData'>确认修改</el-button>
            </span>
        </el-dialog>
    </frame-space>
</template>

<script>
import pageMixin from '@/mixin/form.mixin'
import Tenant from '@/api/system/tenant'
import User from '@/api/system/user'

export default {
    mixins: [pageMixin],
    data() {
        return {
            formData: {
                code: '',
                name: '',
                email: '',
                telephone: '',
                owner: ''
            }
        }
    },
    methods: {
        addData() {
            Tenant.addData(this.formData).then(() => {
                this.getByPage()
                this.$message.success('新增' + this.formData.name + '成功')
            }).catch((error) => {
                this.$message.error('新增' + this.formData.name + '失败：[' + error.response.data.message + ']')
            })
            this.addDialogVisible = false
        },
        delData(row) {
            Tenant.delData(row.id).then(() => {
                this.getByPage()
                this.$message.success('删除' + row.name + '成功')
            }).catch(() => {
                this.$message.error('删除' + row.name + '失败')
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
            Tenant.modData(data).then(() => {
                this.getByPage()
                this.$message.success('修改' + data.name + '成功')
            }).catch(() => {
                this.$message.error('修改' + data.name + '失败')
            })
        },
        getByPage() {
            Tenant.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.realData = res.data.list
                this.$message.success('查询租户成功')
            }).catch(() => {
                this.$message.error('查询租户失败')
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
        getUsers() {
            User.getOptions().then(res => {
                this.users = res.data
                this.$message.success('查询用户成功')
            }).catch(() => {
                this.$message.error('查询用户失败')
            })
        }
    },
    mounted() {
        this.getByPage()
        this.getUsers()
    }
}
</script>

<style scoped>

</style>;
