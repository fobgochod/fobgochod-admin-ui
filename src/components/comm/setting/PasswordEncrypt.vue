<template>
    <el-card shadow='never'>
        <div slot='header'>密码加密</div>
        <div>
            <el-form ref='form' label-width='80px'>
                <el-form-item label='密码'>
                    <el-input v-model='password'></el-input>
                </el-form-item>
                <el-form-item label='Base64'>
                    <el-input v-model='passwordBase64' disabled>
                        <el-button slot='append' icon='el-icon-copy-document' @click='copy("Base64")'></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label='AES'>
                    <el-input v-model='passwordAES' disabled>
                        <el-button slot='append' icon='el-icon-copy-document' @click='copy("AES")'></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label='RSA'>
                    <el-input v-model='passwordRSA' disabled>
                        <el-button slot='append' icon='el-icon-copy-document' @click='copy("RSA")'></el-button>
                    </el-input>
                </el-form-item>
                <el-form-item label='SHA'>
                    <el-input v-model='passwordSHA' disabled>
                        <el-button slot='append' icon='el-icon-copy-document' @click='copy("SHA")'></el-button>
                    </el-input>
                </el-form-item>
            </el-form>
        </div>
    </el-card>
</template>

<script>
import Secret from '@/assets/js/secret.js'

export default {
    data() {
        return {
            password: '',
            passwordBase64: '',
            passwordAES: '',
            passwordRSA: '',
            passwordSHA: ''
        }
    },
    methods: {
        copy(data) {
            if (data === 'Base64') {
                this.$copyText(this.passwordBase64)
            } else if (data === 'AES') {
                this.$copyText(this.passwordAES)
            } else if (data === 'RSA') {
                this.$copyText(this.passwordRSA)
            } else if (data === 'SHA') {
                this.$copyText(this.passwordSHA)
            }
            this.$notify({
                message: data + '复制成功',
                type: 'success',
                position: 'bottom-left'
            })
        }
    },
    watch: {
        password: function() {
            this.passwordBase64 = Secret.base64Encode(this.password)
            this.passwordAES = Secret.aesEnc(this.password)
            this.passwordRSA = Secret.rsaEnc(this.password)
            this.passwordSHA = Secret.sha256(this.password)
        }
    }
}
</script>

<style scoped>
.el-row {
    margin-bottom: 40px;
}

.hash {
    width: 100%;
    height: 40px;
    font-size: large;
    padding-top: 6px;
}
</style>
