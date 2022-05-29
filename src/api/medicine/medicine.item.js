import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/medicine/items',
            data: data
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/medicine/items/' + id
        })
    },
    batchDel(data) {
        return axios({
            method: 'post',
            url: '/medicine/items/delete',
            data: data
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/medicine/items',
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
    }
}
