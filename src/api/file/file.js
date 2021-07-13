import axios from '@/config/http'

export default {
    delFile(fileId) {
        return axios({
            method: 'delete',
            url: '/file/delete/' + fileId,
        })
    },
    batchDelFile(data) {
        return axios({
            method: 'post',
            url: '/file/delete',
            data: data,
        })
    },
    delFileForce(fileId) {
        return axios({
            method: 'delete',
            url: '/file/delete/force/' + fileId,
        })
    },
    batchDelFileForce(data) {
        return axios({
            method: 'post',
            url: '/file/delete/force',
            data: data,
        })
    },
    shareFile(data) {
        return axios({
            method: 'post',
            url: '/file/share',
            data: data,
        })
    },
}
