<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filter' class='demo-form-inline' size='small'>
            <el-form-item label='租户ID' prop='code'>
                <el-input v-model='pageData.filter.like.code' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='租户名' prop='name'>
                <el-input v-model='pageData.filter.like.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='手机' prop='telephone'>
                <el-input v-model='pageData.filter.like.telephone' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='所有者' prop='owner'>
                <el-input v-model='pageData.filter.eq.owner' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>
        <el-button icon='el-icon-plus' size='small' type='success' @click='opDialog("add")'>新增</el-button>
        <fo-data-infrastructure table='Tenant' :success='getByPage' />
        <fo-drop-collection table='Tenant' :success='getByPage' />
        <el-table :data='tableData' border stripe @selection-change='selection'>
            <el-table-column :index='getIndex' align='center' label='序号' type='index'
                             width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='租户ID' property='code' width='100'></el-table-column>
            <el-table-column label='租户名' property='name' width='120'></el-table-column>
            <el-table-column label='手机' property='telephone' width='120'></el-table-column>
            <el-table-column label='Email' property='email' width='210'></el-table-column>
            <el-table-column label='所有者' property='owner' width='100'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createCode' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyCode' width='140'></el-table-column>
            <el-table-column align='center' fixed label='操作' width='80'>
                <template v-slot='scope'>
                    <el-button icon='el-icon-edit-outline' title='编辑' type='text' @click='opDialog("mod",scope.row)'>
                    </el-button>
                    <el-popconfirm title='确定删除吗？' @confirm='delData(scope.row)'>
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


        <el-dialog :title='opDialogTitle' :visible.sync='opDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='租户ID'>
                            <el-input v-model='formData.code' :disabled="operation !== 'add'"></el-input>
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
                    <fo-user-option :option.sync='formData.owner' :disabled="operation !== 'add'" />
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                 <el-button type='success' @click='opData(operation)'>保存</el-button>
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
    methods: {
        addData() {
            Tenant.addData(this.formData).then(() => {
                this.getByPage()
            })
        },
        delData(row) {
            Tenant.delData(row).then(() => {
                this.getByPage()
            })
        },
        modData() {
            Tenant.modData(this.formData).then(() => {
                this.getByPage()
            })
        },
        getByPage() {
            Tenant.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.tableData = res.data.list
            })
        },
        getUsers() {
            User.getOptionGroups().then(res => {
                this.users = res.data
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
