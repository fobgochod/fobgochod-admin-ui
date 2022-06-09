import Vue from 'vue'
import Vuex from 'vuex'
import persistedState from 'vuex-persistedstate'
import console from '@/store/modules/console'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        baseUri: '',
        tenantId: '',
        userId: '',
        userName: '',
        userToken: '',
    },
    getters: {
        getLogin: (state) => {
            let temp = state.baseUri
            if (state.tenantId) {
                temp = temp + '(' + state.tenantId + ')'
            }
            return temp
        },
    },
    mutations: {
        setEnv(state, payload) {
            state.baseUri = payload
        },
        setTenantId(state, payload) {
            state.tenantId = payload
        },
        setUserId(state, payload) {
            state.userId = payload
        },
        setUserName(state, payload) {
            state.userName = payload
        },
        setUserToken(state, payload) {
            state.userToken = payload
        },
    },
    modules: {
        console,
    },
    plugins: [
        persistedState({
            key: 'loginUser',
            storage: window.sessionStorage,
        }),
    ],
})

export default store
