<template>
    <frame-space>
        <el-row :gutter='20' style='margin-bottom: 20px'>
            <el-col :span='12'>
                <el-card shadow='never'>
                    <div slot='header'>
                        <span>基本信息</span>
                        <el-button style='float: right; padding: 3px 0' type='text' @click='onSubmit()'>保存</el-button>
                    </div>
                    <div>
                        <el-form ref='form' :model='formData' label-width='100px'>
                            <el-form-item label='用户ID'>
                                <el-input v-model='formData.code' disabled title='用户ID不可修改'></el-input>
                            </el-form-item>
                            <el-row>
                                <el-col :span='12'>
                                    <el-form-item label='用户名'>
                                        <el-input v-model='formData.name'></el-input>
                                    </el-form-item>
                                </el-col>
                                <el-col :span='12'>
                                    <el-form-item label='生日'>
                                        <el-date-picker v-model='formData.birth' style='width: 100%'
                                                        value-format='yyyy-MM-dd'></el-date-picker>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                            <el-form-item label='角色'>
                                <el-radio-group v-model='formData.role' disabled>
                                    <el-radio label='None'>None</el-radio>
                                    <el-radio label='Owner'>Owner</el-radio>
                                    <el-radio label='Admin'>Admin</el-radio>
                                </el-radio-group>
                            </el-form-item>
                            <el-form-item label='密码'>
                                <el-input v-model='formData.password' disabled></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                </el-card>
            </el-col>
            <el-col :span='12'>
                <password-sub />
            </el-col>
        </el-row>
        <el-row :gutter='20'>
            <el-col :span='12'>
                <el-card shadow='never'>
                    <div slot='header'>
                        <span>联系方式</span>
                    </div>
                    <div>
                        <el-form ref='form' :model='formData' label-width='100px'>
                            <el-form-item label='Email'>
                                <el-input v-model='formData.email'></el-input>
                            </el-form-item>
                            <el-form-item label='手机'>
                                <el-input v-model='formData.telephone'></el-input>
                            </el-form-item>
                            <el-form-item label='微信'>
                                <el-input v-model='formData.wechat'></el-input>
                            </el-form-item>
                            <el-form-item label='联系人'>
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
                        </el-form>
                    </div>
                </el-card>
            </el-col>
            <el-col :span='12'>
                <encrypt-sub />
            </el-col>
        </el-row>
    </frame-space>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import User from '@/api/system/user'

export default {
    data() {
        return {
            formData: {
                code: '',
                name: '',
                email: '',
                telephone: '',
                password: '',
                role: ''
            },
            dynamicTags: [],
            tagInputVisible: false,
            tagInputValue: ''
        }
    },
    computed: {
        ...mapState(['baseUri', 'userId'])
    },
    components: {
        PasswordSub: () => import('@/views/admin/sub/PasswordSub'),
        EncryptSub: () => import('@/views/admin/sub/EncryptSub')
    },
    methods: {
        ...mapMutations(['setUserName']),
        getData() {
            User.getByName(this.userId).then((res) => {
                this.formData = res.data
                this.dynamicTags = res.data.contacts
            })
        },
        onSubmit() {
            User.modData(this.formData).then(() => {
                this.setUserName(this.formData.name)
                this.$message.success('修改' + this.formData.name + '成功')
            }).catch(() => {
                this.$message.error('修改' + this.formData.name + '失败')
            })
        },
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
        }
    },
    mounted() {
        this.getData()
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
