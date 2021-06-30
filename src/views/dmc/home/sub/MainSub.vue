<template>
    <el-card class="card" shadow="never">
        <div slot="header" class="clearfix">
            <span>文档中心数据统计</span>
        </div>
        <div>
            <el-row :gutter="20">
                <el-col :span="16">
                    <div id="chart1" style="width:100%;height:400px"></div>
                </el-col>
                <el-col :span="8">
                    <div id="chart2" class="grid-content bg-purple" style="width:100%;height:400px"></div>
                </el-col>
            </el-row>
        </div>
    </el-card>
</template>

<script>
import "echarts/theme/macarons.js";
import {mapState} from "vuex";
import Stats from '@/api/system/stats'

export default {
    data() {
        return {
            realData: [],
            bucketSizes: [],
            sizes: [],
            bucketFiles: [],
            files: [],
            limit: 6
        };
    },
    computed: {
        ...mapState(['baseUri']),
    },
    methods: {
        getData() {
            Stats.getTotal(this.limit).then(res => {
                this.realData = res.data.data;

                this.bucketSizes = this.realData.bucketSizes;
                this.sizes = this.realData.sizes;
                this.bucketFiles = this.realData.bucketFiles;
                this.files = this.realData.files;
                this.drawBar();
                this.drawPie()
            });
        },
        drawBar() {
            let chart1 = this.$echarts.init(document.getElementById("chart1"), 'light');
            chart1.setOption({
                title: {
                    text: 'Bucket文件个数前' + this.limit + '统计',
                },
                tooltip: {
                    trigger: "axis",
                    formatter: "{a} <br/>{b} : {c} (个)",
                },
                legend: {
                    data: ['Bucket文件个数']
                },
                xAxis: {
                    type: "category",
                    data: this.bucketFiles,
                    axisLabel: {
                        interval: 0,
                        rotate: 15,
                    },
                },
                yAxis: {
                    type: "value",
                },
                series: [{
                    name: 'Bucket文件个数',
                    type: "bar",
                    data: this.files
                }]
            });
        },
        drawPie() {
            let chart2 = this.$echarts.init(document.getElementById("chart2"), 'light');
            chart2.setOption({
                title: {
                    text: 'Bucket用量前' + this.limit + '统计',
                    left: "center",
                },
                tooltip: {
                    trigger: "item",
                    formatter: "{a} ({d}%) <br/>{b} : {c} (GB)",
                },
                legend: {
                    orient: 'vertical',
                    left: 'right',
                    data: this.bucketSizes
                },
                series: [
                    {
                        name: "Bucket占比",
                        type: "pie",
                        radius: "55%",
                        center: ["40%", "60%"],
                        data: this.sizes,
                        emphasis: {
                            itemStyle: {
                                shadowBlur: 10,
                                shadowOffsetX: 0,
                                shadowColor: "rgba(0, 0, 0, 0.5)",
                            },
                        },
                    },
                ],
            });
        },
    },
    mounted() {
        this.getData();
    },
};
</script>

<style scoped>
.card {
    min-height: 50vh;
}
</style>