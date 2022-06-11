<template>
    <div class='body'>
        <el-container class='hidden-xs-only'>
            <el-header height='30px'>
                <el-descriptions class='margin-top' :title='`${userName}(${tableData.length})`' border>
                    <template slot='extra'>
                        <el-button type='danger' plain size='small' @click='eat'>点我吃药</el-button>
                    </template>
                </el-descriptions>
            </el-header>
            <el-main>
                <el-descriptions :title='item.name' :column='4' border style='padding-top: 2vw'
                                 v-for='item in tableData' :key='item'>
                    <template slot='extra'>
                        <el-tag type='primary'>{{ item.remain }}天</el-tag>
                    </template>
                    <el-descriptions-item label='编号'>{{ item.code }}</el-descriptions-item>
                    <el-descriptions-item label='名称' label-class-name='my-label' content-class-name='my-content'
                                          :span='3'>{{ item.name }}
                    </el-descriptions-item>
                    <el-descriptions-item label='总数'>{{ item.total }}</el-descriptions-item>

                    <el-descriptions-item :label=subItem.type v-for='subItem in item.items' :key='subItem'>
                        <span v-if='subItem.state'>{{ subItem.slice }}</span>
                        <el-tag v-else type='danger' effect='plain' size='small'>{{ subItem.slice }}
                        </el-tag>
                    </el-descriptions-item>
                </el-descriptions>
            </el-main>
        </el-container>

        <el-container class='hidden-sm-and-up'>
            <el-header>
                <span style='font-weight:900; font-size: 25px;'>{{ userName }}({{ tableData.length }})</span>
                <el-tag type='danger' style='float:right' @click='eat'>点我吃药</el-tag>
            </el-header>
            <el-main>
                <el-descriptions :title='item.name' :column='4' direction='vertical' border style='padding-top: 2vw'
                                 v-for='item in tableData' :key='item'>
                    <template slot='extra'>
                        <el-tag type='primary'>{{ item.remain }}天</el-tag>
                    </template>
                    <el-descriptions-item label='编号'>{{ item.code }}</el-descriptions-item>
                    <el-descriptions-item label='名称' label-class-name='my-label' content-class-name='my-content'
                                          :span='3'>{{ item.name }}
                    </el-descriptions-item>
                    <el-descriptions-item label='总数'>{{ item.total }}</el-descriptions-item>

                    <el-descriptions-item :label=subItem.type v-for='subItem in item.items' :key='subItem'>
                        <span v-if='subItem.state'>{{ subItem.slice }}</span>
                        <el-tag v-else type='danger' effect='plain' size='small'>{{ subItem.slice }}
                        </el-tag>
                    </el-descriptions-item>
                </el-descriptions>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import MyMedicine from '@/api/medicine/my.medicine'
import {mapState} from 'vuex'
import '@/assets/js/date.format'

export default {
    data() {
        return {
            userName: '',
            tableData: []
        }
    },
    computed: {
        ...mapState(['userCode']),
        me() {
            if (this.$route.path === '/medicines/today') {
                return this.userCode
            }
            return this.$route.params.userCode
        }
    },
    methods: {
        medicine() {
            MyMedicine.me(this.me)
            .then((res) => {
                this.userName = res.data.userName
                this.tableData = res.data.medicines
            })
        },
        eat() {
            MyMedicine.meEat(this.me).then(() => {
                this.medicine()
                this.$notify({
                    title: '提示',
                    message: '<p>操作：吃药成功</p><p>操作人：' + this.userName + '</p><p>操作时间：' + new Date().format('Y-m-d H:i:s') + '</p>',
                    dangerouslyUseHTMLString: true,
                    showClose: false,
                    type: 'success',
                    position: 'bottom-left'
                })
            })
        }
    },
    mounted() {
        this.medicine()
    }
}
</script>

<style scoped>
/*pc*/
@media screen and (min-width: 768px) {
    .body {
        margin: auto;
    }

    .el-header {
        padding: 10px 0;
    }

    .el-main {
        padding: 2px 0;
    }
}

/*phone*/
@media screen and (max-width: 767px) {
    .body {
        padding: 0 4vw;
    }

    .el-header {
        padding: 2vw;
    }

    .el-main {
        padding: 0 2vw;
    }

    .my-label {
        background: #E1F3D8;
    }

    .my-content {
        background: #FDE2E2;
    }
}
</style>
