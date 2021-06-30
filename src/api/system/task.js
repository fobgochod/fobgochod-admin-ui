import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/tasks',
            data: data,
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/api/dmc/v2/tasks/' + id,
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/api/dmc/v2/tasks',
            data: data,
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/tasks/search',
            data: data,
        })
    },
    doTask(id) {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/tasks/run/' + id,
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/api/dmc/v2/tasks/drop',
        })
    },
    refreshTask() {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/tasks/refresh',
        })
    },
}
