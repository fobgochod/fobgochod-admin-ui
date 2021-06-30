import axios from '@/config/http'

export default {
    delFileForce(fileId) {
        return axios({
            method: 'delete',
            url: '/api/dmc/v2/file/delete/force/' + fileId,
        })
    },
    delFile(fileId) {
        return axios({
            method: 'delete',
            url: '/api/dmc/v2/file/delete/' + fileId,
        })
    },
    shareFile(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/file/share',
            data: data,
        })
    },

    shareFile1(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v1/buckets/ShareFiles',
            data: data,
        })
    },
    shareFileDays(data, days) {
        return axios({
            method: 'post',
            url: '/api/dmc/v1/buckets/ShareFiles/d/' + days,
            data: data,
        })
    },

    batchDelFileForce(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/file/delete/force',
            data: data,
        })
    },
    batchDelFile(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/file/delete',
            data: data,
        })
    },
}
