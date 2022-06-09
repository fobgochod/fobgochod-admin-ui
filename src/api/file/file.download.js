import axios from '@/config/http'
import store from '@/store'

export default {
    previewUrl(fileId) {
        return store.state.baseUri + '/file/preview?fileId=' + fileId
    },
    preview(fileId) {
        return axios({
            method: 'get',
            url: '/file/preview?fileId=' + fileId,
            responseType: 'blob'
        })
    },
    download(fileId) {
        return axios({
            method: 'get',
            url: '/file/download?fileId=' + fileId,
            responseType: 'blob'
        })
    },
    downloadDir(dirId) {
        return axios({
            method: 'get',
            url: '/file/download/dir?dirId=' + dirId,
            responseType: 'blob'
        })
    },
    batchDownload(data) {
        return axios({
            method: 'post',
            url: '/file/download/multi',
            data: data,
            responseType: 'blob'
        })
    }
}
