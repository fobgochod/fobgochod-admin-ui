<template>
    <frame-space>
        <el-container style='height: 640px; border: 1px solid #eee'>
            <el-aside>
                <el-tree :data='treeData' :expand-on-click-node='false' default-expand-all highlight-current
                         icon-class='el-icon-menu' node-key='id' @node-click='nodeClick'>
                    <span slot-scope='{ node, data }' class='custom-tree-node'>
                        <span :title='node.label' style='max-width: 100px; overflow: hidden'>{{node.label}}</span>
                        <span>
                            <el-button :style="{display: (data.parentId === '0' ? '' : 'none')}"
                                       icon='el-icon-plus' type='text'
                                       @click='addChildDir(data)'>添加目录</el-button>
                            <span style='margin: 0 3px'></span>
                            <el-dropdown :style="{display: (data.parentId === '0' ? 'none' : '')}">
                                <span class='el-dropdown-link'>
                                    <i class='el-icon-plus el-icon--right'></i>
                                </span>
                                <el-dropdown-menu slot='dropdown'>
                                    <el-dropdown-item icon='el-icon-plus' @click.native='addBrotherDir(data)'>
                                        兄弟节点
                                    </el-dropdown-item>
                                    <el-dropdown-item icon='el-icon-folder-add'
                                                      @click.native='addChildDir(data)'>
                                        子节点
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                            <span style='margin: 0 3px'></span>
                            <el-dropdown :style="{display: (data.parentId === '0' ? 'none' : '')}">
                                <span class='el-dropdown-link'>
                                    <i class='el-icon-more-outline el-icon--right'></i>
                                </span>
                                <el-dropdown-menu slot='dropdown'>
                                    <el-dropdown-item icon='el-icon-edit-outline'
                                                      @click.native='delData(data)'>
                                        删除
                                    </el-dropdown-item>
                                    <el-popconfirm icon-color='red' title='确定删除吗？' @onConfirm='delFileForce(data)'>
                                        <el-dropdown-item slot='reference' icon='el-icon-delete'>
                                            永久删除
                                        </el-dropdown-item>
                                    </el-popconfirm>
                                    <el-dropdown-item icon='el-icon-edit-outline'
                                                      @click.native='modDialog(data)'>
                                        修改目录
                                    </el-dropdown-item>
                                    <file-upload :directoryId='directoryId' :success='uploadSuccess'>
                                        <el-dropdown-item icon='el-icon-upload2'>
                                             点击上传
                                         </el-dropdown-item>
                                    </file-upload>

                                    <file-download directory :file='data' />

                                    <el-dropdown-item icon='el-icon-share'
                                                      @click.native='batchShare(data)'>
                                        分享
                                    </el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </span>
                    </span>
                </el-tree>
            </el-aside>
            <el-main>
                <file-sub :directoryId='directoryId' ref='file'></file-sub>
            </el-main>
        </el-container>


        <el-dialog :title='addDialogTitle' :visible.sync='addDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
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
                <el-button type='success' @click='addData'> 确认新增</el-button>
            </span>
        </el-dialog>

        <el-dialog :title='modDialogTitle' :visible.sync='modDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-form-item label='名称'>
                    <el-input v-model='formData.name'></el-input>
                </el-form-item>
                <el-form-item label='描述'>
                    <el-input v-model='formData.displayName'></el-input>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='modData'>确认修改</el-button>
            </span>
        </el-dialog>

        <el-dialog :title='batchShareDialogTitle' :visible.sync='batchShareDialogVisible' center width='400px'>
            <el-form ref='form' label-width='80px'>
                <el-form-item label='分享时间'>
                    <el-date-picker v-model='batchData.expireDate' placeholder='选择日期时间' type='datetime'>
                    </el-date-picker>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='batchShareFile'>确认分享</el-button>
            </span>
        </el-dialog>
    </frame-space>
</template>

<script>
import formMixin from '@/mixin/form.mixin'
import Utils from '@/assets/js/utils'
import File from '@/api/file/file'
import Dir from '@/api/file/directory'

export default {
    mixins: [formMixin],
    components: {
        FileSub: () => import('@/views/dmc/file/sub/FileSub.vue'),
        FileUpload: () => import('@/components/comm/FileUpload.vue'),
        FileDownload: () => import('@/components/comm/FileDownload')
    },
    data() {
        return {
            showButton: 'display: none',
            treeData: [],
            formData: {
                id: '',
                name: '',
                displayName: '',
                parentId: ''
            },
            directoryId: '',
            batchShareDialogVisible: false,
            batchShareDialogTitle: '批量分享文件'
        }
    },
    methods: {
        addChildDir(data) {
            this.formData = {}
            this.formData.parentId = data.id
            this.addDialogTitle = '新增子目录'
            this.addDialogVisible = true
        },
        addBrotherDir(data) {
            this.formData = {}
            this.formData.parentId = data.parentId
            this.addDialogTitle = '新增同级目录'
            this.addDialogVisible = true
        },
        addData() {
            Dir.addData(this.formData).then(() => {
                this.getData()
                this.$message.success('新增' + this.formData.name + '成功')
            }).catch(() => {
                this.$message.error('新增' + this.formData.name + '失败')
            })
            this.addDialogVisible = false
        },
        delData(data) {
            let body = {
                dirId: data.id
            }
            File.batchDelFile(body).then(() => {
                this.getData()
                this.$message.success('删除' + data.label + '成功')
            }).catch(() => {
                this.$message.error('删除' + data.label + '失败')
            })
        },
        modDialog(data) {
            this.formData = data.readData
            this.modDialogTitle = '修改（' + this.formData.name + '）'
            this.modDialogVisible = true
        },
        modData() {
            this.update(this.formData)
            this.modDialogVisible = false
        },
        update(data) {
            Dir.modData(data).then(() => {
                this.getData()
                this.$message.success('修改' + data.name + '成功')
            }).catch(() => {
                this.$message.error('修改' + data.name + '失败')
            })
        },
        getData() {
            Dir.getData().then(res => {
                this.treeData = Utils.dataToTree(res.data.data)
                this.$message.success('查询目录成功')
            }).catch(() => {
                this.$message.success('查询目录失败')
            })
        },
        nodeClick(data) {
            this.directoryId = data.id
        },
        uploadSuccess() {
            this.$refs.file.getByDirectoryId()
        },
        delFileForce(data) {
            let body = {
                dirId: data.id
            }
            File.batchDelFileForce(body).then(() => {
                this.getData()
                this.$message.success('删除' + data.name + '成功')
            }).catch(() => {
                this.$message.error('删除' + data.name + '失败')
            })
        },
        batchShare(data) {
            this.formData = data.readData
            this.batchData.dirId = data.id
            this.batchShareDialogVisible = true
        },
        batchShareFile() {
            this.batchData.expireDate = Utils.dateToStr(this.batchData.expireDate)
            File.shareFile(this.batchData).then(() => {
                this.$message.success('分享' + this.formData.name + '目录成功')
            }).catch(() => {
                this.$message.error('分享' + this.formData.name + '目录失败')
            })
            this.batchShareDialogVisible = false
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style scoped>
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    padding-right: 8px;
}
</style>
