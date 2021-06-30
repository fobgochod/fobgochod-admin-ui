const console = {
    namespaced: true,
    state: {
        sqlCache: '',
    },
    mutations: {
        setSqlCache(state, payload) {
            state.sqlCache = payload
        },
    },
}
export default console