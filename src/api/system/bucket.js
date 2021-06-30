import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/buckets',
            data: data,
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/api/dmc/v2/buckets/' + id,
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/api/dmc/v2/buckets',
            data: data,
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/buckets/search',
            data: data,
        })
    },
    apply(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/buckets/apply',
            data: data,
        })
    },
    getOptions() {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/buckets/task',
        })
    },
}
