import axios from '@/config/http'

export default {
    delData(id) {
        return axios({
            method: 'delete',
            url: '/stats/' + id,
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/stats/search',
            data: data,
        })
    },
    getCount() {
        return axios({
            method: 'get',
            url: '/stats/count',
        })
    },
    getTotal(limit) {
        return axios({
            method: 'get',
            url: '/stats/total?limit=' + limit,
        })
    },
    getIncrement(prev, next) {
        return axios({
            method: 'get',
            url: '/stats/increment/' + prev + '/' + next,
        })
    },
}
