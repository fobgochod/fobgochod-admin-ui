import axios from '@/config/http'

export default {
    saveData(data) {
        return axios({
            method: 'post',
            url: '/menurole',
            data: data
        })
    },
    getById(roleId) {
        return axios({
            method: 'post',
            url: '/menurole/checked',
            data: {
                roleId: roleId
            }
        })
    },
    dropData() {
        return axios({
            method: 'delete',
            url: '/menusrole/drop'
        })
    }
}
