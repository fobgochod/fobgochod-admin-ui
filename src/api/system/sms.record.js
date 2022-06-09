import axios from '@/config/http'

export default {
    addData(data) {
        return axios({
            method: 'post',
            url: '/sms/records/add',
            data: data
        })
    },
    delData(data) {
        return axios({
            method: 'post',
            url: '/sms/records/del',
            data: data
        })
    },
    modData(data) {
        return axios({
            method: 'post',
            url: '/sms/records/mod',
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
    batchDel(data) {
        return axios({
            method: 'post',
            url: '/sms/records/delete',
            data: data
        })
    },
    testSms() {
        return axios({
            method: 'post',
            url: '/sms/records/test'
        })
    }
}
