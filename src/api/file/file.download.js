import axios from '@/config/http'

export default {
    previewUrl(fileInfoId) {
        return '/api/dmc/v2/file/preview/' + fileInfoId
    },
    preview(fileInfoId) {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/file/preview/' + fileInfoId,
            responseType: 'blob',
        })
    },
    download(fileInfoId) {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/file/download/' + fileInfoId,
            responseType: 'blob',
        })
    },
    downloadDir(dirId) {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/file/download/dir/' + dirId,
            responseType: 'blob',
        })
    },
    batchDownload(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/file/download/multi',
            data: data,
            responseType: 'blob',
        })
    },
}
