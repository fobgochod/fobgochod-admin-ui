import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/medicines/add',
            data: data
        })
    },
    delData(data) {
        return axios({
            method: 'post',
            url: '/medicines/del',
            data: data
        })
    },
    modData(data) {
        return axios({
            method: 'post',
            url: '/medicines/mod',
            data: data
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/medicines/search',
            data: data
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/medicines/drop'
        })
    }
}
