import axios from '@/config/http'

export default {
    getData() {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/recycle',
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/recycle/search',
            data: data,
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/api/dmc/v2/file/recycle/delete/' + id,
        })
    },
    recoveryData(id) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/file/recycle/restore/' + id,
        })
    },
    emptyData() {
        return axios({
            method: 'delete',
            url: '/api/dmc/v2/file/recycle/clear',
        })
    },
}
