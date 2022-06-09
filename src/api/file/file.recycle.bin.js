import axios from '@/config/http'

export default {
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/recycle/search',
            data: data
        })
    },
    deleteBin(id, recycleIds) {
        return axios({
            method: 'post',
            url: '/file/recycle/delete',
            data: {
                id: id,
                recycleIds: recycleIds
            }
        })
    },
    restoreBin(id, recycleIds) {
        return axios({
            method: 'post',
            url: '/file/recycle/restore',
            data: {
                id: id,
                recycleIds: recycleIds
            }
        })
    },
    emptyBin() {
        return axios({
            method: 'post',
            url: '/file/recycle/clear'
        })
    }
}
