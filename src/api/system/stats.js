import axios from '@/config/http'

export default {
    delData(id) {
        return axios({
            method: 'delete',
            url: '/api/dmc/v2/stats/' + id,
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/stats/search',
            data: data,
        })
    },
    getCount() {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/stats/count',
        })
    },
    getTotal(limit) {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/stats/total?limit=' + limit,
        })
    },
    getIncrement(prev, next) {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/stats/increment/' + prev + '/' + next,
        })
    },
}
