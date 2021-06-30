module.exports = {
    publicPath: process.env.VUE_APP_CONTEXT_PATH,
    // 构建时的输出目录
    outputDir: 'dist',
    // 放置静态资源的目录
    assetsDir: 'static',
    transpileDependencies: [
        /* string or regex */
    ],
    // 是否为生产环境构建生成 source map？
    productionSourceMap: false,
    devServer: {
        open: true,
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
