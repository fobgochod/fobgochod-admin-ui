import {mapState} from 'vuex'

export default {
    data() {
        return {
            formData: {},
            tableData: [],
            pageData: {
                pageNum: 1,
                pageSize: 10,
                filter: {
                    eq: {},
                    like: {}
                },
                orders: {
                    createDate: -1
                },
                total: 0
            },
            batchData: {
                fileId: null,
                fileIds: [],
                dirId: null,
                dirIds: [],
                shareIds: [],
                recycleIds: [],
                expireDate: null
            },
            operation: 'add',
            opDialogTitle: '',
            opDialogVisible: false,
            selectionButtonTitle: '未选择数据',
            selectionButtonState: true,
            selectionData: []
        }
    },
    computed: {
        ...mapState(['baseUri', 'userCode'])
    },
    methods: {
        opDialog(op, row) {
            this.operation = op
            if (op === 'add') {
                this.opDialogTitle = '新增数据'
                this.addDialog(row)
            } else if (op === 'mod') {
                this.opDialogTitle = '修改（' + row.name + '）'
                this.modDialog(row)
            }
            this.opDialogVisible = true
        },
        addDialog(row) {
            this.formData = {}
        },
        modDialog(row) {
            this.formData = row
        },

        opData(op, data) {
            if (op === 'add') {
                this.addData()
            } else if (op === 'mod') {
                this.modData()
            } else if (op === 'del') {
                this.delData(data)
            }
            this.opDialogVisible = false
        },
        addData() {
            console.log('调用API新增数据')
        },
        delData(row) {
            console.log('调用API删除数据' + row)
        },
        modData() {
            console.log('调用API修改数据')
        },
        getByPage() {
            console.log('调用API分页查询数据')
        },
        searchData() {
            this.pageData.pageNum = 1
            this.getByPage()
        },
        clearData(formRef) {
            this.$refs[formRef].resetFields()
            this.pageData.filter = {
                eq: {},
                like: {}
            }
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
        getIndex(index) {
            // (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1
            return (this.pageData.pageNum - 1) * this.pageData.pageSize + index + 1
        },
        selection(selectData) {
            if (selectData.length > 0 && this.tableData.length !== selectData.length) {
                this.selectionButtonTitle = '已选择' + selectData.length
                this.selectionButtonState = false
                this.selectionData = selectData
            } else if (this.tableData.length === selectData.length) {
                this.selectionButtonTitle = '已全选'
                this.selectionButtonState = false
                this.selectionData = selectData
            } else {
                this.selectionButtonTitle = '未选择数据'
                this.selectionButtonState = true
            }
        },
        selectionIds() {
            let ids = []
            this.selectionData.forEach(function(item, index) {
                ids[index] = item.id
            })
            return ids
        }
    }
}
