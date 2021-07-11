import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/share',
            data: data,
        })
    },
    delData(shareId) {
        return axios({
            method: 'delete',
            url: '/share/' + shareId,
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/share',
            data: data,
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/share/search',
            data: data,
        })
    },
    batchDelData(data) {
        return axios({
            method: 'post',
            url: '/share/delete',
            data: data,
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/share/drop',
        })
    },
}
