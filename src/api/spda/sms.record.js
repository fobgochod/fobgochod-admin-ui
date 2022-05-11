import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/sms/records',
            data: data
        })
    },
    delData(id) {
        return axios({
            method: 'delete',
            url: '/sms/records/' + id
        })
    },
    batchDel(data) {
        return axios({
            method: 'post',
            url: '/sms/records/delete',
            data: data
        })
    },
    modData(data) {
        return axios({
            method: 'put',
            url: '/sms/records',
            data: data
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/sms/records/search',
            data: data
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/sms/records/drop'
        })
    },
    testSms() {
        return axios({
            method: 'post',
            url: '/sms/records/test'
        })
    }
}
