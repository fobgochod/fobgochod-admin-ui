<template>
    <div>
        <el-form :model='ruleForm' :rules='rules' ref='ruleForm'>
            <el-form-item prop='username'>
                <el-input tabindex='2' v-model='ruleForm.username' prefix-icon='el-icon-user'
                          @keydown.native.enter='nextFocus($event,3)'></el-input>
            </el-form-item>
            <el-form-item prop='password'>
                <el-input tabindex='3' v-model='ruleForm.password' prefix-icon='el-icon-lock'
                          show-password
                          @keydown.native.enter='login'></el-input>
            </el-form-item>
            <el-form-item prop='remember'>
                <el-checkbox v-model='remember'>记住我</el-checkbox>
                <el-link :underline='false' style='float: right' type='danger' @click="to('/change/password')">
                    忘记密码
                </el-link>
            </el-form-item>
            <el-form-item>
                <el-button type='primary' style='width:100%' @click='login' @keyup.enter.native='login'>登录
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

export default {
    name: 'AccountLogin',
    components: {},
    props: {
        ruleForm: {
            type: Object,
            require: true
        },
        remember: {
            type: Boolean,
            default: false
        }
    },
    data() {
        let checkAccount = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('账号不能为空'))
            } else {
                callback()
            }
        }
        return {
            rules: {
                username: [
                    {validator: checkAccount, trigger: 'change'}
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        nextFocus(e, index) {
            e.target.blur()
            document.querySelector('input[tabindex=\'' + index + '\']').focus()
        },
        to(link) {
            this.$router.push(link)
        },
        login() {
            this.$refs.ruleForm.validate((valid) => {
                if (valid) {
                    this.$emit('submit')
                } else {
                    this.$emit('errHandle')
                }
            })
        }
    }
}
</script>
