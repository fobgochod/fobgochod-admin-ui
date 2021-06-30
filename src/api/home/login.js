import axios from '@/config/http'

export default {
    login(username, pwdhash) {
        return axios.post('/api/dmc/v2/auth/login', {
            username: username,
            pwdhash: pwdhash,
        })
    },
    getRole(username) {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/users/name/' + username,
        })
    },
    getByOwner() {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/buckets/option',
        })
    },
}
