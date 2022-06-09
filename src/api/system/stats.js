import axios from '@/config/http'

export default {
    delData(data) {
        return axios({
            method: 'post',
            url: '/stats/del',
            data: data
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/stats/search',
            data: data
        })
    },
    getCount() {
        return axios({
            method: 'get',
            url: '/stats/count'
        })
    },
    getTotal(limit) {
        return axios({
            method: 'get',
            url: '/stats/total?limit=' + limit
        })
    },
}
