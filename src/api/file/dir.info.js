import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/directory',
            data: data,
        })
    },
    delData(dirId) {
        return axios({
            method: 'delete',
            url: '/directory' + dirId,
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
        return this.getByPage()
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
            url: '/directory/list/' + dirId,
        })
    },
}
