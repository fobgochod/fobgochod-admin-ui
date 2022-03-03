<template>
    <div class='body'>
        <el-container class='hidden-xs-only'>
            <el-header>
                <el-tag>{{ userName }}</el-tag>
                <el-tag type='danger' style='float:right' @click='eat'>点我吃药</el-tag>
            </el-header>
            <el-main>
                <el-table :data='realData' border stripe style='width: 100%'>
                    <el-table-column label='编号' property='code'></el-table-column>
                    <el-table-column label='名称' property='name'></el-table-column>
                    <el-table-column label='总数' property='total'></el-table-column>
                    <el-table-column label='早' property='morning'></el-table-column>
                    <el-table-column label='中' property='noon'></el-table-column>
                    <el-table-column label='晚' property='night'></el-table-column>
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
                    <el-descriptions-item label='早'>
                        <el-tag v-if='item.morningB' size='small'>{{ item.morning }}</el-tag>
                        <span v-else>{{ item.morning }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item label='中'>
                        <el-tag v-if='item.noonB' size='small'>{{ item.noon }}</el-tag>
                        <span v-else>{{ item.noon }}</span>
                    </el-descriptions-item>
                    <el-descriptions-item label='晚'>
                        <el-tag v-if='item.nightB' size='small'>{{ item.night }}</el-tag>
                        <span v-else>{{ item.night }}</span>
                    </el-descriptions-item>
                </el-descriptions>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import Medicine from '@/api/spda/medicine'
import MedicineRecord from '@/api/spda/medicine.record'

export default {
    data() {
        return {
            userName: '',
            realData: []
        }
    },
    computed: {
        userId() {
            return this.$route.params.userId
        }
    },
    methods: {
        medicine() {
            Medicine.myMedicine(this.userId)
            .then((res) => {
                this.userName = res.data.userName
                this.realData = res.data.medicines
            })
        },
        eat() {
            MedicineRecord.eat(this.userId).then(() => {
                this.$notify.success({
                    title: '成功',
                    message: '吃药成功',
                    position: 'bottom-right'
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
        width: 800px;
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
