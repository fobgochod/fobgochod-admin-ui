<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.cond' class='demo-form-inline' size='small'>
            <el-form-item label='用户' prop='userId'>
                <el-input v-model='pageData.cond.userId' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='编号' prop='code'>
                <el-input v-model='pageData.cond.code' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='名称' prop='name'>
                <el-input v-model='pageData.cond.$name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>
        <el-button icon='el-icon-plus' size='small' type='success' @click='addDialog'>新增</el-button>
        <el-button icon='el-icon-first-aid-kit' size='small' type='danger' @click='eatMedicine'>吃药</el-button>
        <drop-collection table='Medicine' :success='getByPage' />
        <el-table :data='realData' border max-height='520' stripe @selection-change='selection'
                  @cell-dblclick='queryRecords'>
            <el-table-column :index='getIndex' align='center' label='序号' type='index'
                             width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='用户' property='userId' width='100'></el-table-column>
            <el-table-column label='编号' property='code' width='100'></el-table-column>
            <el-table-column label='名称' property='name' width='200'></el-table-column>
            <el-table-column label='总数' property='total' width='100'></el-table-column>
            <el-table-column label='早' property='morning' width='100'></el-table-column>
            <el-table-column label='中' property='noon' width='100'></el-table-column>
            <el-table-column label='晚' property='night' width='100'></el-table-column>
            <el-table-column label='剩余(天)' property='remain' width='100'></el-table-column>
            <el-table-column label='备注' property='remark' width='300'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>
            <el-table-column align='center' fixed label='操作' width='80'>
                <template slot-scope='scope'>
                    <el-button icon='el-icon-edit-outline' title='编辑' type='text' @click='modDialog(scope.row)'>
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

        <el-dialog :title='addDialogTitle' :visible.sync='addDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='100px'>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label='编号'>
                            <el-input v-model='formData.code'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='16'>
                        <el-form-item label='名称'>
                            <el-input v-model='formData.name' placeholder='请输入药品名称'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label='早'>
                            <el-input v-model='formData.morning'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='中'>
                            <el-input v-model='formData.noon'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='晚'>
                            <el-input v-model='formData.night'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label='总数'>
                            <el-input v-model='formData.total'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='剩余(天)'>
                            <el-input v-model='formData.remain' disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='用户'>
                            <el-input v-model='formData.userId'></el-input>
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
            <el-form ref='form' :model='formData' label-width='100px'>
                <el-row>
                    <el-col :span='16'>
                        <el-form-item label='名称'>
                            <el-input v-model='formData.name' placeholder='请输入药品名称'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='总数'>
                            <el-input v-model='formData.total'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label='早'>
                            <el-input v-model='formData.morning'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='中'>
                            <el-input v-model='formData.noon'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='晚'>
                            <el-input v-model='formData.night'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='16'>
                        <el-form-item label='备注'>
                            <el-input v-model='formData.remark'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='剩余(天)'>
                            <el-input v-model='formData.remain' disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='modData'>确认修改</el-button>
            </span>
        </el-dialog>

        <el-dialog :title='medicineRecordDialogTitle' :visible.sync='medicineRecordDialogVisible' center>
            <medicine-record :medicineId='medicineId' ref='file'></medicine-record>
        </el-dialog>
    </frame-space>
</template>

<script>
import pageMixin from '@/mixin/form.mixin'
import Medicine from '@/api/spda/medicine'
import MedicineRecord from '@/api/spda/medicine.record'

export default {
    mixins: [pageMixin],
    components: {
        MedicineRecord: () => import('@/views/spda/MedicineRecordSub.vue')
    },
    data() {
        return {
            formData: {
                userId: '',
                code: '',
                name: '',
                total: '',
                morning: '',
                noon: '',
                night: '',
                remain: '',
                remark: ''
            },
            medicineId: '',
            medicineRecordDialogVisible: false
        }
    },
    methods: {
        addData() {
            Medicine.addData(this.formData).then(() => {
                this.getByPage()
                this.$message.success('新增' + this.formData.name + '成功')
            }).catch(() => {
                this.$message.error('新增' + this.formData.name + '失败')
            })
            this.addDialogVisible = false
        },
        delData(row) {
            Medicine.delData(row.id).then(() => {
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
            Medicine.modData(data).then(() => {
                this.getByPage()
                this.$message.success('修改' + data.name + '成功')
            }).catch(() => {
                this.$message.error('修改' + data.name + '失败')
            })
        },
        getByPage() {
            Medicine.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.realData = res.data.list
                this.$message.success('查询Medicine成功')
            }).catch(() => {
                this.$message.error('查询Medicine失败')
            })
        },
        searchData() {
            this.pageData.pageNum = 1
            this.pageData.cond.like = {
                key: 'name',
                value: this.pageData.cond.$name
            }
            this.getByPage()
        },
        clearData(formName) {
            this.$refs[formName].resetFields()
            this.pageData.cond = {}
            this.searchData()
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
        queryRecords(row, column) {
            if (column.property === 'name') {
                this.medicineId = row.id
                this.medicineRecordDialogVisible = true
            }
        },
        eatMedicine() {
            MedicineRecord.eat('chentt').then(() => {
                this.searchData()
                this.$message.success('吃药成功')
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
