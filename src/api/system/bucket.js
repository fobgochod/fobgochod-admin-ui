import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/buckets',
            data: data,
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/buckets/' + id,
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/buckets',
            data: data,
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/buckets/search',
            data: data,
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/buckets/drop',
        })
    },
    getOptions() {
        return axios({
            method: 'get',
            url: '/buckets/task',
        })
    },
    apply(data) {
        return axios({
            method: 'post',
            url: '/buckets/apply',
            data: data,
        })
    },
}
