<template>
    <div>
        <div @click="about">
            <i class="el-icon-warning-outline"/>
            <span>关于</span>
        </div>
    </div>
</template>

<script>
import '@/assets/js/date.format';

export default {
    methods: {
        about() {
            this.$notify({
                title: '版本信息',
                message: '<p>名称：fobgochod Admin</p><p>版本：1.0.0</p><p>更新时间：2020-02-02 20:02:02</p><p>当前时间：' + new Date().format('Y-m-d H:i:s') + '</p>',
                dangerouslyUseHTMLString: true,
                offset: 200,
                showClose: false
            });
        }
    }
};
</script>

<style scoped>

</style>
