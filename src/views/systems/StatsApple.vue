<template>
    <frame-space>
        <el-table :data='tableData' border stripe>
            <el-table-column :index='getIndex' align='center' label='序号' type='index' width='60'></el-table-column>
            <el-table-column align='center' label='年份' property='year' width='100'></el-table-column>
            <el-table-column align='center' label='月份' property='month' width='100'></el-table-column>
            <el-table-column align='center' label='用户数量' property='userCount' width='140'></el-table-column>
            <el-table-column align='center' label='租户数量' property='tenantCount' width='140'></el-table-column>
            <el-table-column align='center' label='文件数量' property='fileCount' width='140'></el-table-column>
            <el-table-column align='center' label='磁盘空间大小' property='totalSizeShow' width='200'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createCode' width='140'></el-table-column>

            <el-table-column align='center' label='操作' width='80'>
                <template v-slot='scope'>
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
                       hide-on-single-page
                       layout='total, sizes, prev, pager, next, jumper'
                       style='margin-top:10px'
                       @size-change='pageSizeChange'
                       @current-change='pageNumChange'>
        </el-pagination>
    </frame-space>
</template>

<script>
import Utils from '@/assets/js/utils'
import pageMixin from '@/mixin/form.mixin'
import Stats from '@/api/system/stats'

export default {
    mixins: [pageMixin],
    methods: {
        delData(row) {
            Stats.delData(row).then(() => {
                this.getData()
            })
        },
        getData() {
            Stats.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.tableData = res.data.list
                // 修改文件大小显示方式
                this.tableData.forEach(function(item, index, arr) {
                    arr[index].totalSizeShow = Utils.byteSwitch(item.totalSize)
                })
            })
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style scoped>

</style>
