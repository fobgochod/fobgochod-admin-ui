<template>
    <div id="login">
        <div style="text-align: center;">
            <img alt="Vue logo" src="../../assets/logo.png">
        </div>
        <div id="form_space">
            <div align="center">
                <h1>{{registerTitle}}</h1>
                <p>{{registerSubTitle}}</p>
            </div>
            <div style="padding:20px">
                <el-form ref="register_form" :model="registerForm" :rules="rules" class="demo-ruleForm" status-icon>
                    <el-form-item>
                        <el-input v-model="dmcUri" disabled prefix-icon="el-icon-coin"></el-input>
                    </el-form-item>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item prop="bucket">
                                <el-input v-model="registerForm.bucket" placeholder="请输入Bucket名称"
                                          prefix-icon="el-icon-coin"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item>
                                <el-input v-model="registerForm.owner" placeholder="请输入用户ID"
                                          prefix-icon="el-icon-user"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item>
                                <el-input v-model="registerForm.description" placeholder="请输入Bucket描述"
                                          prefix-icon="el-icon-tickets"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="password">
                                <el-input v-model="registerForm.password" placeholder="请输入用户密码"
                                          prefix-icon="el-icon-lock"
                                          show-password></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-row :gutter="20">
                        <el-col :span="12">
                            <el-form-item>
                                <el-select v-model="registerForm.task" placeholder="请选择文件删除计划" style="width: 100%">
                                    <i slot="prefix" class="el-input__icon el-icon-delete"></i>
                                    <el-option v-for="item in tasks" :key="item.value" :label="item.label"
                                               :value="item.value">
                                        <span style="float: left">{{item.value}}</span>
                                        <span
                                            style="float: right; color: #8492a6; font-size: 13px">{{item.label}}</span>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item prop="passwordVerify">
                                <el-input v-model="registerForm.passwordVerify" placeholder="请再次输入用户密码"
                                          prefix-icon="el-icon-lock"
                                          show-password></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>

                    <el-form-item align="center">
                        <el-button icon="el-icon-back" type="success" @click="register('register_form')">申请</el-button>
                    </el-form-item>

                    <el-form-item>
                        <el-link style="float:left" type="danger" @click="to('/')">登录</el-link>
                        <el-link style="float:right" type="primary" @click="to('/change/password')">修改密码</el-link>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>
<script>
import {mapState} from "vuex";
import Bucket from '@/api/system/bucket'

export default {
    data() {
        let validateBucket = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入Bucket名称'));
            } else if (value.indexOf('.') >= 0) {
                callback(new Error('Bucket名称不能包含点.'));
            } else {
                callback();
            }
        };
        let validatePassword = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请输入密码'));
            } else {
                if (this.registerForm.passwordVerify !== '') {
                    this.$refs.register_form.validateField('passwordVerify');
                }
                callback();
            }
        };
        let validatePasswordVerify = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'));
            } else if (value !== this.registerForm.password) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            registerTitle: "首次开通申请",
            registerSubTitle: '',
            registerForm: {
                bucket: "",
                description: "",
                owner: "",
                password: "",
                passwordVerify: "",
                task: "",
            },
            tasks: [],
            rules: {
                bucket: [
                    {validator: validateBucket, trigger: 'blur'}
                ],
                password: [
                    {validator: validatePassword, trigger: 'blur'}
                ],
                passwordVerify: [
                    {validator: validatePasswordVerify, trigger: 'blur'}
                ],
            }
        };
    },
    computed: mapState(['baseUri']),
    methods: {
        register(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    Bucket.apply(this.registerForm).then(res => {
                        sessionStorage.setItem("bucket", this.registerForm.bucket);
                        sessionStorage.setItem("username", this.registerForm.owner);
                        sessionStorage.setItem("pwdhash", res.data.data);
                        this.$router.push("/register/success");
                        this.$message.success("申请成功");
                    }).catch(res => {
                        this.$message.error("申请失败：" + res.response.data.message);
                    });
                } else {
                    return false;
                }
            });
        },
        to(link) {
            this.$router.push(link)
        },
        getTask() {
            Bucket.getOptions().then(res => {
                this.tasks = res.data.data.map(v => ({value: v.code, label: v.title}));
                this.$message.success("查询策略成功");
            }).catch(() => {
                this.$message.error("查询策略失败");
            });
        }
    },
    mounted() {
        this.getTask();
    },
};
</script>

<style scoped>
h1 {
    color: #606266;
}

p {
    color: #606266;
}

#login {
    min-height: 100vh;
}

#form_space {
    border-radius: 10px;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 400px;
    width: 600px;
}
</style>
