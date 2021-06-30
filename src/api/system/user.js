import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/users',
            data: data,
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/api/dmc/v2/users/' + id,
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/api/dmc/v2/users',
            data: data,
        })
    },
    getById(id) {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/users/' + id,
        })
    },
    getData() {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/users',
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/users/search',
            data: data,
        })
    },
    getOptions() {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/users/option',
        })
    },
    getByName(username) {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/users/name/' + username,
        })
    },
    changeName(data) {
        return axios({
            method: 'put',
            url: '/api/dmc/v2/users/name',
            data: data,
        })
    },
    checkPassword(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/users/password/check',
            data: data,
        })
    },
    changePassword(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/users/password/change',
            data: data,
        })
    },
    resetPassword(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/users/password/reset',
            data: data,
        })
    },
    refreshToken(tenantId) {
        return axios.post('/api/dmc/v1/auth/token/refresh', {
            tenantId: tenantId,
        })
    },
}
