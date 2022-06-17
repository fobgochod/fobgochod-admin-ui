<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filter' class='demo-form-inline' size='small'>
            <el-form-item v-if="userCode === 'admin'" label='用户' prop='userCode'>
                <el-input v-model='pageData.filter.eq.userCode' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='编号' prop='code'>
                <el-input v-model='pageData.filter.eq.code' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='名称' prop='name'>
                <el-input v-model='pageData.filter.like.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
            <el-form-item style='float:right'>
                <el-button icon='el-icon-plus' size='small' type='success' @click='opDialog("add")'>加药</el-button>
                <el-button icon='el-icon-first-aid-kit' size='small' type='danger' @click='eatMedicine'>吃药</el-button>
                <fo-drop-collection table='Medicin4e' :success='getByPage' />
            </el-form-item>
        </el-form>

        <el-table :data='tableData' border stripe @selection-change='selection'
                  @cell-dblclick='queryRecords'>
            <el-table-column :index='getIndex' align='center' label='序号' type='index' width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='用户' property='userCode' width='100'></el-table-column>
            <el-table-column label='编号' property='code' width='100'></el-table-column>
            <el-table-column label='名称' property='name' width='200'></el-table-column>
            <el-table-column label='片(盒)' property='slice' width='60'></el-table-column>
            <el-table-column label='总数' property='total' width='100'></el-table-column>
            <el-table-column label='剩余(天)' property='remain' width='100'></el-table-column>
            <el-table-column align='center' label='状态' width='60' v-slot='scope'>
                <el-switch v-model='scope.row.status' active-color='#ff4949' width='34'
                           @change='update(scope.row)'></el-switch>
            </el-table-column>
            <el-table-column label='备注' property='remark' width='300'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createCode' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyCode' width='140'></el-table-column>

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

        <el-dialog :title='opDialogTitle' :visible.sync='opDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='100px'>
                <el-row>
                    <el-col :span='6'>
                        <el-form-item label='编号'>
                            <el-input v-model='formData.code'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='18'>
                        <el-form-item label='名称'>
                            <el-input v-model='formData.name' placeholder='请输入药品名称'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='6'>
                        <el-form-item label='总数'>
                            <el-input v-model='formData.total'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label='片(盒)'>
                            <el-input v-model='formData.slice'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label='剩余(天)'>
                            <el-input v-model='formData.remain' disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label='用户'>
                            <el-input v-model='formData.userCode' :disabled="userCode !== 'admin'"></el-input>
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
                            <fo-data-infrastructure :id='itemFormData.medicineId' table='MedicineItem'
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
                    <template v-slot='scope'>
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
import MyMedicine from '@/api/medicine/my.medicine'
import Medicine from '@/api/medicine/medicine'
import MedicineItem from '@/api/medicine/medicine.item'
import {mapState} from 'vuex'

export default {
    mixins: [pageMixin],
    data() {
        return {
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
            medicineTotal: 0
        }
    },
    computed: mapState(['userCode']),
    components: {
        TimeType: () => import('@/views/medicines/sub/TimeType')
    },
    methods: {
        addDialog() {
            this.formData = {
                userCode: this.userCode
            }
        },
        addData() {
            Medicine.addData(this.formData).then(() => {
                this.getByPage()
            })
        },
        delData(row) {
            Medicine.delData(row).then(() => {
                this.getByPage()
            })
        },
        modData() {
            this.update(this.formData)
        },
        update(data) {
            Medicine.modData(data).then(() => {
                this.getByPage()
            })
        },
        getByPage() {
            Medicine.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.tableData = res.data.list
            })
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
            })
            this.addDialogVisible = false
        },
        delItemData(row) {
            MedicineItem.delData(row).then(() => {
                this.searchItemData()
            })
        },
        modItemData(row) {
            MedicineItem.modData(row).then(() => {
                this.itemFormData = {
                    medicineId: this.medicineId
                }
                this.searchItemData()
            })
        },
        searchItemData() {
            let itemPageData = {
                pageNum: 1,
                pageSize: 10,
                filter: {
                    eq: {
                        medicineId: this.medicineId
                    }
                },
                orders: {
                    start: 1
                }
            }
            MedicineItem.getByPage(itemPageData).then(res => {
                this.items = res.data.list
            })
        },
        queryRecords(row, column) {
            if (column.property === 'id') {
                this.addItemDialog(row)
            }
        },
        eatMedicine() {
            MyMedicine.eat(this.userCode).then(() => {
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
