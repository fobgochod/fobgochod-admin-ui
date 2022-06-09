<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filter' class='demo-form-inline' size='small'>
            <el-form-item label='ID' prop='id'>
                <el-input v-model='pageData.filter.eq.id' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='文件ID' prop='fileId'>
                <el-input v-model='pageData.filter.eq.fileId' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='文件名称' prop='fileName'>
                <el-input v-model='pageData.filter.like.fileName' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='原位置' prop='paths'>
                <el-input v-model='pageData.filter.like.paths' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>

        <el-row>
            <el-button icon='el-icon-delete' size='small' @click='batchRestoreBin'>批量恢复</el-button>

            <el-popconfirm style='margin-left: 10px' title='确定删除吗？' @confirm='batchDeleteBin'>
                <el-button slot='reference' icon='el-icon-delete' size='small' type='warning'>批量删除</el-button>
            </el-popconfirm>

            <el-popconfirm style='margin-left: 10px' title='确定清空回收站吗？' @confirm='emptyBin'>
                <el-button slot='reference' icon='el-icon-refresh-right' size='small' type='danger'>清空</el-button>
            </el-popconfirm>
        </el-row>

        <el-table :data='tableData' border max-height='520' stripe @selection-change='selection'>
            <el-table-column type='selection' width='50'></el-table-column>
            <el-table-column label='ID' property='id' width='200'></el-table-column>
            <el-table-column label='文件ID' property='fileId' width='200'></el-table-column>
            <el-table-column label='文件名称' property='fileName' width='200'></el-table-column>
            <el-table-column label='原位置' property='paths' width='300'></el-table-column>
            <el-table-column align='center' label='删除时间' property='deleteDate' width='160'></el-table-column>
            <el-table-column label='大小' property='sizeShow' width='100'></el-table-column>
            <el-table-column align='center' label='类型' property='type' width='100'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>
            <el-table-column label='租户ID' property='tenantId' width='100'></el-table-column>

            <el-table-column align='center' fixed label='操作' width='80'>
                <template v-slot='scope'>
                    <el-button icon='el-icon-refresh-left' title='恢复' type='text'
                               @click='restoreBin(scope.row)'>
                    </el-button>
                    <el-popconfirm title='确定删除吗？' @confirm='deleteBin(scope.row)'>
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
    methods: {
        getByPage() {
            RecycleBin.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.tableData = res.data.list
                // 修改文件大小显示方式
                this.tableData.forEach(function(item, index, arr) {
                    arr[index].sizeShow = Utils.byteSwitch(item.size)
                })
            })
        },
        deleteBin(row) {
            RecycleBin.deleteBin(row.id).then(() => {
                this.searchData()
            })
        },
        batchDeleteBin() {
            if (this.selectionData.length === 0) {
                this.$message.error('请选择要操作的文件!')
                return
            }
            RecycleBin.deleteBin(null, this.selectionIds()).then(() => {
                this.getByPage()
            })
        },
        restoreBin(row) {
            RecycleBin.restoreBin(row.id).then(() => {
                this.getByPage()
            })
        },
        batchRestoreBin() {
            if (this.selectionData.length === 0) {
                this.$message.error('请选择要操作的文件!')
                return
            }
            RecycleBin.restoreBin(null, this.selectionIds()).then(() => {
                this.getByPage()
            })
        },
        emptyBin() {
            RecycleBin.emptyBin().then(() => {
                this.getByPage()
            })
            this.addDialogVisible = false
        }
    },
    mounted() {
        this.getByPage()
    }
}
</script>

<style scoped>

</style>
