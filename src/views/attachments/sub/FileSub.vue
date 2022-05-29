<template>
    <div>
        <el-form ref='formCondData' :inline='true' :model='pageData.filters' class='demo-form-inline' size='small'>
            <el-form-item label='文件ID' prop='id'>
                <el-input v-model='pageData.filters.id' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='名称' prop='name'>
                <el-input v-model='pageData.filters.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='租户' prop='tenantId'>
                <el-input v-model='pageData.filters.tenantId' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='是否完成' prop='completed'>
                <el-select v-model='pageData.filters.completed' placeholder='请选择'>
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

            <el-button icon='el-icon-upload2' size='small' style='margin-left: 10px;' @click='batchUpload'>批量上传
            </el-button>
            <fo-file-upload-multi :directoryId='directoryId' :success='searchData'
                                  :batchVisible.sync='batchUploadVisible' />

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
        <el-table :data='realData' border max-height='520' stripe @selection-change='selection'
                  @cell-dblclick='dblClick'>
            <el-table-column type='selection' width='50'></el-table-column>
            <el-table-column :index='getIndex' align='center' label='序号' type='index' width='60'></el-table-column>
            <el-table-column label='文件ID' property='id' width='180'>
                <template v-slot='scope'>
                    <a :href='`${baseUri}/file/preview/${scope.row.id}`'
                       target='_blank'>{{ scope.row.id }}</a>
                </template>
            </el-table-column>
            <el-table-column label='名称' property='name' width='200'></el-table-column>
            <el-table-column label='显示名称' property='displayName' width='200'></el-table-column>
            <el-table-column label='标签' property='tag' width='160'></el-table-column>
            <el-table-column label='大小' property='sizeShow' width='100'></el-table-column>
            <el-table-column label='后缀名' property='extension' width='80'></el-table-column>
            <el-table-column label='扩展名' property='contentType' width='200'></el-table-column>
            <el-table-column align='center' label='完成' width='60'>
                <template v-slot='scope'>
                    <el-checkbox v-model='scope.row.completed'
                                 @change='checked=>completed(checked, scope.row)'></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column align='center' label='过期时间' property='expireDate' width='160'></el-table-column>
            <el-table-column label='目录ID' property='directoryId' width='180'></el-table-column>
            <el-table-column label='FileId' property='fileId' width='220'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>
            <el-table-column label='租户ID' property='tenantId' width='100'></el-table-column>

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
                        <el-form-item label='原始名称'>
                            <el-input v-model='formData.name' disabled></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='显示名称'>
                            <el-input v-model='formData.displayName'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='过期时间'>
                            <el-date-picker v-model='formData.expireDate' placeholder='选择日期时间' type='datetime'>
                            </el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='目录'>
                            <el-input v-model='formData.directoryId'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='6'>
                        <el-form-item label='租户'>
                            <el-input v-model='formData.tenantId'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='18'>
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
            formData: {
                name: '',
                displayName: '',
                expireDate: null
            },
            dialogUpload: false,
            batchUploadVisible: false,
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
            this.opDialogTitle = '修改（' + this.formData.name + '）'
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
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
        },
        completed(checked, data) {
            FileInfo.completed(data.id, checked).then(() => {
                this.getByPage()
            }).catch((err) => {
                this.$message.error(err.response.data.message)
                this.getByPage()
            })
        },
        getByPage() {
            FileInfo.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.realData = res.data.list
                // 修改文件大小显示方式
                this.realData.forEach(function(item, index, arr) {
                    arr[index].sizeShow = Utils.byteSwitch(item.size)
                    arr[index].complete = !item.completed
                })
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
        },
        getByDirectoryId() {
            this.pageData.filters.directoryId = this.directoryId
            this.searchData()
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
        batchUpload() {
            this.batchUploadVisible = true
        },
        delFileForce(row) {
            File.delFileForce(row.id).then(() => {
                this.getByPage()
                this.$message.success('删除' + row.name + '成功')
            }).catch(() => {
                this.$message.error('删除' + row.name + '失败')
            })
        },
        delFile(row) {
            File.delFile(row.id).then(() => {
                this.getByPage()
                this.$message.success('移' + row.name + '进回收站成功')
            }).catch(() => {
                this.$message.error('移' + row.name + '进回收站失败')
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
            let body = {
                fileIds: this.selectionIds()
            }
            File.batchDelFileForce(body).then(() => {
                this.searchData()
                this.$message.success('批量删除[' + this.selectionData.length + ']个文件成功')
            }).catch(() => {
                this.$message.error('批量删除' + this.selectionData.length + '个文件失败')
            })
        },
        batchDelFile() {
            if (this.selectionData.length === 0) {
                this.$message.error('请选择要操作的文件!')
                return
            }
            let body = {
                fileIds: this.selectionIds()
            }
            File.batchDelFile(body).then(() => {
                this.searchData()
                this.$message.success('批量删除[' + this.selectionData.length + ']个文件到回收站成功')
            }).catch(() => {
                this.$message.error('批量删除' + this.selectionData.length + '个文件到回收站失败')
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
