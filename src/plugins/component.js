export default {
    FrameSpace: () => import('@/components/frame/FrameSpace'),
    TinyMce: () => import('@/components/tools/TinyMce'),

    FoDropCollection: () => import('@/components/comm/DropCollection.vue'),
    FoDataInfrastructure: () => import('@/components/comm/DataInfrastructure.vue'),

    FoPasswordEncrypt: () => import('@/components/comm/setting/PasswordEncrypt.vue'),

    FoTenantOption: () => import('@/components/comm/system/TenantOption.vue'),
    FoUserOption: () => import('@/components/comm/system/UserOption.vue'),
    FoRoleOption: () => import('@/components/comm/system/RoleOption.vue'),
    FoRoleRadio: () => import('@/components/comm/system/RoleRadio.vue'),
    FoRoleTag: () => import('@/components/comm/system/RoleTag.vue'),


    FoFileUpload: () => import('@/components/comm/file/FileUpload.vue'),
    FoFileUploadDrag: () => import('@/components/comm/file/FileUploadDrag.vue'),
    FoFileUploadMulti: () => import('@/components/comm/file/FileUploadMulti.vue'),
    FoFileUploadStream: () => import('@/components/comm/file/FileUploadStream.vue'),
    FoFileDownload: () => import('@/components/comm/file/FileDownload.vue'),
    FoFileDownloadMulti: () => import('@/components/comm/file/FileDownloadMulti.vue'),
    FoFileDownloadButton: () => import('@/components/comm/file/FileDownloadButton.vue')
}
