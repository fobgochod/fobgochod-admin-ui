<template>
    <div id='login'>
        <div style='text-align: center;'>
            <img alt='Vue logo' src='../../assets/logo.png'>
        </div>
        <div id='form_space'>
            <div align='center'>
                <h1>{{ loginTitle }}</h1>
                <p>{{ loginSubTitle }}</p>
            </div>
            <div style='padding: 20px'>
                <el-form ref='form' :model='loginForm'>
                    <el-form-item>
                        <el-input tabindex='1' v-model='tenantId' prefix-icon='el-icon-pear'
                                  @keydown.native.enter='nextFocus($event,2)'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input tabindex='2' v-model='loginForm.username' prefix-icon='el-icon-user'
                                  @keydown.native.enter='nextFocus($event,3)'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-input tabindex='3' v-model='loginForm.password' prefix-icon='el-icon-lock' show-password
                                  @keydown.native.enter='login'></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-checkbox v-model='remember'>记住我</el-checkbox>
                        <el-link :underline='false' style='float: right' type='danger' @click="to('/change/password')">
                            忘记密码
                        </el-link>
                    </el-form-item>
                    <el-form-item align='center'>
                        <el-button icon='el-icon-right' type='primary' @click='login' @keyup.enter.native='login'>登录
                        </el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {COLOR} from '@/assets/js/dmc.data.js'
import Secret from '@/assets/js/secret.js'
import {mapMutations, mapState} from 'vuex'
import Login from '@/api/home/login'

export default {
    data() {
        let username = localStorage.getItem('username')
        let password = localStorage.getItem('password')

        return {
            loginTitle: 'Admin | 登录',
            loginSubTitle: '',
            loginForm: {
                username: username == null ? null : Secret.decrypt(username),
                password: password == null ? null : Secret.decrypt(password)
            },
            remember: false,
            hashLogin: false
        }
    },
    computed: {
        ...mapState(['baseUri', 'bucket', 'tenantId'])
    },
    methods: {
        ...mapMutations(['setEnv', 'setBucket', 'setUserId', 'setUserName', 'setUserToken']),
        nextFocus(e, index) {
            e.target.blur()
            document.querySelector('input[tabindex=\'' + index + '\']').focus()
        },
        login() {
            let password
            if (this.hashLogin) {
                password = this.loginForm.password
            } else {
                password = Secret.encode(this.loginForm.password)
            }
            Login.login(this.loginForm.username, password)
            .then((res) => {
                this.setUserToken(res.data.userToken)
                this.setUserId(this.loginForm.username)
                if (this.remember) {
                    localStorage.setItem('username', Secret.encrypt(this.loginForm.username))
                    localStorage.setItem('password', Secret.encrypt(this.loginForm.password))
                }
                this.loginOk()
            }).catch((err) => {
                this.$message.error(err.response.data.message)
            })
        },
        async loginOk() {
            const resRole = await Login.getRole(this.loginForm.username)
            sessionStorage.setItem('loginMark', 'login')
            sessionStorage.setItem('loginRole', resRole.data.role)
            this.setUserName(resRole.data.name)

            await this.$router.push('/home')
        },
        to(link) {
            this.$router.push(link)
        }
    },
    mounted() {
        this.setEnv(this.$axios.defaults.baseURL)
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
