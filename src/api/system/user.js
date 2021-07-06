import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/users',
            data: data,
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/users/' + id,
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/users',
            data: data,
        })
    },
    getById(id) {
        return axios({
            method: 'get',
            url: '/users/' + id,
        })
    },
    getData() {
        return axios({
            method: 'get',
            url: '/users',
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/users/search',
            data: data,
        })
    },
    getOptions() {
        return axios({
            method: 'get',
            url: '/users/option',
        })
    },
    getByName(username) {
        return axios({
            method: 'get',
            url: '/users/name/' + username,
        })
    },
    changeName(data) {
        return axios({
            method: 'put',
            url: '/users/name',
            data: data,
        })
    },
    checkPassword(data) {
        return axios({
            method: 'post',
            url: '/users/password/check',
            data: data,
        })
    },
    changePassword(data) {
        return axios({
            method: 'post',
            url: '/users/password/change',
            data: data,
        })
    },
    resetPassword(data) {
        return axios({
            method: 'post',
            url: '/users/password/reset',
            data: data,
        })
    },
    refreshToken(tenantId) {
        return axios.post('/auth/token/refresh', {
            tenantId: tenantId,
        })
    },
}
