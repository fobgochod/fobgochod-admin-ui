import axios from '@/config/http'

export default {
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/recycle/search',
            data: data,
        })
    },
    delData(recycleId) {
        return axios({
            method: 'delete',
            url: '/file/recycle/delete/' + recycleId,
        })
    },
    emptyData() {
        return axios({
            method: 'delete',
            url: '/file/recycle/clear',
        })
    },
    restore(recycleId) {
        return axios({
            method: 'post',
            url: '/file/recycle/restore/' + recycleId,
        })
    },
    batchRestore(data) {
        return axios({
            method: 'post',
            url: '/file/recycle/restore',
            data: data,
        })
    },
}
