<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filter' class='demo-form-inline' size='small'>
            <el-form-item label='账号' prop='code'>
                <el-input v-model='pageData.filter.like.code' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='姓名' prop='name'>
                <el-input v-model='pageData.filter.like.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='手机' prop='telephone'>
                <el-input v-model='pageData.filter.like.telephone' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='角色' prop='role'>
                <fo-role-option :option.sync='pageData.filter.eq.role' :success='searchData' />
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>
        <el-button icon='el-icon-plus' size='small' type='success' @click='opDialog("add")'>新增</el-button>
        <fo-data-infrastructure table='User' :success='getByPage' />
        <fo-drop-collection table='User' :success='getByPage' />
        <el-table :data='tableData' border max-height='520' stripe @selection-change='selection'>
            <el-table-column :index='getIndex' align='center' label='序号' type='index'
                             width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='租户' property='tenantCode' width='100'></el-table-column>
            <el-table-column label='账号' property='code' width='160'></el-table-column>
            <el-table-column label='姓名' property='name' width='120'></el-table-column>
            <el-table-column align='center' label='农历' width='50'>
                <template v-slot='scope'>
                    <el-checkbox v-model='scope.row.lunar' @change='update(scope.row)'></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column align='center' label='生日' property='birth' width='120'></el-table-column>
            <el-table-column label='手机' property='telephone' width='120'></el-table-column>
            <el-table-column label='微信' property='wechat' width='160'></el-table-column>
            <el-table-column label='Email' property='email' width='210'></el-table-column>
            <el-table-column align='center' label='角色' width='100'>
                <template v-slot='scope'>
                    <fo-role-tag :value.sync='scope.row.role' />
                </template>
            </el-table-column>
            <el-table-column label='联系人' width='140'>
                <template v-slot='scope'>
                    <el-dropdown trigger='click' v-if='scope.row.contacts && scope.row.contacts.length>0'>
                        <span class='el-dropdown-link'>
                            <el-badge :value='scope.row.contacts.length' class='item'>
                                <el-button size='small'>
                                    {{ scope.row.contacts[0] }}
                                </el-button>
                            </el-badge>
                        </span>
                        <el-dropdown-menu slot='dropdown'>
                            <el-dropdown-item class='clearfix' :key='tag' v-for='tag in scope.row.contacts'>
                                {{ tag }}
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
            </el-table-column>
            <el-table-column label='密码' property='password' width='440'></el-table-column>
            <el-table-column align='center' label='序' property='order' width='50'></el-table-column>
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createCode' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyCode' width='140'></el-table-column>
            <el-table-column align='center' fixed label='操作' width='80'>
                <template v-slot='scope'>
                    <el-button icon='el-icon-edit-outline' title='编辑' type='text' @click='opDialog("mod",scope.row)'>
                    </el-button>
                    <el-popconfirm title='确定删除吗？' @confirm='delData(scope.row)'>
                        <el-button slot='reference' icon='el-icon-delete' title='删除' type='text'>
                        </el-button>
                    </el-popconfirm>
                    <el-button icon='el-icon-refresh-right' title='重置密码' type='text'
                               @click='resetDialog(scope.row)'>
                    </el-button>
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
                        <el-form-item label='账号'>
                            <el-input v-model='formData.code' :disabled="operation !== 'add'"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='姓名'>
                            <el-input v-model='formData.name' placeholder='请输入用户名'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='密码'>
                            <el-input v-model='formData.password' placeholder='请输入用户密码' show-password></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='租户ID'>
                            <fo-tenant-option :option.sync='formData.tenantCode' />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='8'>
                        <el-form-item label='手机'>
                            <el-input v-model='formData.telephone' placeholder='请输入用户手机'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='微信'>
                            <el-input v-model='formData.wechat' placeholder='请输入用户微信'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='Email'>
                            <el-input v-model='formData.email' placeholder='请输入用户Email'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='2'>
                        <el-form-item label='阴历'>
                            <el-checkbox v-model='formData.lunar'></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label='生日'>
                            <el-date-picker style='width: 100%' v-model='formData.birth'
                                            value-format='yyyy-MM-dd'></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span='6'>
                        <el-form-item label='序号'>
                            <el-input-number style='width: 100%' v-model='formData.order' :min='1' :max='100' />
                        </el-form-item>
                    </el-col>
                    <el-col :span='10'>
                        <el-form-item label='角色'>
                            <fo-role-radio :radio.sync='formData.role' :disabled="userCode !== 'admin'" />
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-form-item label='联系人'>
                        <el-tag :key='tag'
                                v-for='tag in dynamicTags'
                                closable
                                :disable-transitions='false'
                                @close='handleClose(tag)'>
                            {{ tag }}
                        </el-tag>
                        <el-input class='input-new-tag'
                                  v-if='inputVisible'
                                  v-model='inputValue'
                                  ref='saveTagInput'
                                  size='small'
                                  @keyup.enter.native='handleInputConfirm'
                                  @blur='handleInputConfirm'>
                        </el-input>
                        <el-button v-else class='button-new-tag' size='small' @click='showInput'>+ New Tag</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                 <el-button type='success' @click='opData(operation)'>保存</el-button>
            </span>
        </el-dialog>

        <el-dialog :title='resetDialogTitle' :visible.sync='resetDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-form-item label='用户名'>
                    <el-input v-model='formData.name' disabled></el-input>
                </el-form-item>
                <el-form-item label='用户密码'>
                    <el-input v-model='formData.password' placeholder='请输入用户密码' show-password></el-input>
                </el-form-item>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='resetPassword'>确认重置</el-button>
            </span>
        </el-dialog>
    </frame-space>
