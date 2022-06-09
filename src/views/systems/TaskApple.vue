<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filter' class='demo-form-inline' size='small'>
            <el-form-item label='编号' prop='code'>
                <el-input v-model='pageData.filter.like.code' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='标题' prop='name'>
                <el-input v-model='pageData.filter.like.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>

        <el-button icon='el-icon-plus' size='small' type='success' @click='opDialog("add")'>
            新增
        </el-button>
        <el-button icon='el-icon-refresh' size='small' type='info' @click='refreshTask'>
            刷新
        </el-button>
        <fo-data-infrastructure table='Task' :success='getByPage' />
        <fo-drop-collection table='Task' :success='getByPage' />

        <el-table :data='tableData' border max-height='560' stripe @selection-change='selection'>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='编号' property='code' width='100'></el-table-column>
            <el-table-column label='标题' property='name' width='200'></el-table-column>
            <el-table-column label='类型' property='type' width='80'></el-table-column>
            <el-table-column align='center' label='cron表达式' property='cron' width='140'></el-table-column>
            <el-table-column label='bean' property='className' width='280'></el-table-column>
            <el-table-column align='center' label='禁用' width='62'>
                <template v-slot='scope'>
                    <el-switch v-model='scope.row.disable' active-color='#ff4949'
                               @change='disableData(scope.row)'></el-switch>
                </template>
            </el-table-column>
            <el-table-column align='center' label='Lock' property='hash' width='60'></el-table-column>
            <el-table-column label='备注' property='remark' width='200'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>

            <el-table-column align='center' fixed label='操作' width='80'>
                <template v-slot='scope'>
                    <el-button icon='el-icon-edit-outline' title='编辑' type='text' @click='opDialog("mod",scope.row)'>
                    </el-button>
                    <el-popconfirm title='确定删除吗？' @confirm='delData(scope.row)'>
                        <el-button slot='reference' icon='el-icon-delete' title='删除' type='text'>
                        </el-button>
                    </el-popconfirm>

                    <el-button icon='el-icon-video-play' title='立即执行' type='text' @click='run(scope.row)'>
                    </el-button>
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
                        <el-form-item label='标题'>
                            <el-input v-model='formData.name'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label='编号'>
                            <el-input v-model='formData.code' :disabled="operation !== 'add'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label='cron'>
                            <el-input v-model='formData.cron'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='实现类'>
                            <el-input v-model='formData.className'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label='禁用'>
                            <el-switch v-model='formData.disable' active-color='#ff4949'></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label='Lock'>
                            <el-input v-model='formData.hash'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label='备注'>
                    <el-input v-model='formData.remark'></el-input>
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
import Task from '@/api/system/task'

export default {
    mixins: [pageMixin],
    methods: {
        addData() {
            Task.addData(this.formData).then(() => {
                this.getByPage()
            })
        },
        delData(row) {
            Task.delData(row).then(() => {
                this.getByPage()
            })
        },
        modData() {
            this.update(this.formData)
        },
        disableData(data) {
            this.update(data)
        },
        update(data) {
            Task.modData(data).then(() => {
                this.getByPage()
            })
        },
        getByPage() {
            Task.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.tableData = res.data.list
            })
        },
        run(row) {
            Task.doTask(row.id).then(() => {
                this.$message.success('执行任务成功')
            })
        },
        refreshTask() {
            Task.refreshTask().then(() => {
                this.getByPage()
                this.$message.success('重启成功')
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
