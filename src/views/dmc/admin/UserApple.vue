<template>
    <frame-space>
        <el-card shadow='never'>
            <div slot='header'>个人信息设置</div>
            <div style='min-height:60vh;width:70%'>
                <el-form ref='form' :model='formData' label-width='100px'>
                    <el-form-item label='用户ID'>
                        <el-input v-model='formData.code' disabled title='用户ID不可修改'></el-input>
                    </el-form-item>
                    <el-form-item label='用户名'>
                        <el-input v-model='formData.name'></el-input>
                    </el-form-item>
                    <el-form-item label='Email'>
                        <el-input v-model='formData.email'></el-input>
                    </el-form-item>
                    <el-form-item label='手机'>
                        <el-input v-model='formData.telephone'></el-input>
                    </el-form-item>
                    <el-form-item label='角色'>
                        <el-radio-group v-model='formData.role' disabled>
                            <el-radio label='None'>None</el-radio>
                            <el-radio label='Owner'>Owner</el-radio>
                            <el-radio label='Admin'>Admin</el-radio>
                        </el-radio-group>
                    </el-form-item>

                    <el-form-item label='密码'>
                        <el-input v-model='formData.password' disabled></el-input>
                    </el-form-item>

                    <el-form-item>
                        <el-button type='primary' @click='onSubmit()'>保存设置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </frame-space>
</template>

<script>
import {mapMutations, mapState} from 'vuex'
import User from '@/api/system/user'

export default {
    data() {
        return {
            formData: {
                code: '',
                name: '',
                email: '',
                telephone: '',
                password: '',
                role: ''
            }
        }
    },
    computed: {
        ...mapState(['baseUri', 'userId'])
    },
    methods: {
        ...mapMutations(['setUserName']),
        getData() {
            User.getByName(this.userId).then((res) => {
                this.formData = res.data.data
            })
        },
        onSubmit() {
            User.changeName(this.formData).then(() => {
                this.setUserName(this.formData.name)
                this.$message.success('修改' + this.formData.name + '成功')
            }).catch(() => {
                this.$message.error('修改' + this.formData.name + '失败')
            })
        }
    },
    mounted() {
        this.getData()
    }
}
</script>
