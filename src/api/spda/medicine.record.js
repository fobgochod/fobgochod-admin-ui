import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/medicine/records',
            data: data
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/medicine/records/' + id
        })
    },
    batchDel(data) {
        return axios({
            method: 'post',
            url: '/medicine/records/delete',
            data: data
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/medicine/records',
            data: data
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/medicine/records/search',
            data: data
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/medicine/records/drop'
        })
    },
    eat(userId) {
        return axios({
            method: 'post',
            url: '/medicines/eat',
            data: {
                userId: userId
            }
        })
    },
    eatDay(userId, date) {
        return axios({
            method: 'post',
            url: '/medicines/eat/day',
            data: {
                userId: userId,
                date: date
            }
        })
    }
}
