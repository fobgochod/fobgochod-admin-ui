<template>
    <frame-space>
        <el-button icon='el-icon-plus' size='medium' type='primary' @click='opDialog("add")'>新增
        </el-button>
        <fo-data-infrastructure table='Menu' :success='getMenu' />
        <fo-drop-collection table='Menu' :success='getMenu' />
        <el-table :data='realData' style='width: 100%;margin-bottom: 20px;'
                  row-key='id' border stripe
                  :tree-props="{children: 'children', hasChildren: 'hasChildren'}">
            <el-table-column label='菜单' property='name' width='130'>
                <template v-slot='scope'>
                    <span>{{ scope.row.name }}</span>
                    <span v-if='scope.row.children.length > 0'>({{ scope.row.children.length }})</span>
                </template>
            </el-table-column>
            <el-table-column label='图标' property='icon' width='200'>
                <template v-slot='scope'>
                    <i :class='scope.row.icon'></i>
                    <span>&nbsp; {{ scope.row.icon }}</span>
                </template>
            </el-table-column>
            <el-table-column label='路由' property='path' width='220'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='父ID' property='parentId' width='150'></el-table-column>
            <el-table-column align='center' label='层' property='level' width='40'></el-table-column>
            <el-table-column align='center' label='序' property='order' width='50'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>
            <!--
            <el-table-column align='center' fixed='right' label='操作' width='80'>
                <template v-slot='scope'>
                    <el-button icon='el-icon-document-add' type='text' @click='opDialog("add",scope.row)' />
                    <el-button icon='el-icon-edit-outline' type='text' @click='opDialog("mod",scope.row)' />
                    <el-popconfirm title='确定删除吗？' @confirm='delData(scope.row)'>
                        <el-button slot='reference' icon='el-icon-delete' title='删除' type='text'>
                        </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
            -->
            <el-table-column align='center' label='操作' width='50'>
                <template v-slot='scope'>
                    <el-dropdown>
                         <span class='el-dropdown-link'>
                             <i class='el-icon-s-operation el-icon--right'></i>
                         </span>
                        <el-dropdown-menu slot='dropdown'>
                            <el-dropdown-item icon='el-icon-plus' @click.native='opDialog("add",scope.row)'>
                                新增
                            </el-dropdown-item>
                            <el-popconfirm icon-color='red' title='确定删除吗？' @confirm='delData(scope.row)'>
                                <el-dropdown-item slot='reference' icon='el-icon-delete'>
                                    删除
                                </el-dropdown-item>
                            </el-popconfirm>
                            <el-dropdown-item icon='el-icon-edit-outline' @click.native='opDialog("mod",scope.row)'>
                                编辑
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog :title='opDialogTitle' :visible.sync='opDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label='菜单'>
                            <el-input v-model='formData.name'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='图标'>
                            <el-input v-model='formData.icon'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='父ID'>
                            <el-input v-model='formData.parentId' disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='16'>
                        <el-form-item label='路由'>
                            <el-input v-model='formData.path'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='4'>
                        <el-form-item label='序号'>
                            <el-input v-model='formData.order'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='4'>
                        <el-form-item label='层级'>
                            <el-input v-model='formData.level' disabled></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='opData(operation)'>保存</el-button>
            </span>
        </el-dialog>
    </frame-space>
</template>

<script>
import pageMixin from '@/mixin/form.mixin'
import Profile from '@/api/profile'
import Menu from '@/api/menu/menu'

export default {
    mixins: [pageMixin],
    data() {
        return {}
    },
    methods: {
        addDialog(row) {
            if (row) {
                this.formData = {
                    parentId: row.id,
                    level: row.level + 1
                }
            } else {
                this.formData = {
                    parentId: 0,
                    level: 1
                }
            }
        },
        addData() {
            Menu.addData(this.formData).then(() => {
                this.getMenu()
            })
        },
        delData(row) {
            Menu.delData(row.id).then(() => {
                this.getMenu()
            })
        },
        modDialog(row) {
            this.formData = row
            this.opDialogTitle = '修改（' + this.formData.title + '）'
        },
        modData() {
            Menu.modData(this.formData).then(() => {
                this.getMenu()
            })
        },
        getMenu() {
            Profile.getMenu().then(res => {
                this.realData = res.data
            })
        }
    },
    mounted() {
        this.getMenu()
    }
}
</script>

<style scoped>
.el-button + .el-button {
    margin-left: 0px;
}
</style>;
