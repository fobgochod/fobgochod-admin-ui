import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/users/add',
            data: data
        })
    },
    delData(data) {
        return axios({
            method: 'post',
            url: '/users/del',
            data: data
        })
    },
    modData(data) {
        return axios({
            method: 'post',
            url: '/users/mod',
            data: data
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/users/search',
            data: data
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/users/drop'
        })
    },
    getOptionGroups() {
        return axios({
            method: 'get',
            url: '/users/option/group'
        })
    },
    checkPassword(data) {
        return axios({
            method: 'post',
            url: '/users/password/check',
            data: data
        })
    },
    changePassword(data) {
        return axios({
            method: 'post',
            url: '/users/password/change',
            data: data
        })
    },
    resetPassword(data) {
        return axios({
            method: 'post',
            url: '/users/password/reset',
            data: data
        })
    }
}
