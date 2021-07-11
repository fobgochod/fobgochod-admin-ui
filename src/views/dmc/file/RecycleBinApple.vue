<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filters' class='demo-form-inline' size='small'>
            <el-form-item label='ID' prop='id'>
                <el-input v-model='pageData.filters.id' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='名称' prop='name'>
                <el-input v-model='pageData.filters.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='原位置' prop='paths'>
                <el-input v-model='pageData.filters.paths' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>

        <el-row>
            <el-button icon='el-icon-delete' size='small' style='margin-left: 10px;'
                       @click='batchRestore'>批量恢复
            </el-button>

            <el-popconfirm style='margin: 0 10px' title='确定清空回收站吗？' @onConfirm='emptyData'>
                <el-button slot='reference' icon='el-icon-refresh-right' size='small' type='danger'>清空</el-button>
            </el-popconfirm>
        </el-row>

        <el-table :data='realData' border max-height='520' stripe @selection-change='selection'>
            <el-table-column type='selection' width='50'></el-table-column>
            <el-table-column label='ID' property='id' width='200'></el-table-column>
            <el-table-column label='名称' property='name' width='200'></el-table-column>
            <el-table-column label='原位置' property='paths' width='300'></el-table-column>
            <el-table-column align='center' label='删除时间' property='deleteDate' width='160'></el-table-column>
            <el-table-column label='大小' property='sizeShow' width='100'></el-table-column>
            <el-table-column align='center' label='类型' property='contentType' width='100'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>
            <el-table-column label='租户ID' property='tenantId' width='100'></el-table-column>

            <el-table-column align='center' fixed label='操作' width='80'>
                <template slot-scope='scope'>
                    <el-button icon='el-icon-refresh-left' title='恢复' type='text'
                               @click='restore(scope.row)'>
                    </el-button>
                    <el-popconfirm title='确定删除吗？' @onConfirm='delData(scope.row)'>
                        <el-button slot='reference' icon='el-icon-delete' title='删除' type='text'></el-button>
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
    </frame-space>
</template>

<script>
import pageMixin from '@/mixin/form.mixin'
import RecycleBin from '@/api/file/file.recycle.bin'
import Utils from '@/assets/js/utils'

export default {
    mixins: [pageMixin],
    data() {
        return {
            formData: {
                id: '',
                name: '',
                paths: '',
                contentType: ''
            }
        }
    },
    methods: {
        getByPage() {
            RecycleBin.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.realData = res.data.list
                // 修改文件大小显示方式
                this.realData.forEach(function(item, index, arr) {
                    arr[index].sizeShow = Utils.byteSwitch(item.size)
                })
                this.$message.success('查询回收站成功')
            }).catch(() => {
                this.$message.error('查询回收站失败')
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
            this.$message.success('每页显示' + pageSize + '条数据 ' + '正在展示第' + this.pageData.pageNum + '页数据')
            this.getByPage()
        },
        pageNumChange(pageNum) {
            this.pageData.pageNum = pageNum
            this.$message.success('每页显示' + this.pageData.pageSize + '条数据 ' + '正在展示第' + pageNum + '页数据')
            this.getByPage()
        },
        delData(row) {
            RecycleBin.delData(row.id).then(() => {
                this.searchData()
                this.$message.success('删除' + row.name + '成功')
            }).catch(() => {
                this.$message.error('删除' + row.name + '失败')
            })
        },
        emptyData() {
            RecycleBin.emptyData().then(() => {
                this.getByPage()
                this.$message.success('清空回收站成功')
            }).catch(() => {
                this.$message.error('清空回收站失败')
            })
            this.addDialogVisible = false
        },
        restore(row) {
            RecycleBin.restore(row.id).then(() => {
                this.getByPage()
                this.$message.success('恢复' + row.name + '成功')
            }).catch(() => {
                this.$message.error('恢复' + row.name + '失败')
            })
        },
        batchRestore() {
            if (this.selectionData.length === 0) {
                this.$message.error('请选择要操作的文件!')
                return
            }
            let body = {
                recycleIds: this.selectionIds()
            }
            RecycleBin.batchRestore(body).then(() => {
                this.getByPage()
                this.$message.success('恢复' + this.selectionData.length + '个文件成功')
            }).catch(() => {
                this.$message.error('恢复' + this.selectionData.length + '个文件失败')
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
