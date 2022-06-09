import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/tasks/add',
            data: data
        })
    },
    delData(data) {
        return axios({
            method: 'post',
            url: '/tasks/del',
            data: data
        })
    },
    modData(data) {
        return axios({
            method: 'post',
            url: '/tasks/mod',
            data: data
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/tasks/search',
            data: data
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/tasks/drop'
        })
    },
    getOptions() {
        return axios({
            method: 'get',
            url: '/tasks/option'
        })
    },
    doTask(id) {
        return axios({
            method: 'get',
            url: '/tasks/run/' + id
        })
    },
    refreshTask() {
        return axios({
            method: 'get',
            url: '/tasks/refresh'
        })
    }
}
