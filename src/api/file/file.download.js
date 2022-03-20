import axios from '@/config/http'
import store from '@/store'

export default {
    previewUrl(fileInfoId) {
        return store.state.baseUri + '/file/preview/' + fileInfoId
    },
    preview(fileInfoId) {
        return axios({
            method: 'get',
            url: '/file/preview/' + fileInfoId,
            responseType: 'blob'
        })
    },
    download(fileInfoId) {
        return axios({
            method: 'get',
            url: '/file/download/' + fileInfoId,
            responseType: 'blob'
        })
    },
    downloadDir(dirId) {
        return axios({
            method: 'get',
            url: '/file/download/dir/' + dirId,
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
