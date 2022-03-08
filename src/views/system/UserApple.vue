<template>
    <frame-space>
        <el-form ref='formCondData' :inline='true' :model='pageData.filters' class='demo-form-inline' size='small'>
            <el-form-item label='ID' prop='id'>
                <el-input v-model='pageData.filters.id' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='用户ID' prop='code'>
                <el-input v-model='pageData.filters.code' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='用户名' prop='name'>
                <el-input v-model='pageData.filters.name' @change='searchData'></el-input>
            </el-form-item>
            <el-form-item label='角色' prop='role'>
                <el-select v-model='pageData.filters.role' @change='searchData'>
                    <el-option label='None' value='None'></el-option>
                    <el-option label='Owner' value='Owner'></el-option>
                    <el-option label='Admin' value='Admin'></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' @click='searchData'>查询</el-button>
                <el-button @click="clearData('formCondData')">清空</el-button>
            </el-form-item>
        </el-form>
        <el-button icon='el-icon-plus' size='small' type='success' @click='addDialog'>新增</el-button>
        <drop-collection table='User' :success='getByPage' />
        <el-table :data='realData' border max-height='520' stripe @selection-change='selection'>
            <el-table-column :index='getIndex' align='center' label='序号' type='index'
                             width='60'></el-table-column>
            <el-table-column label='ID' property='id' width='150'></el-table-column>
            <el-table-column label='账号' property='code' width='100'></el-table-column>
            <el-table-column label='姓名' property='name' width='120'></el-table-column>
            <el-table-column align='center' label='农历' width='50'>
                <template slot-scope='scope'>
                    <el-checkbox v-model='scope.row.lunar' @change='update(scope.row)'></el-checkbox>
                </template>
            </el-table-column>
            <el-table-column align='center' label='生日' property='birth' width='120'></el-table-column>
            <el-table-column label='手机' property='telephone' width='120'></el-table-column>
            <el-table-column label='微信' property='wechat' width='160'></el-table-column>
            <el-table-column label='Email' property='email' width='210'></el-table-column>
            <el-table-column label='角色' width='100'>
                <template slot-scope='scope'>
                    <el-tag :type='roleColor(scope.row.role)'>
                        {{ scope.row.role }}
                    </el-tag>
                </template>
            </el-table-column>
            <el-table-column label='联系人' width='140'>
                <template slot-scope='scope'>
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
            <el-table-column align='center' label='创建时间' property='createDate' width='160'></el-table-column>
            <el-table-column align='center' label='创建人' property='createById' width='140'></el-table-column>
            <el-table-column align='center' label='修改时间' property='modifyDate' width='160'></el-table-column>
            <el-table-column align='center' label='修改人' property='modifyById' width='140'></el-table-column>
            <el-table-column align='center' fixed label='操作' width='80'>
                <template slot-scope='scope'>
                    <el-button icon='el-icon-edit-outline' title='编辑' type='text' @click='modDialog(scope.row)'>
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

        <el-dialog :title='addDialogTitle' :visible.sync='addDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='账号'>
                            <el-input v-model='formData.code' placeholder='请输入用户ID'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='姓名'>
                            <el-input v-model='formData.name' placeholder='请输入用户名'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='4'>
                        <el-form-item label='阴历'>
                            <el-checkbox v-model='formData.lunar'></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='生日'>
                            <el-date-picker v-model='formData.birth' value-format='yyyy-MM-dd'></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='手机'>
                            <el-input v-model='formData.telephone' placeholder='请输入用户手机'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='微信'>
                            <el-input v-model='formData.wechat' placeholder='请输入用户手机'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='Email'>
                            <el-input v-model='formData.email' placeholder='请输入用户Email'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='用户密码'>
                            <el-input v-model='formData.password' placeholder='请输入用户密码' show-password></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='角色'>
                            <el-radio-group v-model='formData.role'>
                                <el-radio label='None'>None</el-radio>
                                <el-radio label='Owner'>Owner</el-radio>
                                <el-radio label='Admin'>Admin</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <span slot='footer' class='dialog-footer'>
                <el-button type='success' @click='addData'>确认新增</el-button>
            </span>
        </el-dialog>

        <el-dialog :title='modDialogTitle' :visible.sync='modDialogVisible' center>
            <el-form ref='form' :model='formData' label-width='80px'>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='账号'>
                            <el-input disabled v-model='formData.code' placeholder='请输入用户ID'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='姓名'>
                            <el-input v-model='formData.name' placeholder='请输入用户名'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='4'>
                        <el-form-item label='阴历'>
                            <el-checkbox v-model='formData.lunar'></el-checkbox>
                        </el-form-item>
                    </el-col>
                    <el-col :span='8'>
                        <el-form-item label='生日'>
                            <el-date-picker v-model='formData.birth' value-format='yyyy-MM-dd'></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='手机'>
                            <el-input v-model='formData.telephone' placeholder='请输入用户手机'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span='12'>
                        <el-form-item label='微信'>
                            <el-input v-model='formData.wechat' placeholder='请输入用户手机'></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span='12'>
                        <el-form-item label='Email'>
                            <el-input v-model='formData.email' placeholder='请输入用户Email'></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-form-item label='角色'>
                    <el-radio-group v-model='formData.role'>
                        <el-radio label='None'>None</el-radio>
                        <el-radio label='Owner'>Owner</el-radio>
                        <el-radio label='Admin'>Admin</el-radio>
                    </el-radio-group>
                </el-form-item>
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
                <el-button type='success' @click='modData'>确认修改</el-button>
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
            formData: {
                code: '',
                name: '',
                lunar: false,
                birth: null,
                telephone: '',
                wechat: '',
                qq: '',
                email: '',
                contacts: [],
                password: '',
                role: '',
                pwdHash: ''
            },
            resetDialogTitle: '重置密码',
            resetDialogVisible: false,
            dynamicTags: [],
            inputVisible: false,
            inputValue: ''
        }
    },
    methods: {
        roleColor(role) {
            if (role === 'Admin') {
                return 'danger'
            } else if (role === 'Owner') {
                return 'success'
            } else {
                return 'info'
            }
        },
        addData() {
            this.formData.pwdHash = Secret.encode(this.formData.password)
            User.addData(this.formData).then(() => {
                this.getByPage()
                this.$message.success('新增' + this.formData.name + '成功')
            }).catch((error) => {
                this.$message.error('新增' + this.formData.name + '失败：[' + error.response.data.message + ']')
            })
            this.addDialogVisible = false
        },
        delData(row) {
            User.delData(row.id).then(() => {
                this.getByPage()
                this.$message.success('删除' + row.name + '成功')
            }).catch(() => {
                this.$message.error('删除' + row.name + '失败')
            })
        },
        modDialog(row) {
            if (row.contacts) {
                this.dynamicTags = row.contacts
            } else {
                this.dynamicTags = []
            }
            this.formData = row
            this.modDialogTitle = '修改（' + this.formData.name + '）'
            this.modDialogVisible = true
        },
        modData() {
            this.formData.contacts = this.dynamicTags
            this.update(this.formData)
            this.modDialogVisible = false
        },
        update(data) {
            User.modData(data).then(() => {
                this.getByPage()
                this.$message.success('修改' + data.name + '成功')
            }).catch(() => {
                this.$message.error('修改' + data.name + '失败')
            })
        },
        getByPage() {
            User.getByPage(this.pageData).then(res => {
                this.pageData.total = res.data.total
                this.realData = res.data.list
                this.$message.success('查询用户成功')
            }).catch(() => {
                this.$message.error('查询用户失败')
            })
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
        resetDialog(row) {
            this.formData.name = row.name
            this.formData.password = ''
            this.resetDialogTitle = '重置（' + this.formData.name + '）密码'
            this.resetDialogVisible = true
        },
        resetPassword() {
            this.formData.pwdHash = Secret.encode(this.formData.password)
            User.resetPassword(this.formData).then(() => {
                this.getByPage()
                this.$message.success('重置' + this.formData.name + '密码成功')
            }).catch(() => {
                this.$message.error('重置' + this.formData.name + '密码失败')
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
