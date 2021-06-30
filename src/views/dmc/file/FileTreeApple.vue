<template>
    <frame-space>
        <el-row :gutter='20'>
            <el-button icon='el-icon-folder-add' size='small' style='margin-left: 10px;'
                       @click='addDirDialog'>新建文件夹
            </el-button>

            <file-upload :directoryId='directoryId' :success='uploadSuccess'>
                <el-button icon='el-icon-upload2' size='small' style='margin-left: 10px'>上传</el-button>
            </file-upload>

            <el-button icon='el-icon-upload2' size='small' style='margin-left: 10px;' @click='batchUpload'>批量上传
            </el-button>
            <multi-file-upload :directoryId='directoryId' :success='uploadSuccess'
                               :batchVisible.sync='batchUploadVisible' />
        </el-row>
        <el-card shadow='hover'>
            <div slot='header' class='clearfix'>
                <el-breadcrumb separator-class='el-icon-arrow-right'>
                    <el-breadcrumb-item>
                        <span @click='clickPath(rootDir)'>全部文件</span>
                    </el-breadcrumb-item>
                    <el-breadcrumb-item v-for='(dir,index) in paths' :key='index'>
                        <span @click='clickPath(dir.id,index)'>{{dir.name}}</span>
                    </el-breadcrumb-item>
                </el-breadcrumb>
                <div style='height: 10px'></div>
                <span style='font-size: 14px;'>{{dirSize}} 个文件夹，{{fileSize}} 个文件</span>
                <i class='el-icon-refresh' style='font-size: 14px; float: right' @click='getDirInfo(directoryId)'></i>
            </div>
            <el-table :data='realData' show-header='false' highlight-current-row @cell-click='clickFile'>
                <el-table-column label='文件名称' property='name'>
                    <template slot-scope='scope'>
                        <span></span>
                        <i class='el-icon-document' v-if="scope.row.type==='File'"></i>
                        <i class='el-icon-folder' v-else></i>
                        <span style='margin-left: 10px'>{{scope.row.name}}</span>
                    </template>
                </el-table-column>

                <el-table-column align='right' label='操作' width='100'>
                    <template slot-scope='scope'>
                        <el-button icon='el-icon-edit-outline' title='编辑' type='text' @click='modDialog(scope.row)'
                                   v-if="scope.row.type==='File'">
                        </el-button>

                        <file-download-button :file='scope.row'></file-download-button>

                        <el-button icon='el-icon-delete' title='删除' type='text' @click='delFile(scope.row)'>
                        </el-button>
                    </template>
                </el-table-column>

                <el-table-column label='过期时间' property='expireDate' width='180'></el-table-column>
                <el-table-column label='大小' property='size' width='100'></el-table-column>
                <el-table-column label='修改人' property='modifyById' width='140'></el-table-column>
                <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
                <el-table-column label='租户ID' property='tenantId' width='100'></el-table-column>
            </el-table>
        </el-card>

        <el-dialog :title='addDirTitle' :visible.sync='addDirVisible' center width='450px'>
            <el-form ref='form' :model='formData' label-width='60px'>
                <el-form-item label='名称'>
                    <el-input v-model='formData.name'></el-input>
                </el-form-item>
                <el-form-item label='描述'>
                    <el-input v-model='formData.displayName'></el-input>
                </el-form-item>
                <el-form-item label='父ID'>
                    <el-input v-model='formData.parentId' disabled></el-input>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='addDir'> 确认新增</el-button>
            </span>
        </el-dialog>

        <el-dialog :title='modFileTitle' :visible.sync='modFileVisible' width='400px'>
            <el-form ref='form' :model='fileData'>
                <el-form-item>
                    <el-row :gutter='10'>
                        <el-col :span='20'>
                            <el-input v-model='fileData.name'></el-input>
                        </el-col>
                        <el-col :span='4'><span>.{{fileData.extension}}</span></el-col>
                    </el-row>
                </el-form-item>
            </el-form>
            <div slot='footer' class='dialog-footer'>
                <el-button @click='modFileVisible = false'>取 消</el-button>
                <el-button type='primary' @click='changeName'>确 定</el-button>
            </div>
        </el-dialog>
    </frame-space>
</template>

<script>
import formMixin from '@/mixin/form.mixin'
import Dir from '@/api/file/directory'
import Utils from '@/assets/js/utils'
import FileDownload from '@/api/file/file.download'
import FileInfo from '@/api/file/file.info'
import File from '@/api/file/file'