</template>

<script>
import pageMixin from '@/mixin/form.mixin'
import Secret from '@/assets/js/secret.js'
import User from '@/api/system/user'

export default {
    mixins: [pageMixin],
    data() {
        return {
            resetDialogTitle: '重置密码',
            resetDialogVisible: false,
            dynamicTags: [],
            inputVisible: false,
            inputValue: ''
        }
    },
    methods: {
        addData() {
            this.formData.contacts = this.dynamicTags
            this.formData.pwdHash = Secret.encode(this.formData.password)
            User.addData(this.formData).then(() => {
                this.getByPage()
            })
        },
        delData(row) {
            User.delData(row).then(() => {
                this.getByPage()
            })
        },
        modDialog(row) {
            if (row.contacts) {
                this.dynamicTags = row.contacts
            } else {
                this.dynamicTags = []
            }
            this.formData = row
            this.opDialogTitle = '修改（' + this.formData.name + '）'
        },
        modData() {
            this.formData.contacts = this.dynamicTags
            this.update(this.formData)
        },
        update(data) {
            User.modData(data).then(() => {
                this.getByPage()
            })
        },
        getByPage() {
            User.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.tableData = res.data.list
            })
        },
        resetDialog(row) {
            this.formData = row
            this.resetDialogTitle = '重置（' + this.formData.name + '）密码'
            this.resetDialogVisible = true
        },
        resetPassword() {
            let body = {
                code: this.formData.code,
                pwdHash: Secret.encode(this.formData.password)
            }
            User.resetPassword(body).then(() => {
                this.getByPage()
            })
            this.resetDialogVisible = false
        },

        handleClose(tag) {
            this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },
        showInput() {
            this.inputVisible = true
            this.$nextTick(() => {
                this.$refs.saveTagInput.$refs.input.focus()
            })
        },
        handleInputConfirm() {
            let inputValue = this.inputValue
            if (inputValue) {
                this.dynamicTags.push(inputValue)
            }
            this.inputVisible = false
            this.inputValue = ''
        }
    },
    mounted() {
        this.getByPage()
    }
}
</script>

<style scoped>
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
    width: 120px;
    margin-left: 10px;
    vertical-align: bottom;
}

.item {
    margin-top: 10px;
}
</style>;
