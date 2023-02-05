<template>
    <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: $route.path }">{{$route.meta.title}}</el-breadcrumb-item>
    </el-breadcrumb>
</template>
<script>
export default {
    computed: {
        routerArr() {
            return this.$route.path.substr(1).split("/");
        }
    }
}
</script>

<style lang='scss' scoped>
.breadcrumb-container {
  height: 60px;
  font-size: 14px;
  line-height: 60px;

  ::v-deep {
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        a {
          display: flex;
          float: left;
          font-weight: normal;
          color: #515a6e;

          i {
            margin-right: 3px;
          }
        }
      }

      &:last-child {
        .el-breadcrumb__inner {
          a {
            color: #999;
          }
        }
      }
    }
  }
}
</style>
