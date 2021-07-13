import axios from '@/config/http'

export default {
    login(username, pwdhash) {
        return axios.post('/auth/login', {
            username: username,
            pwdhash: pwdhash,
        })
    },
    refresh(tenantId) {
        return axios.post('/auth/token/refresh', {
            tenantId: tenantId,
        })
    },
    getRole(username) {
        return axios({
            method: 'get',
            url: '/users/name/' + username,
        })
    },
    getByOwner() {
        return axios({
            method: 'get',
            url: '/buckets/option',
        })
    },
}
