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
            <el-form-item style='float:right'>
                <el-button icon='el-icon-first-aid-kit' size='small' type='danger' @click='eatMedicine'>吃药</el-button>
                <drop-collection table='Medicine' :success='getByPage' />
            </el-form-item>
        </el-form>

        <el-table :data='realData' border max-height='520' stripe @selection-change='selection'
                  @cell-dblclick='queryRecords'>
            <el-table-column :index='getIndex' align='center' label='序号' type='index' width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='用户' property='userId' width='100'></el-table-column>
            <el-table-column label='编号' property='code' width='100'></el-table-column>
            <el-table-column label='名称' property='name' width='200'></el-table-column>
            <el-table-column label='总数' property='total' width='100'></el-table-column>
            <el-table-column label='剩余(天)' property='remain' width='100'></el-table-column>
            <el-table-column align='center' label='状态' width='60' v-slot='scope'>
                <el-switch v-model='scope.row.status' active-color='#ff4949' width='34'
                           @change='update(scope.row)'></el-switch>
            </el-table-column>
            <el-table-column label='备注' property='remark' width='300'></el-table-column>
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
                            <el-dropdown-item icon='el-icon-plus' @click.native='addDialog'>
                                新增
                            </el-dropdown-item>
                            <el-popconfirm icon-color='red' title='确定删除吗？' @confirm='delData(scope.row)'>
                                <el-dropdown-item slot='reference' icon='el-icon-delete'>
                                    删除
                                </el-dropdown-item>
                            </el-popconfirm>
                            <el-dropdown-item icon='el-icon-edit-outline' @click.native='modDialog(scope.row)'>
                                编辑
                            </el-dropdown-item>
                            <el-dropdown-item icon='el-icon-plus' @click.native='addItemDialog(scope.row)'>
                                新增明细
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
                <el-button type='success' @click='modData'>确认修改</el-button>
            </span>
        </el-dialog>

        <el-dialog title='吃药记录' :visible.sync='medicineRecordDialogVisible' center>
            <medicine-record :medicineId='medicineId' ref='file'></medicine-record>
        </el-dialog>

        <el-dialog :title='addItemDialogTitle' :visible.sync='addItemDialogVisible' center>
            <el-form ref='form' :model='itemFormData' label-width='60px'>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='名称'>
                            <el-input v-model='medicineName' disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label='总数'>
                            <el-input v-model='medicineTotal' disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='4'>
                        <el-form-item>
                            <el-button type='primary' @click='saveItemData'>
                                保存
                            </el-button>
                        </el-form-item>
                    </el-col>
                    <el-col :span='2'>
                        <el-form-item style='float:right'>
                            <data-infrastructure :id='itemFormData.medicineId' table='MedicineItem'
                                                 :success='searchItemData' />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='6'>
                        <el-form-item label='类型'>
                            <time-type :type.sync='itemFormData.type' />
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label='开始'>
                            <el-time-picker v-model='itemFormData.start' type='time' style='width: 100%'
                                            value-format='HH:mm:ss'></el-time-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label='结束'>
                            <el-time-picker v-model='itemFormData.end' type='time' style='width: 100%'
                                            value-format='HH:mm:ss'></el-time-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label='片'>
                            <el-input v-model='itemFormData.slice'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>

            <el-table :data='items' border max-height='400'>
                <el-table-column align='center' label='序号' type='index' width='60'></el-table-column>
                <el-table-column align='center' label='类型' property='type'></el-table-column>
                <el-table-column align='center' label='开始' property='start'></el-table-column>
                <el-table-column align='center' label='结束' property='end'></el-table-column>
                <el-table-column label='片' property='slice'></el-table-column>
                <el-table-column align='center' label='添加时间' property='createDate' width='160'></el-table-column>
                <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
                <el-table-column align='center' label='操作' property='operation' width='140'>
                    <template slot-scope='scope'>
                        <el-button type='text' @click='modItemDialog(scope.row)'>
                            修改
                        </el-button>
                        <el-button type='text' @click='delItemData(scope.row)'>
                            移除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>
    </frame-space>
</template>

<script>
import pageMixin from '@/mixin/form.mixin'
import Medicine from '@/api/spda/medicine'
import MedicineRecord from '@/api/spda/medicine.record'
import MedicineItem from '@/api/spda/medicine.item'
import {mapState} from 'vuex'

export default {
    mixins: [pageMixin],
    data() {
        return {
            formData: {
                userId: '',
                code: '',
                name: '',
                total: '',
                remain: '',
                remark: ''
            },
            itemFormData: {
                medicineId: '',
                type: '',
                start: null,
                end: null,
                slice: 0
            },
            addItemDialogTitle: '',
            addItemDialogVisible: false,
            items: [],
            medicineId: '',
            medicineName: '',
            medicineTotal: 0,
            medicineRecordDialogVisible: false
        }
    },
    computed: mapState(['userId']),
    components: {
        TimeType: () => import('@/views/spda/sub/TimeType'),
        MedicineRecord: () => import('@/views/spda/MedicineRecordSub.vue')
    },
    methods: {
        addData() {
            Medicine.addData(this.formData).then(() => {
                this.getByPage()
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
            this.addDialogVisible = false
        },
        delData(row) {
            Medicine.delData(row.id).then(() => {
                this.getByPage()
            }).catch((err) => {
                this.$message.error(err.response.data.message)
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
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
        },
        getByPage() {
            Medicine.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.realData = res.data.list
            }).catch((err) => {
                this.$message.error(err.response.data.message)
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
        addItemDialog(row) {
            this.medicineId = row.id
            this.medicineName = row.name
            this.medicineTotal = row.total
            this.searchItemData()
            this.itemFormData = {
                medicineId: this.medicineId
            }
            this.addItemDialogTitle = this.medicineName
            this.addItemDialogVisible = true
        },
        modItemDialog(row) {
            this.itemFormData = row
        },
        saveItemData() {
            if (this.itemFormData.id) {
                this.modItemData(this.itemFormData)
            } else {
                this.addItemData(this.itemFormData)
            }
        },
        addItemData(row) {
            MedicineItem.addData(row).then(() => {
                this.itemFormData = {
                    medicineId: this.medicineId
                }
                this.searchItemData()
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
            this.addDialogVisible = false
        },
        delItemData(row) {
            MedicineItem.delData(row.id).then(() => {
                this.searchItemData()
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
        },
        modItemData(row) {
            MedicineItem.modData(row).then(() => {
                this.itemFormData = {
                    medicineId: this.medicineId
                }
                this.searchItemData()
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
        },
        searchItemData() {
            let itemPageData = {
                pageNum: 1,
                pageSize: 10,
                cond: {
                    medicineId: this.medicineId
                },
                orders: {
                    start: 1
                }
            }
            MedicineItem.getByPage(itemPageData).then(res => {
                this.items = res.data.list
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
        },
        queryRecords(row, column) {
            if (column.property === 'name') {
                this.medicineId = row.id
                this.medicineRecordDialogVisible = true
            } else if (column.property === 'id') {
                this.addItemDialog(row)
            }
        },
        eatMedicine() {
            MedicineRecord.eat(this.userId).then(() => {
                this.searchData()
                this.$message.success('吃药成功')
            }).catch((err) => {
                this.$message.error(err.response.data.message)
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
