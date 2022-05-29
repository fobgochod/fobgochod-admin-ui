<template>
    <frame-space>
        <el-card shadow='never'>
            <div slot='header'>修改密码</div>
            <div>
                <el-form ref='changePasswordForm' :model='formData' :rules='rules' class='demo-ruleForm'
                         label-width='100px'
                         status-icon>
                    <el-form-item label='旧密码' prop='oldPassword'>
                        <el-input v-model='formData.oldPassword' show-password></el-input>
                    </el-form-item>
                    <el-form-item label='新密码' prop='password'>
                        <el-input v-model='formData.password' show-password title='6-20个字符'></el-input>
                    </el-form-item>
                    <el-form-item label='确认新密码' prop='passwordVerify'>
                        <el-input v-model='formData.passwordVerify' show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type='success' plain @click='onSubmit()'>确认修改</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </frame-space>
</template>
<script>
import {mapState} from 'vuex'
import User from '@/api/system/user'
import Secret from '@/assets/js/secret.js'

export default {
    data() {
        let validateOldPassword = (rule, value, callback) => {
            this.checkOldPassword()
            if (value === '') {
                callback(new Error('请输入旧密码'))
            } else if (!this.checkOld) {
                callback(new Error('旧密码不正确'))
            } else {
                callback()
            }
        }
        let validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'))
            } else {
                if (this.formData.passwordVerify !== '') {
                    this.$refs.changePasswordForm.validateField('passwordVerify')
                }
                callback()
            }
        }
        let validatePasswordVerify = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.formData.password) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            formData: {
                name: '',
                pwdHash: '',
                oldPwdHash: '',
                oldPassword: '',
                password: '',
                passwordVerify: ''
            },
            checkOld: false,
            rules: {
                oldPassword: [
                    {validator: validateOldPassword, trigger: ['blur', 'change']}
                ],
                password: [
                    {validator: validatePassword, trigger: 'blur'}
                ],
                passwordVerify: [
                    {validator: validatePasswordVerify, trigger: 'blur'}
                ]
            }
        }
    },
    computed: {
        ...mapState(['baseUri', 'userId'])
    },
    methods: {
        checkOldPassword() {
            this.formData.name = this.userId
            this.formData.pwdHash = Secret.encode(this.formData.oldPassword)
            User.checkPassword(this.formData).then((res) => {
                this.checkOld = res.data
            })
        },
        onSubmit() {
            this.$refs['changePasswordForm'].validate((valid) => {
                if (valid) {
                    this.formData.name = this.userId
                    this.formData.oldPwdHash = Secret.encode(this.formData.oldPassword)
                    this.formData.pwdHash = Secret.encode(this.formData.password)
                    User.changePassword(this.formData).then(() => {
                        this.$message.success('修改密码成功')
                        this.$router.push('/')
                    }).catch(() => {
                        this.$message.error('修改密码失败')
                    })
                } else {
                    this.$message.error('校验不通过')
                }
            })
        }
    }
}
</script>
