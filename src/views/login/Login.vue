<template>
    <div id='login'>
        <div style='text-align: center;'>
            <img alt='Vue logo' src='../../assets/logo.png'>
        </div>
        <div id='form_space'>
            <div style='text-align: center; min-height: 20px'>
                <h1>{{ loginTitle }}</h1>
                <p>{{ loginSubTitle }}</p>
            </div>
            <div style='padding: 20px'>
                <el-form ref='form' :model='loginForm'>
                    <el-tabs type='border-card'>
                        <el-tab-pane label='密码登陆'>
                            <account-login :rule-form='loginForm' :remember.sync='remember'
                                           @submit='login'
                                           @errHandle='loginSmsError'>
                            </account-login>
                        </el-tab-pane>
                        <el-tab-pane label='短信登陆'>
                            <phone-login :rule-form='loginForm'
                                         @send='sendSms'
                                         @submit='loginSms'
                                         @errHandle='loginSmsError'>
                            </phone-login>
                        </el-tab-pane>
                    </el-tabs>
                </el-form>
            </div>
            <bottom-space />
        </div>
    </div>
</template>

<script>
import {COLOR} from '@/assets/js/base.data.js'
import Secret from '@/assets/js/secret.js'
import {mapMutations, mapState} from 'vuex'
import Login from '@/api/home/login'

export default {
    data() {
        let username = localStorage.getItem('username')
        let password = localStorage.getItem('password')
        let remember = localStorage.getItem('remember')

        return {
            loginTitle: '',
            loginSubTitle: '',
            loginForm: {
                username: username == null ? null : Secret.rsaDec(username),
                password: password == null ? null : Secret.rsaDec(password),
                telephone: '',
                captcha: '',
                loginType: 'token'
            },
            remember: remember === 'true'
        }
    },
    components: {
        AccountLogin: () => import('@/views/login/sub/AccountLogin.vue'),
        PhoneLogin: () => import('@/views/login/sub/PhoneLogin.vue'),
        BottomSpace: () => import('@/components/frame/BottomSpace')
    },
    computed: {
        ...mapState(['baseUri', 'tenantCode'])
    },
    methods: {
        ...mapMutations(['setBaseUri', 'setUserCode', 'setUserName', 'setTenantCode', 'setToken']),
        login() {
            let password = Secret.rsaEnc(this.loginForm.password)
            this.loginForm.password = Secret.aesEnc(this.loginForm.password)
            Login.login(this.loginForm)
            .then((res) => {
                this.setUserCode(res.data.userCode)
                this.setUserName(res.data.userName)
                this.setTenantCode(res.data.tenantCode)
                this.setToken(res.data.token)
                if (this.remember) {
                    localStorage.setItem('username', Secret.rsaEnc(this.loginForm.username))
                    localStorage.setItem('password', password)
                    localStorage.setItem('remember', this.remember)
                } else {
                    localStorage.removeItem('username')
                    localStorage.removeItem('password')
                    localStorage.removeItem('remember')
                }
                this.getVisitPage()
            })
        },
        loginSms() {
            this.loginForm.loginType = 'captcha'
            Login.login(this.loginForm)
            .then((res) => {
                this.setUserCode(res.data.userCode)
                this.setUserName(res.data.userName)
                this.setTenantCode(res.data.tenantCode)
                this.setToken(res.data.token)
                this.getVisitPage()
            })
        },
        sendSms() {
            Login.sendSms(this.loginForm.telephone)
        },
        loginSmsError() {
            this.$message.error('登陆失败')
        },
        getVisitPage() {
            let index = '/home'
            this.$cookies.set('activie_index', index)
            this.$router.push(index)
        }
    },
    mounted() {
        this.setBaseUri(this.$axios.defaults.baseURL)
        if (this.$cookies.get('setting') == null) {
            this.$cookies.set('setting', JSON.stringify(COLOR))
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
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 400px;
    width: 400px;
}
</style>
