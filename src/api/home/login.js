import axios from '@/config/http'

export default {
    login(username, password) {
        return axios.post('/login', {
            username: username,
            password: password,
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
