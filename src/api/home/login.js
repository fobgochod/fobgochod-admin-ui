import axios from '@/config/http'

export default {
    login(data) {
        return axios({
            method: 'post',
            url: '/login',
            data: data
        })
    },
    refresh(tenantId) {
        return axios.post('/token/refresh', {
            tenantId: tenantId
        })
    },
    getRole(username) {
        return axios({
            method: 'get',
            url: '/users/name/' + username
        })
    },
    getByOwner() {
        return axios({
            method: 'get',
            url: '/buckets/option'
        })
    },
    sendSms(telephone) {
        return axios.post('/login/captcha', {
            telephone: telephone
        })
    }
}
