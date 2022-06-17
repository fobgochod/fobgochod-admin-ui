<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.cond' class='demo-form-inline' size='small'>
            <el-form-item label='角色ID' prop='code'>
                <el-input v-model='pageData.filter.like.code' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='角色名' prop='name'>
                <el-input v-model='pageData.filter.like.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>
        <el-button icon='el-icon-plus' size='small' type='success' @click='opDialog("add")'>新增</el-button>
        <fo-data-infrastructure table='Role' :success='getByPage' />
        <fo-drop-collection table='Role' :success='getByPage' />
        <el-table :data='tableData' border stripe @selection-change='selection'>
            <el-table-column :index='getIndex' align='center' label='序号' type='index'
                             width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='角色ID' property='code' width='100'></el-table-column>
            <el-table-column label='角色名' property='name' width='120'></el-table-column>
            <el-table-column align='center' label='序' property='order' width='50'></el-table-column>
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
                    <el-col :span='8'>
                        <el-form-item label='角色ID'>
                            <el-input v-model='formData.code' :disabled="operation !== 'add'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='角色名'>
                            <el-input v-model='formData.name'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='序号'>
                            <el-input v-model='formData.order'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='opData(operation)'>保存</el-button>
            </span>
        </el-dialog>
    </frame-space>
</template>

<script>
import pageMixin from '@/mixin/form.mixin'
import Role from '@/api/system/role'

export default {
    mixins: [pageMixin],
    methods: {
        addData() {
            Role.addData(this.formData).then(() => {
                this.getByPage()
            })
        },
        delData(row) {
            Role.delData(row).then(() => {
                this.getByPage()
            })
        },
        modData() {
            Role.modData(this.formData).then(() => {
                this.getByPage()
            })
        },
        getByPage() {
            Role.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.tableData = res.data.list
            })
        }
    },
    mounted() {
        this.getByPage()
    }
}
</script>

<style scoped>

</style>;
