import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/tenants',
            data: data,
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/api/dmc/v2/tenants/' + id,
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/api/dmc/v2/tenants',
            data: data,
        })
    },
    getById(id) {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/tenants/' + id,
        })
    },
    getData() {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/tenants',
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/tenants/search',
            data: data,
        })
    },
    getOptions() {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/tenants/option',
        })
    },
}
