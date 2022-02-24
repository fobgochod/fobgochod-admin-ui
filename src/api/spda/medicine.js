import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/medicines',
            data: data,
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/medicines/' + id,
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/medicines',
            data: data,
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/medicines/search',
            data: data,
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/medicines/drop',
        })
    },
    myMedicine(userId) {
        return axios({
            method: 'post',
            url: '/medicines/me',
            data: {
                userId: userId,
            },
        })
    },
}
