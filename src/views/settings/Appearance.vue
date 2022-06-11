<template>
    <frame-space>
        <el-row :gutter='20' style='margin-bottom: 20px'>
            <el-col :span='12'>
                <el-card shadow='never'>
                    <div slot='header'>
                        <span>环境参数</span>
                    </div>
                    <el-form label-width='140px' style='width: 600px'>
                        <el-form-item label='当前环境'>
                            <el-input v-model='baseUri' disabled></el-input>
                        </el-form-item>
                        <el-form-item label='当前登陆租户'>
                            <el-select v-model='tenantCode' :loading='loading' :remote-method='getTenant' clearable
                                       filterable @change='changeTenant'>
                                <el-option-group v-for='group in tenants'
                                                 :key='group.key'
                                                 :label='group.label'>
                                    <el-option v-for='item in group.options'
                                               :key='item.key'
                                               :value='item.value'
                                               :label='item.label'>
                                        <span style='float: left'>{{ item.value }}</span>
                                        <span style='float: right; color: #8492a6; font-size: 13px'>{{ item.label
                                            }}</span>
                                    </el-option>
                                </el-option-group>
                            </el-select>
                        </el-form-item>
                        <el-form-item label='当前登陆用户'>
                            <div>{{ userName }}({{ userCode }})</div>
                        </el-form-item>
                        <el-form-item label='当前用户Token'>
                            <div style='word-wrap:break-word;line-height:30px;'>{{ token }}</div>
                        </el-form-item>
                    </el-form>
                </el-card>
            </el-col>
            <el-col :span='12'>
                <fo-password-encrypt />
            </el-col>
        </el-row>
    </frame-space>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Tenant from '@/api/system/tenant'
import Login from '@/api/home/login'

export default {
    data() {
        return {
            tenants: [],
            loading: false
        }
    },
    computed: mapState(['baseUri', 'userCode', 'userName', 'tenantCode', 'token']),
    methods: {
        ...mapMutations(['setTenantCode', 'setToken']),
        changeTenant(val) {
            Login.refreshToken(val)
            .then(res => {
                this.setToken(res.data.token)
                this.setTenantCode(res.data.tenantCode)
            })
        },
        getTenant() {
            Tenant.getOptionGroups().then(res => {
                this.tenants = res.data
            }).catch(() => {
                this.tenants = []
            })
        }
    },
    mounted() {
        this.getTenant()
    }
}
</script>

<style scoped>
.el-select {
    width: 100%;
}
</style>
