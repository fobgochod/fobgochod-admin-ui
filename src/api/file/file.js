import axios from '@/config/http'

export default {
    delFile(id, fileIds) {
        return axios({
            method: 'post',
            url: '/file/delete',
            data: {
                id: id,
                fileIds: fileIds
            }
        })
    },
    delFileForce(id, fileIds) {
        return axios({
            method: 'post',
            url: '/file/delete/force',
            data: {
                id: id,
                fileIds: fileIds
            }
        })
    },

    delDir(id, dirIds) {
        return axios({
            method: 'post',
            url: '/file/delete/dir',
            data: {
                id: id,
                dirIds: dirIds
            }
        })
    },
    delDirForce(id, dirIds) {
        return axios({
            method: 'post',
            url: '/file/delete/dir/force',
            data: {
                id: id,
                dirIds: dirIds
            }
        })
    }

}
