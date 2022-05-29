import axios from '@/config/http'

export default {
    getMenu() {
        return axios({
            method: 'post',
            url: '/profiles/menu'
        })
    }
}
