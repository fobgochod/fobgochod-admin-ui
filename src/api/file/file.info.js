import axios from '@/config/http'

export default {
    modData(data) {
        return axios({
            method: 'put',
            url: '/fileinfo',
            data: data,
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
    changeName(fileId, fileName) {
        return axios({
            method: 'post',
            url: `/fileinfo/name/${fileId}`,
            data: {
                name: fileName,
            },
        })
    },
    completed(fileId, completed) {
        return axios({
            method: 'post',
            url: `/fileinfo/${fileId}/${completed}`,
        })
    },
}
