import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/roles/add',
            data: data
        })
    },
    delData(data) {
        return axios({
            method: 'post',
            url: '/roles/del',
            data: data
        })
    },
    modData(data) {
        return axios({
            method: 'post',
            url: '/roles/mod',
            data: data
        })
    },
    getById(id) {
        return axios({
            method: 'post',
            url: '/roles/get',
            data: {
                id: id
            }
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
