import axios from '@/config/http'

export default {
    delData(id) {
        return axios({
            method: 'delete',
            url: '/shrink/' + id,
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/shrink/search',
            data: data,
        })
    },
    getImageByPage(data) {
        return axios({
            method: 'post',
            url: '/image/search',
            data: data,
        })
    },
    shrinkImage(shrink) {
        return axios({
            method: 'get',
            url: '/buckets/images/' + shrink.fileId,
            params: {
                width: shrink.width,
                height: shrink.height,
            },
        })
    },
}
