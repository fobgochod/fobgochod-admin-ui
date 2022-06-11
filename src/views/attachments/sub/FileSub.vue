<template>
    <div>
        <el-form ref='formCondData' :inline='true' :model='pageData.filter' class='demo-form-inline' size='small'>
            <el-form-item label='文件ID' prop='id'>
                <el-input v-model='pageData.filter.eq.id' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='名称' prop='name'>
                <el-input v-model='pageData.filter.like.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='租户' prop='tenantId'>
                <el-input v-model='pageData.filter.eq.tenantId' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='是否完成' prop='completed'>
                <el-select v-model='pageData.filter.eq.completed' @change='searchData'>
                    <el-option label='是' :value=true></el-option>
                    <el-option label='否' :value=false></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>
        <el-row>
            <el-button :disabled='selectionButtonState' icon='el-icon-finished' size='small'
                       type='danger' @click='consoleSelection'>
                {{ selectionButtonTitle }}
            </el-button>

            <fo-file-upload-stream :directoryId='directoryId' :success='searchData'>
                <el-button icon='el-icon-upload2' size='small' type='info' style='margin-left: 10px'>上传V1</el-button>
            </fo-file-upload-stream>

            <fo-file-upload :directoryId='directoryId' :success='searchData'>
                <el-button icon='el-icon-upload2' size='small' style='margin-left: 10px'>上传</el-button>
            </fo-file-upload>

            <fo-file-upload-multi :directoryId='directoryId' :success='searchData' />

            <fo-file-download-multi :fileIds='selectionIds' :success='searchData' />

            <el-popconfirm title='确定删除吗？' @confirm='batchDelFileForce'>
                <el-button slot='reference' icon='el-icon-delete' size='small' style='margin-left: 10px;'>
                    批量删除
                </el-button>
            </el-popconfirm>

            <el-button icon='el-icon-takeaway-box' size='small' style='margin-left: 10px;'
                       @click='batchDelFile'>批量回收站
            </el-button>

            <fo-drop-collection table='FileInfo' :success='getByPage' />
        </el-row>
        <el-table :data='tableData' border max-height='520' stripe @selection-change='selection'
                  @cell-dblclick='dblClick'>
            <el-table-column type='selection' width='50'></el-table-column>
            <el-table-column :index='getIndex' align='center' label='序号' type='index' width='60'></el-table-column>
            <el-table-column label='文件ID' property='id' width='150'>
                <template v-slot='scope'>
                    <a :href='`${baseUri}/file/preview?fileId=${scope.row.id}`'
                       target='_blank'>{{ scope.row.id }}</a>
                </template>
            </el-table-column>
            <el-table-column label='名称' property='name' width='200'></el-table-column>
            <el-table-column label='标签' property='tag' width='160'></el-table-column>
            <el-table-column label='大小' property='sizeShow' width='100'></el-table-column>
            <el-table-column label='宽' property='width' width='100'></el-table-column>
            <el-table-column label='高' property='height' width='100'></el-table-column>
            <el-table-column label='后缀名' property='suffix' width='80'></el-table-column>
            <el-table-column label='扩展名' property='mediaType' width='200'></el-table-column>
            <el-table-column align='center' label='完成' width='60'>
                <template v-slot='scope'>
                    <el-checkbox v-model='scope.row.completed'
                                 @change='checked=>completed(checked, scope.row)'></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column label='目录ID' property='directoryId' width='160'></el-table-column>
            <el-table-column label='FileId' property='fileId' width='230'></el-table-column>
            <el-table-column label='租户ID' property='tenantId' width='100'></el-table-column>
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
                            <el-popconfirm icon-color='red' title='确定删除吗？' @confirm='delFileForce(scope.row)'>
                                <el-dropdown-item slot='reference' icon='el-icon-delete'>
                                    删除
                                </el-dropdown-item>
                            </el-popconfirm>
                            <el-dropdown-item icon='el-icon-edit-outline' @click.native='opDialog("mod",scope.row)'>
                                编辑
                            </el-dropdown-item>
                            <el-dropdown-item icon='el-icon-takeaway-box' @click.native='delFile(scope.row)'>
                                回收站
                            </el-dropdown-item>

                            <fo-file-download :file='scope.row' :success='searchData' />
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
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='名称'>
                            <el-input v-model='formData.name'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='目录'>
                            <el-input v-model='formData.directoryId'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label='租户'>
                            <fo-tenant-option :option.sync='formData.tenantId' />
                        </el-form-item>
                    </el-col>
                    <el-col :span='16'>
                        <el-form-item label='标签'>
                            <el-tag :key='tag' v-for='tag in dynamicTags'
                                    closable :disable-transitions='false'
                                    @close='tagClose(tag)'>
                                {{ tag }}
                            </el-tag>
                            <el-input class='input-new-tag'
                                      v-if='tagInputVisible'
                                      v-model='tagInputValue'
                                      ref='saveTagInput'
                                      size='small'
                                      @keyup.enter.native='tagInputConfirm'
                                      @blur='tagInputConfirm'>
                            </el-input>
                            <el-button v-else class='button-new-tag' size='small' @click='tagInput'>+ New Tag
                            </el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                 <el-button type='success' @click='opData(operation)'>保存</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import formMixin from '@/mixin/form.mixin'
