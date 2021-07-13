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
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/tenants/search',
            data: data,
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/tenants/drop',
        })
    },
    getOptions() {
        return axios({
            method: 'get',
            url: '/tenants/option',
        })
    },
    getOptionGroups() {
        return axios({
            method: 'get',
            url: '/tenants/option/group',
        })
    },
}
