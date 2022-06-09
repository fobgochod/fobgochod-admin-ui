import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/directory/add',
            data: data
        })
    },
    delData(data) {
        return axios({
            method: 'post',
            url: '/directory/del',
            data: data
        })
    },
    modData(data) {
        return axios({
            method: 'post',
            url: '/directory/mod',
            data: data
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/directory/search',
            data: data
        })
    },
    getDirInfo(dirId) {
        return axios({
            method: 'post',
            url: '/directory/info',
            data: {
                id: dirId
            }
        })
    }
}
