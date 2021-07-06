import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/directory',
            data: data,
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/directory',
            data: data,
        })
    },
    getData() {
        return axios({
            method: 'get',
            url: '/directory',
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/directory/search',
            data: data,
        })
    },
    getDirInfo(dirId) {
        return axios({
            method: 'get',
            url: '/buckets/directorys/' + dirId + '/list',
        })
    },
}
