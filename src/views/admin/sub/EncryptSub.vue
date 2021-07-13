<template>
    <el-card shadow="never">
        <div slot="header">Test-输入密码获取加密后的值</div>
        <div>
            <el-form ref="form" label-width="80px">
                <el-form-item label="密码">
                    <el-input v-model="password"></el-input>
                </el-form-item>
                <el-form-item label="加密值">
                    <el-tag effect="plain" size="medium" class="hash">{{passwordHash}}
                    </el-tag>
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
            passwordHash: ''
        }
    },
    watch: {
        password: function () {
            this.passwordHash = Secret.encode(this.password)
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