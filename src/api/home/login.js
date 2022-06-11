import axios from '@/config/http'

export default {
    login(data) {
        return axios({
            method: 'post',
            url: '/login',
            data: data
        })
    },
    refreshToken(tenantCode) {
        return axios.post('/token/refresh', {
            tenantCode: tenantCode
        })
    },
    sendSms(telephone) {
        return axios.post('/login/captcha', {
            telephone: telephone
        })
    },

    getSecurityKey(publicKey) {
        return axios.post('/login/security', {
            publicKey: publicKey
        })
    }
}
