<template>
    <el-row :gutter='20'>
        <el-col v-for='(car,index) in cardData' :key='index' :span='6'>
            <el-card shadow='never'>
                <div slot='header' class='clearfix'>
                        <span>
                            <i :class='car.headerIcon' />
                            {{ car.headerTitle }}
                        </span>
                    <div id='cycle' :style='{backgroundColor:car.headerCycleBackColor}'>{{ car.headerCycle }}</div>
                </div>
                <div>
                    <h1 style='font-size:150%;color:#909399'>{{ car.mainNum }}</h1>
                    <br />
                    <p style='float:left;color:#909399'>{{ car.footerTitle }}</p>
                    <p style='float:right;color:#909399'>
                        {{ car.footerNum }}
                        <i :class='car.footerIcon' />
                    </p>
                </div>
                <br />
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import Utils from '@/assets/js/utils'
import {mapState} from 'vuex'
import Stats from '@/api/system/stats'

export default {
    data() {
        return {
            cardData: [
                {
                    headerIcon: 'el-icon-trophy',
                    headerTitle: '文件',
                    headerCycle: '月',
                    headerCycleBackColor: '#409EFF',
                    mainNum: 0,
                    footerTitle: '文件个数',
                    footerNum: 0,
                    footerIcon: 'el-icon-trophy'
                },
                {
                    headerIcon: 'el-icon-download',
                    headerTitle: '磁盘',
                    headerCycle: '月',
                    headerCycleBackColor: '#67C23A',
                    mainNum: 0,
                    footerTitle: '文件总量',
                    footerNum: 0,
                    footerIcon: 'el-icon-download'
                },
                {
                    headerIcon: 'el-icon-coin',
                    headerTitle: 'Tenant',
                    headerCycle: '年',
                    headerCycleBackColor: '#F56C6C',
                    mainNum: 0,
                    footerTitle: 'Tenant总数',
                    footerNum: 0,
                    footerIcon: 'el-icon-coin'
                },
                {
                    headerIcon: 'el-icon-user-solid',
                    headerTitle: '用户',
                    headerCycle: '年',
                    headerCycleBackColor: '#E6A23C',
                    mainNum: 0,
                    footerTitle: '用户总数',
                    footerNum: 0,
                    footerIcon: 'el-icon-user'
                }
            ]
        }
    },
    computed: {
        ...mapState(['baseUri'])
    },
    methods: {
        getCounts() {
            Stats.getCount().then(res => {
                let mongo = res.data

                let fileCount = mongo.fileCount == null ? 0 : mongo.fileCount
                let totalSize = Utils.byteSwitch(mongo.totalSize)
                let tenantCount = mongo.tenantCount == null ? 0 : mongo.tenantCount
                let userCount = mongo.userCount == null ? 0 : mongo.userCount

                this.cardData[0].mainNum = fileCount
                this.cardData[0].footerNum = fileCount

                this.cardData[1].mainNum = totalSize
                this.cardData[1].footerNum = totalSize

                this.cardData[2].mainNum = tenantCount
                this.cardData[2].footerNum = tenantCount

                this.cardData[3].mainNum = userCount
                this.cardData[3].footerNum = userCount
            })
        }
    },
    mounted() {
        this.getCounts()
    }
}
</script>

<style scoped>
#cycle {
    width: 30px;
    height: 25px;
    float: right;
    border-radius: 3px;
    color: white;
    padding-left: 10px;
}
</style>
