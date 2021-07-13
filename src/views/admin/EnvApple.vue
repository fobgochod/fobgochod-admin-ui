<template>
    <frame-space>
        <el-form label-width='140px' style='width: 600px'>
            <el-form-item label='当前环境'>
                <el-input v-model='baseUri' disabled></el-input>
            </el-form-item>
            <el-form-item label='当前登陆租户'>
                <el-select v-model='tenantId' :loading='loading' :remote-method='getTenant' clearable
                           filterable @change='changeTenantId'>
                    <el-option-group v-for='group in tenants'
                                     :key='group.key'
                                     :label='group.label'>
                        <el-option v-for='item in group.options'
                                   :key='item.key'
                                   :value='item.value'
                                   :label='item.label'>
                            <span style='float: left'>{{item.value}}({{item.label}})</span>
                            <span style='float: right; color: #8492a6; font-size: 13px'>{{item.other}}</span>
                        </el-option>
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item label='当前登陆用户'>
                <div>{{userName}}({{userId}})</div>
            </el-form-item>
            <el-form-item label='当前用户Token'>
                <div style='word-wrap:break-word;line-height:30px;'>{{userToken}}</div>
            </el-form-item>
        </el-form>
    </frame-space>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import Login from '@/api/home/login'
import Tenant from '@/api/system/tenant'

export default {
    data() {
        return {
            tenants: [],
            token: '',
            loading: false
        }
    },
    computed: mapState(['baseUri', 'tenantId', 'userId', 'userName', 'userToken']),
    methods: {
        ...mapMutations(['setBucket', 'setTenantId', 'setUserToken']),
        changeTenantId(val) {
            Login.refresh(val).then(res => {
                this.setUserToken(res.data.userToken)
            })
            this.setTenantId(val)
            this.$message.success('设置登录租户成功')
        },
        async getTenant() {
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
