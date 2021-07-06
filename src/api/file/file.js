import axios from '@/config/http'

export default {
    delFileForce(fileId) {
        return axios({
            method: 'delete',
            url: '/file/delete/force/' + fileId,
        })
    },
    delFile(fileId) {
        return axios({
            method: 'delete',
            url: '/file/delete/' + fileId,
        })
    },
    shareFile(data) {
        return axios({
            method: 'post',
            url: '/file/share',
            data: data,
        })
    },

    shareFile1(data) {
        return axios({
            method: 'post',
            url: '/buckets/ShareFiles',
            data: data,
        })
    },
    shareFileDays(data, days) {
        return axios({
            method: 'post',
            url: '/buckets/ShareFiles/d/' + days,
            data: data,
        })
    },

    batchDelFileForce(data) {
        return axios({
            method: 'post',
            url: '/file/delete/force',
            data: data,
        })
    },
    batchDelFile(data) {
        return axios({
            method: 'post',
            url: '/file/delete',
            data: data,
        })
    },
}
