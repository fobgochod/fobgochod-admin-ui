import Vue from 'vue'
import axios from 'axios'
import store from '@/store'
import Secret from '@/assets/js/secret.js'

axios.defaults.baseURL = process.env.VUE_APP_ADMIN_API
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8'

let whiteList = ['/redis', '/mariadb', '/websocket', '/login']
let encryptList = ['/users/add', '/users/mod', '/users/get', '/users/search']

axios.interceptors.request.use(
    (config) => {
        let flag = whiteList.indexOf(config.url) > -1

        let token = store.state.token
        if (token && !flag) {
            config.headers.common['digi-middleware-auth-user'] = token
        }

        if (encryptList.indexOf(config.url) > -1) {
            config.headers['Content-Type'] = 'application/json;charset=utf-8'
            config.data = Secret.aesEnc(JSON.stringify(config.data))
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
            response.data = JSON.parse(Secret.aesDec(response.data))
        }
        return response
    },
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx

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
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request)
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message)
        }
        return Promise.reject(error)
    }
)

export default axios
