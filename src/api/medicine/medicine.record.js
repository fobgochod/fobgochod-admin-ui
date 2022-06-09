import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/medicine/records/add',
            data: data
        })
    },
    delData(data) {
        return axios({
            method: 'post',
            url: '/medicine/records/del',
            data: data
        })
    },
    modData(data) {
        return axios({
            method: 'post',
            url: '/medicine/records/mod',
            data: data
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/medicine/records/search',
            data: data
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/medicine/records/drop'
        })
    },
    batchDel(data) {
        return axios({
            method: 'post',
            url: '/medicine/records/delete',
            data: data
        })
    }
}
