import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/roles',
            data: data
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/roles/' + id
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/roles',
            data: data
        })
    },
    getById(id) {
        return axios({
            method: 'get',
            url: '/roles/' + id
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/roles/search',
            data: data
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/roles/drop'
        })
    },
    getOptions() {
        return axios({
            method: 'get',
            url: '/roles/option'
        })
    }
}
