import axios from '@/config/http'

export default {
    getData() {
        return axios({
            method: 'get',
            url: '/recycle',
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/recycle/search',
            data: data,
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/file/recycle/delete/' + id,
        })
    },
    recoveryData(id) {
        return axios({
            method: 'post',
            url: '/file/recycle/restore/' + id,
        })
    },
    emptyData() {
        return axios({
            method: 'delete',
            url: '/file/recycle/clear',
        })
    },
}