export default {
    mixins: [formMixin],
    components: {
        FileUpload: () => import('@/components/comm/FileUpload'),
        MultiFileUpload: () => import('@/components/comm/FileUploadMulti'),
        FileDownloadButton: () => import('@/components/comm/FileDownloadButton')
    },
    data() {
        return {
            dirSize: 0,
            fileSize: 0,
            paths: [],
            rootDir: '00000000-0000-0000-0000-000000000000',
            directoryId: '00000000-0000-0000-0000-000000000000',
            formData: {},
            addDirTitle: '新建文件夹',
            addDirVisible: false,

            fileData: {},
            modFileTitle: '重命名',
            modFileVisible: false,

            batchUploadVisible: false
        }
    },
    methods: {
        modDialog(row) {
            let len = row.name.lastIndexOf('.')
            this.fileData = {
                fileId: row.id,
                name: row.name.slice(0, len),
                extension: row.extension
            }
            this.modFileVisible = true
        },
        changeName() {
            let fileName = this.fileData.name + '.' + this.fileData.extension
            FileInfo.changeName(this.fileData.fileId, fileName)
            .then(() => {
                this.getDirInfo(this.directoryId)
                this.$message.success('修改' + this.fileData.name + '成功')
            })
            .catch(() => {
                this.$message.error('修改' + this.fileData.name + '失败')
            })
            this.modFileVisible = false
        },
        delFile(row) {
            if (row.type === 'File') {
                File.delFile(row.id).then(() => {
                    this.getDirInfo(this.directoryId)
                    this.$message.success('移' + row.name + '进回收站成功')
                }).catch(() => {
                    this.$message.error('移' + row.name + '进回收站失败')
                })
            } else {
                let body = {
                    dirId: row.id
                }
                File.batchDelFile(body).then(() => {
                    this.getDirInfo(this.directoryId)
                    this.$message.success('删除' + row.name + '成功')
                }).catch(() => {
                    this.$message.error('删除' + row.name + '失败')
                })
            }
        },
        addDirDialog() {
            this.formData = {}
            this.formData.parentId = this.directoryId
            this.addDirVisible = true
        },
        addDir() {
            Dir.addData(this.formData).then(() => {
                this.getDirInfo(this.directoryId)
                this.$message.success('新增' + this.formData.name + '成功')
            }).catch(() => {
                this.$message.error('新增' + this.formData.name + '失败')
            })
            this.addDirVisible = false
        },
        uploadSuccess() {
            this.getDirInfo(this.directoryId)
        },
        batchUpload() {
            this.batchUploadVisible = true
        },
        clickFile(row, column) {
            if (column.property === 'name') {
                if (row.type === 'File') {
                    window.open(FileDownload.previewUrl(row.id), '_blank')
                } else {
                    this.directoryId = row.id
                    this.paths.push(row)
                    this.getDirInfo(row.id)
                }
            }
        },
        clickPath(dirId, index) {
            if (this.directoryId !== dirId) {
                if (this.rootDir === dirId) {
                    this.paths = []
                } else {
                    let len = this.paths.length - index - 1
                    while (len) {
                        this.paths.pop()
                        len--
                    }
                }
                this.directoryId = dirId
                this.getDirInfo(this.directoryId)
            }
        },
        getDirInfo(dirId) {
            this.realData = []
            Dir.getDirInfo(dirId).then(res => {
                let files = res.data.fileInfos
                let dirs = res.data.dirInfos
                this.fileSize = files.length
                this.dirSize = dirs.length
                this.realData.push.apply(this.realData, dirs.map(v => ({
                    type: 'Directory',
                    id: v.id,
                    name: v.name,
                    displayName: v.displayName,
                    size: 0,
                    createDate: v.createDate,
                    createById: v.createById,
                    modifyDate: v.modifyDate,
                    modifyById: v.modifyById,
                    tenantId: v.tenantId
                })))
                this.realData.push.apply(this.realData, files.map(v => ({
                    type: 'File',
                    id: v.id,
                    name: v.fileName,
                    displayName: v.displayName,
                    extension: v.extension,
                    expireDate: v.expireDate,
                    size: Utils.byteSwitch(v.size),
                    createDate: v.createDate,
                    createById: v.createById,
                    modifyDate: v.modifyDate,
                    modifyById: v.modifyById,
                    tenantId: v.tenantId
                })))
            }).catch(() => {
                this.$message.success('查询分享记录失败')
            })
        }
    },
    mounted() {
        this.getDirInfo(this.rootDir)
    }
}
</script>

<style scoped>
.inline-block {
    display: inline-block;
}

.el-table .warning-row {
    background: oldlace;
}

.el-table .success-row {
    background: #f0f9eb;
}
</style>
