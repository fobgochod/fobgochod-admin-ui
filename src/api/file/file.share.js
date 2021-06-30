import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/share',
            data: data,
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/api/dmc/v2/share/' + id,
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/api/dmc/v2/share',
            data: data,
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/share/search',
            data: data,
        })
    },
    batchDelSharedFile(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/file/share/delete',
            data: data,
        })
    },
}
