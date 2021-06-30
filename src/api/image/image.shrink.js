import axios from '@/config/http'

export default {
    delData(id) {
        return axios({
            method: 'delete',
            url: '/api/dmc/v2/shrink/' + id,
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/shrink/search',
            data: data,
        })
    },
    getImageByPage(data) {
        return axios({
            method: 'post',
            url: '/api/dmc/v2/image/search',
            data: data,
        })
    },
    shrinkImage(shrink) {
        return axios({
            method: 'get',
            url: '/api/dmc/v2/buckets/images/' + shrink.fileId,
            params: {
                width: shrink.width,
                height: shrink.height,
            },
        })
    },
}
