import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/medicine/items/add',
            data: data
        })
    },
    delData(data) {
        return axios({
            method: 'post',
            url: '/medicine/items/del',
            data: data
        })
    },
    modData(data) {
        return axios({
            method: 'post',
            url: '/medicine/items/mod',
            data: data
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/medicine/items/search',
            data: data
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/medicine/items/drop'
        })
    },
    batchDel(data) {
        return axios({
            method: 'post',
            url: '/medicine/items/delete',
            data: data
        })
    }
}
