<template>
    <frame-space>
        <div>
            <el-button icon='el-icon-s-data' size='small' type='danger' @click='initData'>
                初始化数据
            </el-button>
            <el-button icon='el-icon-plus' size='small' type='success' @click='addDialog'>
                新增
            </el-button>
            <el-button icon='el-icon-refresh' size='small' type='info' @click='refreshTask'>
                刷新
            </el-button>
            <drop-collection table='Task' :success='getByPage' />

            <el-table :data='realData' border max-height='560' stripe @selection-change='selection'>
                <el-table-column label='ID' property='id' width='150'></el-table-column>
                <el-table-column label='编号' property='code' width='100'></el-table-column>
                <el-table-column label='标题' property='name' width='200'></el-table-column>
                <el-table-column label='类型' property='type' width='80'></el-table-column>
                <el-table-column align='center' label='cron表达式' property='cron' width='120'></el-table-column>
                <el-table-column label='bean' property='className' width='280'></el-table-column>
                <el-table-column align='center' label='禁用' width='60'>
                    <template slot-scope='scope'>
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
                    <template slot-scope='scope'>
                        <el-button icon='el-icon-edit-outline' title='编辑' type='text' @click='modDialog(scope.row)'>
                        </el-button>
                        <el-popconfirm title='确定删除吗？' @onConfirm='delData(scope.row)'>
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
        </div>

        <el-dialog :title='addDialogTitle' :visible.sync='addDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='标题'>
                            <el-input v-model='formData.name'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='编号'>
                            <el-input v-model='formData.code'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='类型'>
                            <el-input v-model='formData.type'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='实现类'>
                            <el-input v-model='formData.className'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='cron'>
                            <el-input v-model='formData.cron'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='禁用'>
                            <el-switch v-model='formData.disable' active-color='#ff4949'></el-switch>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label='备注'>
                    <el-input v-model='formData.remark'></el-input>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='addData'> 确认新增</el-button>
            </span>
        </el-dialog>

        <el-dialog :title='modDialogTitle' :visible.sync='modDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='标题'>
                            <el-input v-model='formData.name'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='实现类'>
                            <el-input v-model='formData.className'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='cron'>
                            <el-input v-model='formData.cron'></el-input>
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
                <el-button type='success' @click='modData'>确认修改</el-button>
            </span>
        </el-dialog>
    </frame-space>
</template>

<script>
import pageMixin from '@/mixin/form.mixin'
import {TASKS} from '@/assets/js/dmc.data'
import Task from '@/api/system/task'

export default {
    mixins: [pageMixin],
    data() {
        return {
            formData: {
                code: '',
                name: '',
                type: '',
                cron: '',
                className: '',
                disable: false,
                remark: '',
                hash: 0
            },
            cronPopover: false
        }
    },
    methods: {
        addData() {
            Task.addData(this.formData).then(() => {
                this.getByPage()
                this.$message.success('新增' + this.formData.name + '成功')
            }).catch(() => {
                this.$message.error('新增' + this.formData.name + '失败')
            })
            this.addDialogVisible = false
        },
        delData(row) {
            Task.delData(row.id).then(() => {
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
        disableData(data) {
            this.update(data)
        },
        update(data) {
            Task.modData(data).then(() => {
                this.getByPage()
                this.$message.success('修改' + data.name + '成功')
            }).catch(() => {
                this.$message.error('修改' + data.name + '失败')
            })
        },
        getByPage() {
            this.pageData.orders = {code: 1}
            Task.getByPage(this.pageData).then(res => {
                this.realDataCache = res.data.list
                this.pageData.total = this.realDataCache.length
                this.pageHandler()
                this.$message.success('查询策略成功')
            }).catch(() => {
                this.$message.error('查询策略失败')
            })
        },
        run(row) {
            Task.doTask(row.id).then(() => {
                this.$message.success('执行任务成功')
            }).catch(() => {
                this.$message.error('执行任务失败')
            })
        },
        initData() {
            let count = 0
            for (let task of TASKS) {
                Task.addData(task).then(() => {
                    count++
                    if (count === 6) {
                        this.getByPage()
                    }
                })
            }
        },
        refreshTask() {
            Task.refreshTask().then(() => {
                this.getByPage()
                this.$message.success('重启成功')
            }).catch(() => {
                this.$message.error('重启失败')
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
