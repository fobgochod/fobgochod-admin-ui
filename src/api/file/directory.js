import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/directory',
            data: data,
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/api/dmc/v2/directory',
            data: data,
        })
    },
    getData() {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/directory',
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/directory/search',
            data: data,
        })
    },
    getDirInfo(dirId) {
        return axios({
            method: 'get',
            url: '/api/dmc/v1/buckets/directorys/' + dirId + '/list',
        })
    },
}
