import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/menus',
            data: data
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/menus/' + id
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/menus',
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
