import axios from '@/config/http'
import store from '@/store'

export default {
    modData(data) {
        return axios({
            method: 'put',
            url: '/api/dmc/v2/fileinfo',
            data: data,
        })
    },
    changeName(fileId, fileName) {
        return axios({
            method: 'post',
            url: `/api/dmc/v1/buckets/${store.state.bucket}/files/${fileId}/rename/${fileName}/`,
            data: {},
        })
    },
    completed(fileId, completed) {
        return axios({
            method: 'put',
            url: `/api/dmc/v2/fileinfo/${fileId}/${completed}`,
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/fileinfo/search',
            data: data,
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/api/dmc/v2/fileinfo/drop',
        })
    },
}
