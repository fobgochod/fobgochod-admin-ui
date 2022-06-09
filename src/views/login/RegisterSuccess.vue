<template>
    <div id="success">
        <div style="text-align: center;">
            <img alt="Vue logo" src="../../assets/logo.png">
        </div>
        <div>
            <el-table :data="tableData" border stripe>
                <el-table-column label="标题" prop="name" width="100px"></el-table-column>
                <el-table-column label="内容" prop="value"></el-table-column>
            </el-table>
        </div>
        <div class="line"></div>
        <div class="note">请妥善保管好账密信息。若忘记密码，请联系管理员重置。</div>

        <el-link style="float:right" @click="to('/')">登录</el-link>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [
                {
                    name: 'Bucket',
                    value: sessionStorage.getItem("bucket")
                },
                {
                    name: '账号',
                    value: sessionStorage.getItem("username")
                },
                {
                    name: '密码',
                    value: sessionStorage.getItem("pwdhash")
                },
            ]
        };
    },
    methods: {
        to(link) {
            this.$router.push(link)
        }
    }
};
</script>

<style scoped>
#success {
    width: 600px;
    margin: 20px auto;
    text-align: center;
}

.line {
    margin: 10px auto;
    width: 600px;
    height: 5px;
    background-color: #67C23A;
}

.note {
    color: red;
}
</style>
