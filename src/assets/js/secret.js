import CryptoJS from 'crypto-js'
import Base64 from 'crypto-js/enc-base64'
import SHA256 from 'crypto-js/sha256'
import JSEncrypt from 'encryptlong'
import {PRIVATE_KEY, PUBLIC_KEY, SECRET_KEY} from './id_rsa'

/**
 * 加密
 * @param dataStr
 * @returns {string}
 */
function aesEnc(dataStr) {
    const encryptSecretKey = sessionStorage.getItem(SECRET_KEY)
    let secretKeyBase64 = this.rsaDec(encryptSecretKey, PRIVATE_KEY)
    const secretKey = Base64.parse(secretKeyBase64)

    let data = CryptoJS.enc.Utf8.parse(dataStr)
    let encrypted = CryptoJS.AES.encrypt(data, secretKey, {
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
function aesDec(data) {
    const encryptSecretKey = sessionStorage.getItem(SECRET_KEY)
    let secretKeyBase64 = this.rsaDec(encryptSecretKey, PRIVATE_KEY)
    const secretKey = Base64.parse(secretKeyBase64)

    let decrypt = CryptoJS.AES.decrypt(data, secretKey, {
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
function sha256(password) {
    return Base64.stringify(SHA256(SHA256(password)))
}

function base64Encode(data) {
    return Base64.stringify(CryptoJS.enc.Utf8.parse((data)))
}

function base64Decode(data) {
    return Base64.parse(data).toString(CryptoJS.enc.Utf8)
}

function rsaEnc(data, publicKey) {
    if (!publicKey) {
        publicKey = PUBLIC_KEY
    }
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(publicKey)
    return encrypt.encryptLong(data)
}

function rsaDec(data, privateKey) {
    if (!privateKey) {
        privateKey = PRIVATE_KEY
    }
    const decrypt = new JSEncrypt()
    decrypt.setPrivateKey(privateKey)
    return decrypt.decryptLong(data)
}


export default {
    aesEnc,
    aesDec,
    sha256,
    base64Encode,
    base64Decode,
    rsaEnc,
    rsaDec
}
