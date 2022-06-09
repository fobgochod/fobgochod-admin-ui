<template>
    <frame-space>
        <el-container style='height: 640px; border: 1px solid #eee'>
            <el-aside>
                <el-tree :data='treeData' :expand-on-click-node='false' default-expand-all highlight-current
                         icon-class='el-icon-menu' node-key='id' @node-click='nodeClick'>
                    <span slot-scope='{ node, data }' class='custom-tree-node'>
                        <span :title='data.name' style='max-width: 100px; overflow: hidden'>{{ data.name }}</span>
                        <span>
                            <el-button icon='el-icon-plus' type='text' @click='opDialog("add", data)' />
                            <span style='margin: 0 3px'></span>
                            <el-dropdown :disabled='data.parentId < 0'>
                                <span class='el-dropdown-link'>
                                    <i class='el-icon-more-outline el-icon--right'></i>
                                </span>
                                <el-dropdown-menu slot='dropdown'>
                                    <el-popconfirm icon-color='red' title='确定删除吗？' @confirm='delFileForce(data)'>
                                        <el-dropdown-item slot='reference' icon='el-icon-delete'>
                                            删除
                                        </el-dropdown-item>
                                    </el-popconfirm>
                                    <el-dropdown-item icon='el-icon-edit-outline' @click.native='opDialog("mod", data)'>
                                        编辑
                                    </el-dropdown-item>
                                    <el-dropdown-item icon='el-icon-edit-outline' @click.native='delData(data)'>
                                        回收站
                                    </el-dropdown-item>
                                    <fo-file-upload :directoryId='directoryId' :success='uploadSuccess'>
                                        <el-dropdown-item icon='el-icon-upload2'>
                                             点击上传
                                         </el-dropdown-item>
                                    </fo-file-upload>

                                    <fo-file-download directory :file='data' />
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


        <el-dialog :title='opDialogTitle' :visible.sync='opDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-form-item label='父ID'>
                    <el-input v-model='formData.parentId' disabled></el-input>
                </el-form-item>
                <el-form-item label='名称'>
                    <el-input v-model='formData.name'></el-input>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                 <el-button type='success' @click='opData(operation)'>保存</el-button>
            </span>
        </el-dialog>

    </frame-space>
</template>

<script>
import formMixin from '@/mixin/form.mixin'
import Utils from '@/assets/js/utils'
import File from '@/api/file/file'
import Dir from '@/api/file/dir.info'

export default {
    mixins: [formMixin],
    components: {
        FileSub: () => import('@/views/attachments/sub/FileSub.vue')
    },
    data() {
        return {
            treeData: [],
            directoryId: ''
        }
    },
    methods: {
        addDialog(row) {
            if (row) {
                this.formData = {
                    parentId: row.id
                }
            } else {
                this.formData = {
                    parentId: 0
                }
            }
        },
        addData() {
            Dir.addData(this.formData).then(() => {
                this.getData()
            })
        },
        delData(data) {
            File.delDir(data.id).then(() => {
                this.getData()
            })
        },
        modData() {
            Dir.modData(this.formData).then(() => {
                this.getData()
            })
        },
        getData() {
            Dir.getByPage({}).then(res => {
                this.treeData = Utils.dataToTree(res.data.list)
            })
        },
        nodeClick(data) {
            this.directoryId = data.id
        },
        uploadSuccess() {
            this.$refs.file.getByDirectoryId()
        },
        delFileForce(data) {
            File.delDirForce(data.id).then(() => {
                this.getData()
            })
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
