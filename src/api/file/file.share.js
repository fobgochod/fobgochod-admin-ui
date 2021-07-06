import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/share',
            data: data,
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/share/' + id,
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
    batchDelSharedFile(data) {
        return axios({
            method: 'post',
            url: '/file/share/delete',
            data: data,
        })
    },
}
