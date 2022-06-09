import axios from '@/config/http'

export default {
    modData(data) {
        return axios({
            method: 'post',
            url: '/fileinfo/mod',
            data: data
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/fileinfo/search',
            data: data
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/fileinfo/drop'
        })
    },
    changeName(fileId, fileName) {
        return axios({
            method: 'post',
            url: '/fileinfo/change/name',
            data: {
                id: fileId,
                name: fileName
            }
        })
    }
}
