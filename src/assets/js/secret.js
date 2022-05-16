import CryptoJS from 'crypto-js'
import Base64 from 'crypto-js/enc-base64'
import SHA256 from 'crypto-js/sha256'

const key = CryptoJS.enc.Utf8.parse('Cyrus·Smith____')

/**
 * 加密
 * @param data
 * @returns {string}
 */
function encrypt(data) {
    let srcs = CryptoJS.enc.Utf8.parse(data)
    let encrypted = CryptoJS.AES.encrypt(srcs, key, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
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
        padding: CryptoJS.pad.Pkcs7
    })
    return decrypt.toString(CryptoJS.enc.Utf8)
}

/**
 * 登陆密码加密
 * @param password
 * @returns {*}
 */
function encode(password) {
    return Base64.stringify(SHA256(SHA256(password)))
}

function base64Encode(data) {
    return Base64.stringify(CryptoJS.enc.Utf8.parse((data)))
}

function base64Decode(data) {
    return Base64.parse(data).toString(CryptoJS.enc.Utf8)
}


export default {
    encrypt,
    decrypt,
    encode,
    base64Encode,
    base64Decode
}
