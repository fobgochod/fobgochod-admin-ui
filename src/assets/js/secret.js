import CryptoJS from 'crypto-js'
import Base64 from 'crypto-js/enc-base64'
import SHA256 from 'crypto-js/sha256'

const key = CryptoJS.enc.Utf8.parse('46cc793c53dc451b')

/**
 * 加密
 * @param data
 * @returns {string}
 */
function encrypt(data) {
    let srcs = CryptoJS.enc.Utf8.parse(data)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    })
    return encrypted.toString()
}

/**
 * 解密
 * @param data
 * @returns {*}
 */
function decrypt(data) {
    let decrypt = CryptoJS.AES.decrypt(data, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
    })
    return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

/**
 * 登陆密码加密
 * @param password
 * @returns {*}
 */
function encode(password) {
    return Base64.stringify(SHA256(SHA256(password)))
}

export default {
    encrypt,
    decrypt,
    encode
}
