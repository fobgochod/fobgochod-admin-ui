<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filter' class='demo-form-inline' size='small'>
            <el-form-item label='分类' prop='type'>
                <el-input v-model='pageData.filter.like.type' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='手机' prop='telephone'>
                <el-input v-model='pageData.filter.eq.telephone' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='发送日期' prop='sendDate'>
                <el-date-picker v-model='pageData.filter.eq.sendDate0' type='daterange' value-format='yyyy-MM-dd'
                                range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期'>
                </el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
            <el-form-item style='float:right'>
                <el-popconfirm title='确定删除吗？' @confirm='batchDel'>
                    <el-button slot='reference' icon='el-icon-delete' size='small' style='margin-right: 10px;'>
                        删除
                    </el-button>
                </el-popconfirm>
                <el-button icon='el-icon-phone' size='small' type='success' @click='testSms'>测试</el-button>
                <fo-drop-collection table='SmsRecord' :success='getByPage' />
            </el-form-item>
        </el-form>
        <el-table :data='tableData' border stripe @selection-change='selection'>
            <el-table-column align='center' type='selection' width='40'></el-table-column>
            <el-table-column :index='getIndex' align='center' label='序号' type='index' width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='分类' property='type' width='120'></el-table-column>
            <el-table-column align='center' label='手机' property='telephone' width='150'></el-table-column>
            <el-table-column align='center' label='状态' property='status' width='80'>
                <template v-slot='scope'>
                    <el-checkbox v-model='scope.row.status' @change='update(scope.row)'></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column align='center' label='发送日期' property='sendDate' width='160'></el-table-column>
            <el-table-column label='签名' property='signName' width='100'></el-table-column>
            <el-table-column label='模板CODE' property='templateCode' width='140'></el-table-column>
            <el-table-column label='模板内容' property='templateParam' width='240'></el-table-column>
            <el-table-column align='center' label='验证码' property='captchaCode' width='80'></el-table-column>
            <el-table-column align='center' label='验证码过期时间' property='captchaExpire' width='160'></el-table-column>
            <el-table-column label='错误码' property='smsCode' width='160'></el-table-column>
            <el-table-column label='错误信息' property='smsMessage' width='240'></el-table-column>
            <el-table-column label='备注' property='remark' width='240'></el-table-column>
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
import formMixin from '@/mixin/form.mixin'
import SmsRecord from '@/api/system/sms.record'

export default {
    mixins: [formMixin],
    methods: {
        addData() {
            SmsRecord.addData(this.formData).then(() => {
                this.getByPage()
            })
        },
        delData(row) {
            SmsRecord.delData(row).then(() => {
                this.getByPage()
            })
        },
        modData() {
            this.update(this.formData)
        },
        update(data) {
            SmsRecord.modData(data).then(() => {
                this.getByPage()
            })
        },
        getByPage() {
            SmsRecord.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.tableData = res.data.list
            })
        },
        searchData() {
            this.pageData.pageNum = 1
            let sendDate0 = this.pageData.filter.eq.sendDate0
            if (sendDate0) {
                this.pageData.filter.between = {
                    key: 'sendDate',
                    begin: sendDate0[0] + ' 00:00:00',
                    end: sendDate0[1] + ' 23:59:59'
                }
            }
            this.getByPage()
        },
        batchDel() {
            if (this.selectionData.length === 0) {
                this.$message.error('请选择要操作的文件!')
                return
            }
            let body = {
                ids: this.selectionIds()
            }
            SmsRecord.batchDel(body).then(() => {
                this.searchData()
                this.$message.success('批量删除[' + this.selectionData.length + ']个')
            })
        },
        testSms() {
            SmsRecord.testSms().then(() => {
                this.getByPage()
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
