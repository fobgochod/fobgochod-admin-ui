<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.cond' class='demo-form-inline' size='small'>
            <el-form-item v-if="userId === 'admin'" label='用户' prop='userId'>
                <el-input v-model='pageData.cond.userId' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='Medicine' prop='medicineId'>
                <el-input v-model='pageData.cond.medicineId' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='类型' prop='type'>
                <time-type :type.sync='pageData.cond.type' :success='searchData' />
            </el-form-item>
            <el-form-item label='日期' prop='date'>
                <el-date-picker v-model='pageData.cond.date' type='date' value-format='yyyy-MM-dd'
                                @change='searchData'></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
            <el-form-item style='float:right'>
                <el-button icon='el-icon-plus' size='small' type='success' style='margin-right: 10px;'
                           @click='opDialog("add")'>买药
                </el-button>
                <el-popconfirm title='确定删除吗？' @confirm='batchDel'>
                    <el-button slot='reference' icon='el-icon-delete' size='small' style='margin-right: 10px;'>
                        删除
                    </el-button>
                </el-popconfirm>
                <el-button size='small' type='danger' @click='eatDialog'>补</el-button>
                <fo-drop-collection table='MedicineRecord' :success='getByPage' />
            </el-form-item>
        </el-form>
        <el-table :data='realData' border max-height='520' stripe @selection-change='selection'>
            <el-table-column align='center' type='selection' width='40'></el-table-column>
            <el-table-column :index='getIndex' align='center' label='序号' type='index' width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='用户' property='userId' width='100'></el-table-column>
            <el-table-column align='center' label='Medicine' property='medicineId' width='150'></el-table-column>
            <el-table-column align='center' label='类型' property='type' width='60'></el-table-column>
            <el-table-column label='片' property='slice' width='80'></el-table-column>
            <el-table-column align='center' label='日期' property='date' width='100'></el-table-column>
            <el-table-column align='center' label='时间' property='time' width='100'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>

            <el-table-column align='center' fixed='left' label='操作' width='50'>
                <template v-slot='scope'>
                    <el-dropdown>
                         <span class='el-dropdown-link'>
                             <i class='el-icon-s-operation el-icon--right'></i>
                         </span>
                        <el-dropdown-menu slot='dropdown'>
                            <el-dropdown-item icon='el-icon-plus' @click.native='opDialog("add",scope.row)'>
                                新增
                            </el-dropdown-item>
                            <el-popconfirm icon-color='red' title='确定删除吗？' @confirm='delData(scope.row)'>
                                <el-dropdown-item slot='reference' icon='el-icon-delete'>
                                    删除
                                </el-dropdown-item>
                            </el-popconfirm>
                            <el-dropdown-item icon='el-icon-edit-outline' @click.native='opDialog("mod",scope.row)'>
                                编辑
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

        <el-dialog :title='opDialogTitle' :visible.sync='opDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='60px'>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label='用户'>
                            <el-input v-model='formData.userId' :disabled="userId !== 'admin'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='药'>
                            <el-input v-model='formData.medicineId'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='类型'>
                            <time-type :type.sync='formData.type' />
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
                            <el-date-picker v-model='formData.date' type='date' style='width: 100%'
                                            value-format='yyyy-MM-dd'></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='时间'>
                            <el-time-picker v-model='formData.time' type='time' style='width: 100%'
                                            value-format='HH:mm:ss'></el-time-picker>
                        </el-form-item>
                    </el-col>

                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='opData(operation)'>保存</el-button>
            </span>
        </el-dialog>

        <el-dialog title='补吃药记录' :visible.sync='eatDialogVisible' center>
            <el-form ref='form' :model='eatForm' label-width='60px'>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='用户'>
                            <fo-user-option :option='eatForm.userId' :disabled="userId !== 'admin'"></fo-user-option>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='日期'>
                            <el-date-picker v-model='eatForm.date' type='date' style='width: 100%'
                                            value-format='yyyy-MM-dd'></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='eatMedicine'>确认</el-button>
            </span>
        </el-dialog>
    </frame-space>
</template>

<script>
import formMixin from '@/mixin/form.mixin'
import MyMedicine from '@/api/medicine/my.medicine'
import MedicineRecord from '@/api/medicine/medicine.record'
import {mapState} from 'vuex'

export default {
    mixins: [formMixin],
    props: ['medicineId'],
    data() {
        return {
            formData: {
                type: '',
                slice: '',
                time: ''
            },
            users: [],
            eatForm: {
                userId: '',
                date: ''
            },
            eatDialogVisible: false
        }
    },
    computed: mapState(['userId', 'userName']),
    components: {
        TimeType: () => import('@/views/medicines/sub/TimeType')
    },
    methods: {
        addDialog() {
            this.formData = {
                userId: this.userId
            }
        },
        addData() {
            MedicineRecord.addData(this.formData).then(() => {
                this.getByPage()
            })
        },
        delData(row) {
            MedicineRecord.delData(row.id).then(() => {
                this.getByPage()
            })
        },
        batchDel() {
            if (this.selectionData.length === 0) {
                this.$message.error('请选择要操作的文件!')
                return
            }
            let body = {
                ids: this.selectionIds()
            }
            MedicineRecord.batchDel(body).then(() => {
                this.searchData()
                this.$message.success('批量删除[' + this.selectionData.length + ']个')
            })
        },
        modDialog(row) {
            this.formData = row
            this.opDialogTitle = '修改（' + this.formData.type + '）'
        },
        modData() {
            this.update(this.formData)
        },
        update(data) {
            MedicineRecord.modData(data).then(() => {
                this.getByPage()
            })
        },
        getByPage() {
            MedicineRecord.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.realData = res.data.list
            })
        },
        getByMedicineId() {
            this.pageData.cond = {
                medicineId: this.medicineId
            }
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
        },
        eatDialog() {
            this.eatForm = {
                userId: this.userId,
                date: new Date().format('Y-m-d')
            }
            this.eatDialogVisible = true
        },
        eatMedicine() {
            MyMedicine.eat(this.eatForm.userId, this.eatForm.date).then(() => {
                this.searchData()
            })
            this.eatDialogVisible = false
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
