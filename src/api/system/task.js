import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/tasks',
            data: data,
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/tasks/' + id,
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/tasks',
            data: data,
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/tasks/search',
            data: data,
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/tasks/drop',
        })
    },
    doTask(id) {
        return axios({
            method: 'get',
            url: '/tasks/run/' + id,
        })
    },
    refreshTask() {
        return axios({
            method: 'get',
            url: '/tasks/refresh',
        })
    },
}
