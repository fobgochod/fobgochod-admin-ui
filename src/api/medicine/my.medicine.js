import axios from '@/config/http'

export default {
    me(userCode) {
        return axios({
            method: 'post',
            url: '/medicines/me',
            data: {
                userCode: userCode
            }
        })
    },
    meEat(userCode) {
        return axios({
            method: 'post',
            url: '/medicines/me/eat',
            data: {
                userCode: userCode
            }
        })
    },
    eat(userCode, date) {
        return axios({
            method: 'post',
            url: '/medicines/eat',
            data: {
                userCode: userCode,
                date: date
            }
        })
    }
}
