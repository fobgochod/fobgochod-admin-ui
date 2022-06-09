import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/menus/add',
            data: data
        })
    },
    delData(data) {
        return axios({
            method: 'post',
            url: '/menus/del',
            data: data
        })
    },
    modData(data) {
        return axios({
            method: 'post',
            url: '/menus/mod',
            data: data
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/menus/search',
            data: data
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/menus/drop'
        })
    }
}