import '@/assets/js/date.format'
import Utils from '@/assets/js/utils'
import File from '@/api/file/file'
import FileInfo from '@/api/file/file.info'

export default {
    mixins: [formMixin],
    props: ['directoryId'],
    data() {
        return {
            dialogUpload: false,
            dynamicTags: [],
            tagInputVisible: false,
            tagInputValue: ''
        }
    },
    computed: mapState(['baseUri']),
    methods: {
        tagClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },
        tagInput() {
            this.tagInputVisible = true
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        tagInputConfirm() {
            let inputValue = this.tagInputValue
            if (inputValue) {
                this.dynamicTags.push(inputValue)
            }
            this.tagInputVisible = false
            this.tagInputValue = ''
        },
        modDialog(row) {
            if (row.tag) {
                this.dynamicTags = row.tag.split(';')
            } else {
                this.dynamicTags = []
            }
            this.formData = row
        },
        modData() {
            if (this.dynamicTags.length > 0) {
                this.formData.tag = this.dynamicTags.join(';')
            } else {
                this.formData.tag = null
            }
            this.formData.expireDate = Utils.dateToStr(this.formData.expireDate)
            FileInfo.modData(this.formData).then(() => {
                this.getByPage()
            })
        },
        completed(checked, data) {
            FileInfo.modData(data).then(() => {
                this.getByPage()
            })
        },
        getByPage() {
            FileInfo.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.tableData = res.data.list
                // 修改文件大小显示方式
                this.tableData.forEach(function(item, index, arr) {
                    arr[index].sizeShow = Utils.byteSwitch(item.size)
                    arr[index].complete = !item.completed
                })
            })
        },
        getByDirectoryId() {
            this.pageData.filter.eq.directoryId = this.directoryId
            this.searchData()
        },
        delFileForce(row) {
            File.delFileForce(row.id).then(() => {
                this.getByPage()
            })
        },
        delFile(row) {
            File.delFile(row.id).then(() => {
                this.getByPage()
            })
        },
        getFileInfo(file) {
            this.formData = {}
            this.formData.name = file.name
            this.formData.displayName = null
            this.formData.description = null
            return encodeURIComponent(JSON.stringify(this.formData))
        },
        batchDelFileForce() {
            if (this.selectionData.length === 0) {
                this.$message.error('请选择要操作的文件!')
                return
            }
            File.delFileForce(null, this.selectionIds()).then(() => {
                this.searchData()
            })
        },
        batchDelFile() {
            if (this.selectionData.length === 0) {
                this.$message.error('请选择要操作的文件!')
                return
            }
            File.delFile(null, this.selectionIds()).then(() => {
                this.searchData()
                this.$message.success('批量删除[' + this.selectionData.length + ']个文件到回收站成功')
            })
        },
        dblClick(row, column) {
            if (column.property === 'id') {
                let url = this.baseUri + '/api/dmc/v2/file/' + this.bucket + '/preview/' + row[column.property]
                this.$message.success(url)
            }
        }
    },
    watch: {
        directoryId: function() {
            this.getByDirectoryId()
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

.inline-block {
    display: inline-block;
}

.el-tag + .el-tag {
    margin-left: 10px;
}

.button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
}

.input-new-tag {
    width: 90px;
    margin-left: 10px;
    vertical-align: bottom;
}
</style>
