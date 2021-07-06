import axios from '@/config/http'
import store from '@/store'

export default {
    modData(data) {
        return axios({
            method: 'put',
            url: '/fileinfo',
            data: data,
        })
    },
    changeName(fileId, fileName) {
        return axios({
            method: 'post',
            url: `/buckets/${store.state.bucket}/files/${fileId}/rename/${fileName}/`,
            data: {},
        })
    },
    completed(fileId, completed) {
        return axios({
            method: 'put',
            url: `/fileinfo/${fileId}/${completed}`,
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/fileinfo/search',
            data: data,
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/fileinfo/drop',
        })
    },
}
