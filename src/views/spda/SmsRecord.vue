<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.cond' class='demo-form-inline' size='small'>
            <el-form-item label='手机' prop='telephone'>
                <el-input v-model='pageData.cond.telephone' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='状态' prop='completed'>
                <el-select v-model='pageData.cond.status' @change='searchData'>
                    <el-option label='是' :value=true></el-option>
                    <el-option label='否' :value=false></el-option>
                </el-select>
            </el-form-item>
            <el-form-item label='发送日期' prop='sendDate'>
                <el-date-picker v-model='pageData.cond.sendDate0' type='daterange' value-format='yyyy-MM-dd'
                                range-separator='至' start-placeholder='开始日期' end-placeholder='结束日期'>
                </el-date-picker>
            </el-form-item>
            <el-form-item label='模板CODE' prop='templateCode'>
                <el-input v-model='pageData.cond.templateCode' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>
        <el-button icon='el-icon-phone' size='small' type='success' @click='testSms'>测试</el-button>
        <drop-collection table='MedicineRecord' :success='getByPage' />
        <el-table :data='realData' border max-height='520' stripe @selection-change='selection'>
            <el-table-column :index='getIndex' align='center' label='序号' type='index'
                             width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column align='center' label='手机' property='telephone' width='150'></el-table-column>
            <el-table-column align='center' label='状态' property='status' width='80'>
                <template slot-scope='scope'>
                    <el-checkbox v-model='scope.row.status'></el-checkbox>
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
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>
            <el-table-column align='center' fixed label='操作' width='80'>
                <template slot-scope='scope'>
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
                <el-form-item label='ID'>
                    <el-input v-model='formData.id' disabled></el-input>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='addData'> 确认新增</el-button>
            </span>
        </el-dialog>

        <el-dialog :title='modDialogTitle' :visible.sync='modDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='60px'>
                <el-form ref='form' :model='formData' label-width='60px'>
                    <el-form-item label='ID'>
                        <el-input v-model='formData.id' disabled></el-input>
                    </el-form-item>
                </el-form>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='modData'>确认修改</el-button>
            </span>
        </el-dialog>
    </frame-space>
</template>

<script>
import formMixin from '@/mixin/form.mixin'
import SmsRecord from '@/api/spda/sms.record'

export default {
    mixins: [formMixin],
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
        delData(row) {
            SmsRecord.delData(row.id).then(() => {
                this.getByPage()
                this.$message.success('删除' + row.type + '成功')
            }).catch(() => {
                this.$message.error('删除' + row.type + '失败')
            })
        },
        getByPage() {
            SmsRecord.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.realData = res.data.list
            }).catch(() => {
                this.$message.error('查询Medicine失败')
            })
        },
        searchData() {
            this.pageData.pageNum = 1
            let sendDate0 = this.pageData.cond.sendDate0
            if (sendDate0) {
                this.pageData.cond.between = {
                    key: 'sendDate',
                    begin: sendDate0[0] + ' 00:00:00',
                    end: sendDate0[1] + ' 23:59:59'
                }
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
