import axios from '@/config/http'

export default {
    previewUrl(fileInfoId) {
        return '/file/preview/' + fileInfoId
    },
    preview(fileInfoId) {
        return axios({
            method: 'get',
            url: '/file/preview/' + fileInfoId,
            responseType: 'blob',
        })
    },
    download(fileInfoId) {
        return axios({
            method: 'get',
            url: '/file/download/' + fileInfoId,
            responseType: 'blob',
        })
    },
    downloadDir(dirId) {
        return axios({
            method: 'get',
            url: '/file/download/dir/' + dirId,
            responseType: 'blob',
        })
    },
    batchDownload(data) {
        return axios({
            method: 'post',
            url: '/file/download/multi',
            data: data,
            responseType: 'blob',
        })
    },
}
