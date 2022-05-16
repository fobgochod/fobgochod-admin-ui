import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import Secret from '@/assets/js/secret.js'

axios.defaults.baseURL = process.env.VUE_APP_ADMIN_API
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

let whiteList = ['/redis', '/mariadb', '/websocket', '/login']
let encryptList = ['/users', '/users/search']

axios.interceptors.request.use(
    (config) => {
        let flag = whiteList.some((item) => {
            return config.url.indexOf(item) > -1
        })

        let userToken = store.state.userToken
        if (userToken && !flag) {
            config.headers.common['digi-middleware-auth-user'] = userToken
        }

        if (encryptList.indexOf(config.url) > -1) {
            config.headers['Content-Type'] = 'application/json;charset=utf-8'
            config.data = Secret.encrypt(JSON.stringify(config.data))
        }
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)

axios.interceptors.response.use(
    (response) => {
        if (encryptList.indexOf(response.config.url) > -1) {
            response.data = JSON.parse(Secret.decrypt(response.data))
        }
        return response
    },
    (error) => {
        let status = error.response.status
        let message = error.response.data.message
        if (message) {
            Vue.prototype.$notify.error({
                title: status,
                message: message,
                position: 'top-left',
                showClose: false
            })
        } else {
            Vue.prototype.$notify.error({
                title: status,
                message: '服务器错误',
                position: 'top-left',
                showClose: false
            })
        }
        if (status) {
            switch (status) {
                case 400:
                    error.message = '[400]请求错误'
                    break
                case 401:
                    error.message = '[401]未授权，请重新登录'
                    break
                case 403:
                    error.message = '[403]拒绝访问'
                    break
                case 404:
                    error.message = '[404]请求出错'
                    break
                case 408:
                    error.message = '[408]请求超时'
                    break
                case 500:
                    error.message = '[500]服务器错误'
                    break
                case 501:
                    error.message = '[501]服务未实现'
                    break
                case 502:
                    error.message = '[502]网络错误'
                    break
                case 503:
                    error.message = '[503]服务不可用'
                    break
                case 504:
                    error.message = '[504]网络超时'
                    break
                case 505:
                    error.message = '[505]HTTP版本不受支持'
                    break
                default:
                    error.message = `[${error.response.status}]连接出错`
            }
        } else {
            error.message = '连接服务器失败!'
        }
        return Promise.reject(error)
    }
)

export default axios
