import axios from '@/config/http'
import store from '@/store'

export default {
    uploadByStream(file, callback, directoryId) {
        this.formData = {
            name: file.name,
            displayName: null,
            tag: '文件',
            expireDate: new Date(2038, 1, 19, 11, 14, 7).format('Y-m-d H:i:s'),
            directoryId: directoryId,
            tenantId: store.state.tenantId,
        }
        let reader = new FileReader()
        reader.readAsArrayBuffer(file)
        reader.onload = (e) => {
            axios({
                method: 'post',
                url: '/buckets/files',
                headers: {
                    'digi-middleware-drive-arg': encodeURIComponent(JSON.stringify(this.formData)),
                },
                data: e.target.result,
                onUploadProgress: (progressEvent) => {
                    callback && callback(progressEvent)
                },
            })
                .then((res) => {
                    console.log(res)
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    },

    uploadByForm(file, callback, directoryId) {
        let formData = new FormData()
        formData.append('file', file)
        let fileInfo = {
            displayName: null,
            tag: '文件',
            expireDate: new Date(2038, 1, 19, 11, 14, 7).format('Y-m-d H:i:s'),
            directoryId: directoryId,
            tenantId: store.state.tenantId,
        }
        formData.append(
            'fileInfo',
            new Blob([JSON.stringify(fileInfo)], {
                type: 'application/json',
            })
        )
        return axios({
            method: 'post',
            url: '/file/upload',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            contentType: false,
            data: formData,
            onUploadProgress: (progressEvent) => {
                callback && callback(progressEvent)
            },
        })
    },
    getFileInfo(file) {
        this.formData = {}
        this.formData.name = file.name
        this.formData.displayName = null
        this.formData.tenantId = store.state.tenantId
        return encodeURIComponent(JSON.stringify(this.formData))
    },
    batchUpload(fileList, callback, directoryId) {
        let formData = new FormData()
        let fileInfos = []
        fileList.forEach((file, index) => {
            formData.append('files', file.raw)
            fileInfos[index] = {
                // name = file.raw.name
                displayName: null,
                tag: '文件',
                expireDate: new Date(2038, 1, 19, 11, 14, 7).format('Y-m-d H:i:s'),
                directoryId: directoryId,
                tenantId: store.state.tenantId,
            }
        })
        formData.append(
            'fileInfos',
            new Blob([JSON.stringify(fileInfos)], {
                type: 'application/json',
            })
        )
        return axios({
            method: 'post',
            url: '/file/upload/multi',
            headers: {
                'Content-Type': 'multipart/form-data',
            },
            contentType: false, //必须
            data: formData,
            onUploadProgress: (progressEvent) => {
                callback && callback(progressEvent)
            },
        })
    },
}
