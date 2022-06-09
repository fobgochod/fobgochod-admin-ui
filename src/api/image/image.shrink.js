import axios from '@/config/http'

export default {
    delData(data) {
        return axios({
            method: 'post',
            url: '/shrink/del',
            data: data
        })
    },
    getByPage(data) {
        return axios({
            method: 'post',
            url: '/shrink/search',
            data: data
        })
    },
    shrinkImage(data) {
        return axios({
            method: 'post',
            url: '/file/images/shrink',
            data: data
        })
    }
}
