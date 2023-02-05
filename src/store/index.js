import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import console from '@/store/modules/console'
import tabsBar from '@/store/modules/tabsBar'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        baseUri: '',
        userCode: '',
        userName: '',
        tenantCode: '',
        token: ''
    },
    getters: {
        getLogin: (state) => {
            let temp = state.baseUri
            if (state.tenantCode) {
                temp = temp + '(' + state.tenantCode + ')'
            }
            return temp
        }
    },
    mutations: {
        setBaseUri(state, payload) {
            state.baseUri = payload
        },
        setUserCode(state, payload) {
            state.userCode = payload
        },
        setUserName(state, payload) {
            state.userName = payload
        },
        setTenantCode(state, payload) {
            state.tenantCode = payload
        },
        setToken(state, payload) {
            state.token = payload
        }
    },
    modules: {
        console,
        tabsBar
    },
    plugins: [
        persistedState({
            key: 'UserDetails',
            storage: window.sessionStorage,
            paths: [
                'baseUri',
                'userCode',
                'userName',
                'tenantCode',
                'token',
                'console'
            ]
        })
    ]
})

export default store
