<template>
    <div id='login'>
        <div style='text-align: center;'>
            <img alt='Vue logo' src='../../assets/logo.png'>
        </div>
        <div id='form_space'>
            <div style='text-align: center; min-height: 20px'>
                <h1>{{ changeTitle }}</h1>
                <p>{{ changeSubTitle }}</p>
            </div>
            <div style='padding:20px'>
                <el-form ref='changePasswordForm' :model='formData' :rules='rules' class='demo-ruleForm'>
                    <el-form-item prop='name'>
                        <el-input v-model='formData.name' placeholder='请输入用户名' prefix-icon='el-icon-user' />
                    </el-form-item>
                    <el-form-item prop='oldPassword'>
                        <el-input v-model='formData.oldPassword' placeholder='请输入旧密码' prefix-icon='el-icon-lock'
                                  show-password></el-input>
                    </el-form-item>
                    <el-form-item prop='password'>
                        <el-input v-model='formData.password' placeholder='请输入新密码' prefix-icon='el-icon-lock'
                                  show-password></el-input>
                    </el-form-item>
                    <el-form-item prop='passwordVerify'>
                        <el-input v-model='formData.passwordVerify' placeholder='请再次输入新密码' prefix-icon='el-icon-lock'
                                  show-password></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-link :underline='false' style='float:right' type='primary' @click="to('/')">返回登录</el-link>
                    </el-form-item>
                    <el-form-item align='center'>
                        <el-button icon='el-icon-thumb' type='danger' @click='forget()' disabled>修改密码？</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from 'vuex'
import User from '@/api/system/user'
import Login from '@/api/home/login'
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
            changeTitle: '修改密码',
            changeSubTitle: '',
            formData: {
                name: '',
                oldPassword: '',
                password: '',
                passwordVerify: ''
            },
            disabled: false,
            rules: {
                name: [
                    {required: true, message: '用户名不能为空', trigger: 'blur'}
                ],
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
    computed: mapState(['baseUri']),
    methods: {
        checkOldPassword() {
            let body = {
                code: this.formData.name,
                pwdHash: Secret.encode(this.formData.oldPassword)
            }
            User.checkPassword(body).then((res) => {
                this.checkOld = res.data
            })
        },
        forget() {
            this.$refs['changePasswordForm'].validate((valid) => {
                if (valid) {
                    let body = {
                        code: this.formData.name,
                        oldPwdHash: Secret.encode(this.formData.oldPassword),
                        pwdHash: Secret.encode(this.formData.password)
                    }
                    User.changePassword(body).then(() => {
                        this.$message.success('修改密码成功')
                        setTimeout(() => {
                            this.$router.push('/')
                        }, 1000)
                    }).catch(() => {
                        this.$message.error('修改密码失败')
                    })
                } else {
                    this.$message.error('校验不通过')
                }
            })
        },
        to(link) {
            this.$router.push(link)
        }
    }
}
</script>

<style scoped>
h1 {
    color: #606266;
}

p {
    color: #606266;
}

#login {
    min-height: 100vh;
}

#form_space {
    border-radius: 10px;
    position: absolute;
    top: 20px;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 400px;
    width: 400px;
}
</style>
