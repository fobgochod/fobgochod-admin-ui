import axios from '@/config/http'

export default {
    login(username, pwdhash) {
        return axios.post('/login', {
            username: username,
            pwdhash: pwdhash,
        })
    },
    refresh(tenantId) {
        return axios.post('/token/refresh', {
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
