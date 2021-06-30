<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filters' class='demo-form-inline' size='small'>
            <el-form-item label='原文件ID' prop='sourceId'>
                <el-input v-model='pageData.filters.targetId' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='压缩文件ID' prop='sourceId'>
                <el-input v-model='pageData.filters.targetId' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>

        <el-table :data='realData' border max-height='520' stripe @selection-change='selection'>
            <el-table-column :index='getIndex' align='center' label='序号' type='index' width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='320'></el-table-column>
            <el-table-column label='原文件ID' property='sourceId' width='320'></el-table-column>
            <el-table-column label='压缩文件ID' property='targetId' width='320'></el-table-column>
            <el-table-column label='宽' property='property.width' width='100' align='center'></el-table-column>
            <el-table-column label='高' property='property.height' width='100' align='center'></el-table-column>

            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>
            <el-table-column label='租户' property='tenant' width='100'></el-table-column>
            <el-table-column align='center' label='Bucket' property='bucket' width='120'></el-table-column>

            <el-table-column align='center' fixed label='操作' width='80'>
                <template slot-scope='scope'>
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
import ImageShrink from '@/api/image/image.shrink'

export default {
    mixins: [pageMixin],
    data() {
        return {}
    },
    methods: {
        delData(row) {
            ImageShrink.delData(row.id).then(() => {
                this.searchData()
                this.$message.success('删除' + row.id + '成功')
            }).catch(() => {
                this.$message.error('删除' + row.id + '失败')
            })
        },
        getByPage() {
            ImageShrink.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.data.total
                this.realData = res.data.data.list
                this.$message.success('查询图片压缩站成功')
            }).catch(() => {
                this.$message.error('查询图片压缩站失败')
            })
        },
        searchData() {
            this.pageData.pageNum = 1
            this.getByPage()
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
    mounted() {
        this.getByPage()
    }
}
</script>

<style scoped>

</style>
