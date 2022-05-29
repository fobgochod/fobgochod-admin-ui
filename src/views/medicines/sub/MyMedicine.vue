<template>
    <div class='body'>
        <el-container class='hidden-xs-only'>
            <el-header>
                <el-tag>{{ userName }}</el-tag>
                <el-tag type='danger' style='float:right' @click='eat'>点我吃药</el-tag>
            </el-header>
            <el-main>
                <el-table :data='realData' border stripe default-expand-all>
                    <el-table-column type='expand'>
                        <template v-slot='scope'>
                            <el-table :data='scope.row.items' border stripe :show-header=false>
                                <el-table-column align='center' label='序号' type='index' width='60'></el-table-column>
                                <el-table-column align='center' label='类型' property='type'
                                                 width='100'></el-table-column>
                                <el-table-column align='center' label='开始' property='start'
                                                 width='100'></el-table-column>
                                <el-table-column align='center' label='结束' property='end' width='100'></el-table-column>
                                <el-table-column label='片' property='slice' width='100'>
                                    <template v-slot='scope'>
                                        <el-tag v-if='scope.row.state' size='small'>{{ scope.row.slice }}</el-tag>
                                        <span v-else>{{ scope.row.slice }}</span>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </template>
                    </el-table-column>
                    <el-table-column label='编号' property='code'></el-table-column>
                    <el-table-column label='名称' property='name'></el-table-column>
                    <el-table-column label='总数' property='total'></el-table-column>
                    <el-table-column label='剩余(天)' property='remain'></el-table-column>
                </el-table>
            </el-main>
        </el-container>

        <el-container class='hidden-sm-and-up'>
            <el-header>
                <span style='font-weight:900; font-size: 25px;'>{{ userName }}</span>
                <el-tag type='danger' style='float:right' @click='eat'>点我吃药</el-tag>
            </el-header>
            <el-main>
                <el-descriptions :title='item.name' :column='4' direction='vertical' border style='padding-top: 2vw'
                                 v-for='item in realData' :key='item'>
                    <template slot='extra'>
                        <el-tag type='primary'>{{ item.remain }}天</el-tag>
                    </template>
                    <el-descriptions-item label='编号'>{{ item.code }}</el-descriptions-item>
                    <el-descriptions-item label='名称' label-class-name='my-label' content-class-name='my-content'
                                          :span='3'>{{ item.name }}
                    </el-descriptions-item>
                    <el-descriptions-item label='总数'>{{ item.total }}</el-descriptions-item>

                    <el-descriptions-item :label=subItem.type v-for='subItem in item.items' :key='subItem'>
                        <el-tag v-if='subItem.state' size='small'>{{ subItem.slice }}</el-tag>
                        <span v-else>{{ subItem.slice }}</span>
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
            realData: []
        }
    },
    computed: {
        ...mapState(['userId']),
        me() {
            if (this.$route.path === '/medicines/today') {
                return this.userId
            }
            return this.$route.params.userId
        }
    },
    methods: {
        medicine() {
            MyMedicine.me(this.me)
            .then((res) => {
                this.userName = res.data.userName
                this.realData = res.data.medicines
            })
        },
        eat() {
            MyMedicine.eat(this.me).then(() => {
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
