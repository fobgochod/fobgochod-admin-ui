import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/tenants',
            data: data,
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/tenants/' + id,
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/tenants',
            data: data,
        })
    },
    getById(id) {
        return axios({
            method: 'get',
            url: '/tenants/' + id,
        })
    },
    getData() {
        return axios({
            method: 'get',
            url: '/tenants',
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/tenants/search',
            data: data,
        })
    },
    getOptions() {
        return axios({
            method: 'get',
            url: '/tenants/option',
        })
    },
}
