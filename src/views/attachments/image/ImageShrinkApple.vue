<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filter' class='demo-form-inline' size='small'>
            <el-form-item label='原文件ID' prop='fileId'>
                <el-input v-model='pageData.filter.eq.fileId' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='压缩文件ID' prop='shrinkId'>
                <el-input v-model='pageData.filter.eq.shrinkId' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>

        <el-table :data='tableData' border stripe @selection-change='selection'>
            <el-table-column :index='getIndex' align='center' label='序号' type='index' width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='原文件ID' property='fileId' width='150'></el-table-column>
            <el-table-column label='压缩文件ID' property='shrinkId' width='150'></el-table-column>
            <el-table-column label='宽' property='width' width='100' align='center'></el-table-column>
            <el-table-column label='高' property='height' width='100' align='center'></el-table-column>

            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createCode' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyCode' width='140'></el-table-column>

            <el-table-column align='center' fixed label='操作' width='80'>
                <template v-slot='scope'>
                    <el-popconfirm title='确定删除吗？' @confirm='delData(scope.row)'>
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
    methods: {
        delData(row) {
            ImageShrink.delData(row).then(() => {
                this.searchData()
            })
        },
        getByPage() {
            ImageShrink.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.tableData = res.data.list
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
