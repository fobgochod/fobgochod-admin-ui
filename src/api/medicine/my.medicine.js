import axios from '@/config/http'

export default {
    me(userId) {
        return axios({
            method: 'post',
            url: '/medicines/me',
            data: {
                userId: userId
            }
        })
    },
    eat(userId, date) {
        return axios({
            method: 'post',
            url: '/medicines/eat',
            data: {
                userId: userId,
                date: date
            }
        })
    }
}
