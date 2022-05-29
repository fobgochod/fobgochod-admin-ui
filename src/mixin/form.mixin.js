import {mapState} from 'vuex'

export default {
    data() {
        return {
            formData: {},
            conditionData: {},
            realDataCache: [],
            realData: [],
            pageData: {
                cond: {},
                filters: {},
                pageNum: 1,
                pageSize: 10,
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
            addDialogTitle: '新增数据',
            addDialogVisible: false,
            modDialogTitle: '修改数据',
            modDialogVisible: false,
            selectionButtonTitle: '未选择数据',
            selectionButtonState: true,
            selectionData: []
        }
    },
    computed: {
        ...mapState(['baseUri', 'userId'])
    },
    methods: {
        opDialog(op, data) {
            this.operation = op
            if (op === 'add') {
                this.opDialogTitle = '新增数据'
                this.addDialog(data)
            } else if (op === 'mod') {
                this.opDialogTitle = '修改数据'
                this.modDialog(data)
            }
            this.opDialogVisible = true
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

        addDialog(row) {
            this.formData = {}
            this.addDialogVisible = true
        },
        addData() {
            console.log('调用API新增数据')
            this.addDialogVisible = false
        },
        delData(row) {
            console.log('调用API删除数据' + row)
        },
        modDialog(row) {
            this.formData = row
            this.modDialogVisible = true
        },
        modData() {
            console.log('调用API修改数据')
            this.modDialogVisible = false
        },
        getData() {
            console.log('调用API查询数据')
        },
        getIndex(index) {
            // (当前页 - 1) * 当前显示数据条数 + 当前行数据的索引 + 1
            return (this.pageData.pageNum - 1) * this.pageData.pageSize + index + 1
        },
        pageHandler() {
            let startRow = this.pageData.pageNum > 0 ? (this.pageData.pageNum - 1) * this.pageData.pageSize : 0
            let endRow = startRow + this.pageData.pageSize * (this.pageData.pageNum > 0 ? 1 : 0)

            let tempData = []
            for (let index = startRow; index < endRow; index++) {
                let temp = this.realDataCache[index]
                if (temp == null) {
                    break
                }
                tempData[index] = temp
            }
            this.realData = tempData
        },
        pageSizeChange(pageSize) {
            this.pageData.pageSize = pageSize
            this.$message.success('每页显示' + pageSize + '条数据')
            this.pageHandler()
        },
        pageNumChange(pageNum) {
            this.pageData.pageNum = pageNum
            this.$message.success('正在展示第' + pageNum + '页数据')
            this.pageHandler()
        },
        selection(selectData) {
            if (selectData.length > 0 && this.realData.length !== selectData.length) {
                this.selectionButtonTitle = '已选择' + selectData.length
                this.selectionButtonState = false
                this.selectionData = selectData
            } else if (this.realData.length === selectData.length) {
                this.selectionButtonTitle = '已全选'
                this.selectionButtonState = false
                this.selectionData = selectData
            } else {
                this.selectionButtonTitle = '未选择数据'
                this.selectionButtonState = true
            }
        },
        consoleSelection() {
            this.$message.success('打印选择数据成功，请按F12打开Console查看')
            console.log(this.selectionData)
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
