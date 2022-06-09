import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/tenants/add',
            data: data
        })
    },
    delData(data) {
        return axios({
            method: 'post',
            url: '/tenants/del',
            data: data
        })
    },
    modData(data) {
        return axios({
            method: 'post',
            url: '/tenants/mod',
            data: data
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/tenants/search',
            data: data
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/tenants/drop'
        })
    },
    getOptions() {
        return axios({
            method: 'get',
            url: '/tenants/option'
        })
    },
    getOptionGroups() {
        return axios({
            method: 'get',
            url: '/tenants/option/group'
        })
    }
}
