import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import VueCookies from 'vue-cookies'
import echarts from 'echarts'
import qs from 'qs'
import VueClipboard from 'vue-clipboard2'

import components from '@/plugins/component' //加载公共组件
import axios from '@/config/http'
import '@/assets/css/common.css'

Vue.prototype.$qs = qs
Vue.prototype.$axios = axios
Vue.prototype.$echarts = echarts
Vue.use(VueCookies)
Vue.use(Element)
Vue.use(VueClipboard)
Vue.config.productionTip = false

Object.keys(components).forEach((key) => {
    let name = key.replace(/(\w)/, (v) => v.toUpperCase())
    Vue.component(name, components[key])
})

new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount('#app')
