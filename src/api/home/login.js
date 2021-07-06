import axios from '@/config/http'

export default {
    login(username, pwdhash) {
        return axios.post('/auth/login', {
            username: username,
            pwdhash: pwdhash,
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
