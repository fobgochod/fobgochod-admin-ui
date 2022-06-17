<template>
    <el-card class='card' shadow='never'>
        <div slot='header'>
            <span>数据统计</span>
        </div>
        <div>
            <el-row :gutter='20'>
                <el-col :span='16'>
                    <div id='chart1' style='width:100%;height:400px'></div>
                </el-col>
                <el-col :span='8'>
                    <div id='chart2' class='grid-content bg-purple' style='width:100%;height:400px'></div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
import 'echarts/theme/macarons.js'
import {mapState} from 'vuex'
import Stats from '@/api/system/stats'

export default {
    data() {
        return {
            tableData: [],
            tenantSizes: [],
            sizes: [],
            tenantFiles: [],
            files: [],
            limit: 6
        }
    },
    computed: {
        ...mapState(['baseUri'])
    },
    methods: {
        getData() {
            Stats.getTotal(this.limit).then(res => {
                this.tableData = res.data

                this.tenantSizes = this.tableData.tenantSizes
                this.sizes = this.tableData.sizes
                this.tenantFiles = this.tableData.tenantFiles
                this.files = this.tableData.files
                this.drawBar()
                this.drawPie()
            })
        },
        drawBar() {
            let chart1 = this.$echarts.init(document.getElementById('chart1'), 'light')
            chart1.setOption({
                title: {
                    text: '租户文件个数前' + this.limit + '统计'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: '{a} <br/>{b} : {c} (个)'
                },
                legend: {
                    data: ['租户文件个数']
                },
                xAxis: {
                    type: 'category',
                    data: this.tenantFiles,
                    axisLabel: {
                        interval: 0,
                        rotate: 15
                    }
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '租户文件个数',
                    type: 'bar',
                    data: this.files
                }]
            })
        },
        drawPie() {
            let chart2 = this.$echarts.init(document.getElementById('chart2'), 'light')
            chart2.setOption({
                title: {
                    text: '租户文件用量前' + this.limit + '统计',
                    left: 'center'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: '{a} ({d}%) <br/>{b} : {c} (GB)'
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: this.tenantSizes
                },
                series: [
                    {
                        name: '租户占比',
                        type: 'pie',
                        radius: '55%',
                        center: ['40%', '60%'],
                        data: this.sizes,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            })
        }
    },
    mounted() {
        this.getData()
    }
}
</script>

<style scoped>
</style>
