<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filters' class='demo-form-inline' size='small'>
            <el-form-item label='ID' prop='id'>
                <el-input v-model='pageData.filters.id' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='分享者' prop='userName'>
                <el-input v-model='pageData.filters.userName' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='文件名称' prop='fileName'>
                <el-input v-model='pageData.filters.fileName' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-button :disabled='selectionButtonState' icon='el-icon-finished' size='small' type='danger'
                       @click='consoleSelection'>
                {{ selectionButtonTitle }}
            </el-button>
            <el-popconfirm title='确定删除吗？' @onConfirm='batchDelSharedFile'>
                <el-button slot='reference' icon='el-icon-delete' size='small' style='margin-left: 10px;'
                           type='primary'>
                    批量删除
                </el-button>
            </el-popconfirm>
            <drop-collection table='Share' :success='getByPage' />
        </el-row>
        <el-table :data='realData' border max-height='520' stripe @selection-change='selection'>
            <el-table-column type='selection' width='50'></el-table-column>
            <el-table-column :index='getIndex' align='center' label='序号' type='index' width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='类型' property='type' width='80' align='center'></el-table-column>
            <el-table-column label='分享者ID' property='userId' width='150'></el-table-column>
            <el-table-column label='分享者' property='userName' width='120'></el-table-column>
            <el-table-column label='文件ID' property='fileId' width='180'></el-table-column>
            <el-table-column label='文件名称' property='fileName' width='180'></el-table-column>
            <el-table-column label='分享地址' property='url' width='500'>
                <template slot-scope='scope'>
                    <a :href='scope.row.url' target='_blank'>{{ scope.row.url }}</a>
                </template>
            </el-table-column>
            <el-table-column align='center' label='分享给所有人' width='160'>
                <template slot-scope='scope'>
                    <el-radio-group v-model='scope.row.pubic' disabled>
                        <el-radio :label='true'>是</el-radio>
                        <el-radio :label='false'>否</el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
            <el-table-column align='center' label='是否有时限' width='160'>
                <template slot-scope='scope'>
                    <el-radio-group v-model='scope.row.expired' disabled>
                        <el-radio :label='true'>是</el-radio>
                        <el-radio :label='false'>否</el-radio>
                    </el-radio-group>
                </template>
            </el-table-column>
            <el-table-column label='过期时间' property='expireDate' width='180'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>
            <el-table-column label='租户ID' property='tenantId' width='100'></el-table-column>
            <el-table-column align='center' label='Bucket' property='bucket' width='120'></el-table-column>

            <el-table-column align='center' fixed label='操作' width='80'>
                <template slot-scope='scope'>
                    <el-button icon='el-icon-edit-outline' title='编辑' type='text'
                               @click='modDialog(scope.row)'>
                    </el-button>
                    <el-popconfirm title='确定删除吗？' @onConfirm='delData(scope.row)'>
                        <el-button slot='reference' icon='el-icon-delete' title='删除' type='text'>
                        </el-button>
                    </el-popconfirm>
                    <el-button icon='el-icon-download' title='下载' type='text'
                               @click='download(scope.row)'>
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


        <el-dialog :title='modDialogTitle' :visible.sync='modDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='100px'>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='分享者'>
                            <el-input v-model='formData.userName'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='文件名称'>
                            <el-input v-model='formData.fileName'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label='分享地址'>
                    <el-input v-model='formData.url' disabled></el-input>
                </el-form-item>
                <el-form-item label='分享给所有人'>
                    <el-switch v-model='formData.pubic' active-color='#ff4949'></el-switch>
                </el-form-item>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label='是否有时限'>
                            <el-switch v-model='formData.expired' active-color='#ff4949'></el-switch>
                        </el-form-item>
                    </el-col>
                    <el-col :span='16'>
                        <el-form-item label='过期时间(天)'>
                            <el-date-picker v-model='formData.expireDate' placeholder='选择日期时间' type='datetime'>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='modData'>确认修改</el-button>
            </span>
        </el-dialog>
    </frame-space>
</template>

<script>
import formMixin from '@/mixin/form.mixin'
import FileShare from '@/api/file/file.share'

export default {
    mixins: [formMixin],
    data() {
        return {
            formData: {
                userName: '',
                fileName: '',
                url: '',
                pubic: null,
                expired: null,
                expireDate: ''
            }
        }
    },
    methods: {
        delData(row) {
            FileShare.delData(row.id).then(() => {
                this.getByPage()
                this.$message.success('删除' + row.fileName + '成功')
            }).catch(() => {
                this.$message.error('删除' + row.fileName + '失败')
            })
        },
        modDialog(row) {
            this.formData = row
            this.modDialogTitle = '修改（' + this.formData.fileName + '）'
            this.modDialogVisible = true
        },
        modData() {
            let expireDate = this.formData.expireDate
            if (expireDate && expireDate instanceof Date) {
                this.formData.expireDate = expireDate.format('Y-m-d H:i:s')
            }
            this.update(this.formData)
            this.modDialogVisible = false
        },
        update(data) {
            FileShare.modData(data).then(() => {
                this.getByPage()
                this.$message.warning('修改' + data.fileName + '成功')
            }).catch(() => {
                this.$message.warning('修改' + data.fileName + '失败')
            })
        },
        getByPage() {
            FileShare.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.realData = res.data.list
                this.$message.success('查询分享记录成功')
            }).catch(() => {
                this.$message.success('查询分享记录失败')
            })
        },
        searchData() {
            this.pageData.pageNum = 1
            this.getByPage()
        },
        clearData(formName) {
            this.$refs[formName].resetFields()
            this.searchData()
            this.pageData.filters = {}
        },
        pageSizeChange(pageSize) {
            this.pageData.pageNum = 1
            this.pageData.pageSize = pageSize
            this.$message.success('每页显示' + pageSize + '条数据\n' + '正在展示第' + this.pageData.pageNum + '页数据')
            this.getByPage()
        },
        pageNumChange(pageNum) {
            this.pageData.pageNum = pageNum
            this.$message.success('每页显示' + this.pageData.pageSize + '条数据\n' + '正在展示第' + pageNum + '页数据')
            this.getByPage()
        },
        batchDelSharedFile() {
            if (this.selectionData.length === 0) {
                this.$message.error('请选择要操作的文件!')
                return
            }
            this.batchData.shareIds = this.selectionIds()
            FileShare.batchDelData(this.batchData).then(() => {
                this.searchData()
                this.$message.success('批量删除[' + this.selectionData.length + ']个文件分享成功')
            }).catch(() => {
                this.$message.error('批量删除' + this.selectionData.length + '个文件分享失败')
            })
        },
        download(row) {
            this.download0(row).then((res) => {
                const blob = new Blob([res.data])
                const href = window.URL.createObjectURL(blob)
                const el = document.createElement('a')
                el.href = href
                el.download = row.fileName
                document.body.appendChild(el)
                el.click()
                document.body.removeChild(el)
                window.URL.revokeObjectURL(href)

                this.$message.success('下载成功')
            }).catch(() => {
                this.$message.error('下载失败')
            })
        },
        download0(data) {
            return this.$axios({
                method: 'get',
                url: data.url,
                responseType: 'blob'
            })
        }
    },
    mounted() {
        this.getByPage()
    }
}
</script>

<style scoped>
a {
    color: #606266;
    text-decoration: none;
}
</style>
