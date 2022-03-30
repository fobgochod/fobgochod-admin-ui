<template>
    <div>
        <el-form ref='formCondData' :inline='true' :model='pageData.cond' class='demo-form-inline' size='small'>
            <el-form-item label='Medicine' prop='medicineId'>
                <el-input v-model='pageData.cond.medicineId' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='类型' prop='type'>
                <el-select v-model='pageData.cond.type' @change='searchData'>
                    <el-option key='1' label='早晨' value='早晨'></el-option>
                    <el-option key='2' label='中午' value='中午'></el-option>
                    <el-option key='3' label='晚上' value='晚上'></el-option>
                    <el-option key='4' label='买入' value='买入'></el-option>
                    <el-option key='5' label='卖出' value='卖出'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='日期' prop='date'>
                <el-date-picker v-model='pageData.cond.date' type='date' value-format='yyyy-MM-dd'
                                @change='searchData'></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>
        <el-button icon='el-icon-plus' size='small' type='success' @click='addDialog'>新增</el-button>
        <drop-collection table='MedicineRecord' :success='getByPage' />
        <el-table :data='realData' border max-height='520' stripe @selection-change='selection'>
            <el-table-column :index='getIndex' align='center' label='序号' type='index'
                             width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column align='center' label='Medicine' property='medicineId' width='150'></el-table-column>
            <el-table-column label='类型' property='type' width='100'></el-table-column>
            <el-table-column label='片' property='slice' width='80'></el-table-column>
            <el-table-column align='center' label='日期' property='date' width='100'></el-table-column>
            <el-table-column align='center' label='时间' property='time' width='100'></el-table-column>
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
            <el-form ref='form' :model='formData' label-width='60px'>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label='ID'>
                            <el-input v-model='formData.id' disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='药'>
                            <el-input v-model='formData.medicineId'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='类型'>
                            <el-select v-model='formData.type' placeholder='请选择'>
                                <el-option key='1' label='早晨' value='早晨'></el-option>
                                <el-option key='2' label='中午' value='中午'></el-option>
                                <el-option key='3' label='晚上' value='晚上'></el-option>
                                <el-option key='4' label='买入' value='买入'></el-option>
                                <el-option key='5' label='卖出' value='卖出'></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label='片'>
                            <el-input v-model='formData.slice'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='日期'>
                            <el-date-picker v-model='formData.date' type='date'
                                            value-format='yyyy-MM-dd'></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='时间'>
                            <el-time-picker v-model='formData.time' type='time'
                                            value-format='HH:mm:ss'></el-time-picker>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='addData'> 确认新增</el-button>
            </span>
        </el-dialog>

        <el-dialog :title='modDialogTitle' :visible.sync='modDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='60px'>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label='ID'>
                            <el-input v-model='formData.id' disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='药'>
                            <el-input v-model='formData.medicineId'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='类型'>
                            <el-select v-model='formData.type' placeholder='请选择'>
                                <el-option key='1' label='早晨' value='早晨'></el-option>
                                <el-option key='2' label='中午' value='中午'></el-option>
                                <el-option key='3' label='晚上' value='晚上'></el-option>
                                <el-option key='4' label='买入' value='买入'></el-option>
                                <el-option key='5' label='卖出' value='卖出'></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label='片'>
                            <el-input v-model='formData.slice'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='日期'>
                            <el-date-picker v-model='formData.date' type='date'
                                            value-format='yyyy-MM-dd'></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='时间'>
                            <el-time-picker v-model='formData.time' type='time'
                                            value-format='HH:mm:ss'></el-time-picker>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='modData'>确认修改</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import formMixin from '@/mixin/form.mixin'
import MedicineRecord from '@/api/spda/medicine.record'

export default {
    mixins: [formMixin],
    props: ['medicineId'],
    data() {
        return {
            formData: {
                type: '',
                slice: '',
                time: ''
            }
        }
    },
    methods: {
        addData() {
            MedicineRecord.addData(this.formData).then(() => {
                this.getByPage()
                this.$message.success('新增' + this.formData.type + '成功')
            }).catch(() => {
                this.$message.error('新增' + this.formData.type + '失败')
            })
            this.addDialogVisible = false
        },
        delData(row) {
            MedicineRecord.delData(row.id).then(() => {
                this.getByPage()
                this.$message.success('删除' + row.type + '成功')
            }).catch(() => {
                this.$message.error('删除' + row.type + '失败')
            })
        },
        modDialog(row) {
            this.formData = row
            this.modDialogTitle = '修改（' + this.formData.type + '）'
            this.modDialogVisible = true
        },
        modData() {
            this.update(this.formData)
            this.modDialogVisible = false
        },
        update(data) {
            MedicineRecord.modData(data).then(() => {
                this.getByPage()
                this.$message.success('修改' + data.type + '成功')
            }).catch(() => {
                this.$message.error('修改' + data.type + '失败')
            })
        },
        getByPage() {
            MedicineRecord.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.realData = res.data.list
                this.$message.success('查询Medicine成功')
            }).catch(() => {
                this.$message.error('查询Medicine失败')
            })
        },
        getByMedicineId() {
            this.pageData.cond.medicineId = this.medicineId
            this.searchData()
        },
        searchData() {
            this.pageData.pageNum = 1
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
        }
    },
    watch: {
        medicineId: function() {
            this.getByMedicineId()
        }
    },
    mounted() {
        this.getByMedicineId()
    }
}
</script>

<style scoped>

</style>
