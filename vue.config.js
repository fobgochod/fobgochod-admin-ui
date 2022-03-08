module.exports = {
    publicPath: process.env.VUE_APP_BASE_API,
    outputDir: 'dist',
    assetsDir: 'static',
    transpileDependencies: [
        /* string or regex */
    ],
    // 是否为生产环境构建生成 source map？
    productionSourceMap: false,
    devServer: {
        open: true,
        port: 9090,
    },
    configureWebpack: {
        //移除已从cdn引入的组件，不打包以下命名的内容
        //echarts: 'echarts',
        externals: {
            vue: 'Vue',
            'vue-router': 'VueRouter',
            'element-ui': 'ELEMENT',
            VueCookies: 'VueCookies',
            axios: 'axios',
        },
    },
    chainWebpack: (config) => {
        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
    },
}
