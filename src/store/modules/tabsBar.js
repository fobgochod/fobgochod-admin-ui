const tabsBar = {
    namespaced: true,
    state: {
        visitedRoutes: [],
    },
    getters: {
        visitedRoutes: (state) => {
            return state.visitedRoutes
        },
    },
    mutations: {
        addRouter(state, route) {
            let target = state.visitedRoutes.find((item) => item.path === route.path)
            if (target) {
                if (route.fullPath !== target.fullPath) {
                    Object.assign(target, route)
                }
                return
            }
            state.visitedRoutes.push(Object.assign({}, route))
        },
        delRouter(state, route) {
            state.visitedRoutes.forEach((item, index) => {
                if (item.path === route.path) state.visitedRoutes.splice(index, 1)
            })
        },
        delOtherRouter(state, route) {
            state.visitedRoutes = state.visitedRoutes.filter((item) => item.meta.affix || item.path === route.path)
        },
        delLeftRouter(state, route) {
            let index = state.visitedRoutes.length
            state.visitedRoutes = state.visitedRoutes.filter((item) => {
                if (item.name === route.name) index = state.visitedRoutes.indexOf(item)
                return item.meta.affix || index <= state.visitedRoutes.indexOf(item)
            })
        },
        delRightRouter(state, route) {
            let index = state.visitedRoutes.length
            state.visitedRoutes = state.visitedRoutes.filter((item) => {
                if (item.name === route.name) index = state.visitedRoutes.indexOf(item)
                return item.meta.affix || index >= state.visitedRoutes.indexOf(item)
            })
        },
        delAllRouter(state) {
            state.visitedRoutes = state.visitedRoutes.filter((item) => item.meta.affix)
        },
        updateRouter(state, route) {
            state.visitedRoutes.forEach((item) => {
                if (item.path === route.path) item = Object.assign(item, route)
            })
        },
    },
    actions: {
        addRoute({commit}, route) {
            commit('addRouter', route)
        },

        delRoute({commit, state}, route) {
            commit('delRouter', route)
            return [...state.visitedRoutes]
        },
        async delRouteAsync({dispatch, state}, route) {
            await dispatch('delRoute', route)
            return {
                visitedRoutes: [...state.visitedRoutes],
            }
        },

        delOtherRoute({commit, state}, route) {
            commit('delOtherRouter', route)
            return [...state.visitedRoutes]
        },
        async delOtherRouteAsync({dispatch, state}, route) {
            await dispatch('delOtherRoute', route)
            return {
                visitedRoutes: [...state.visitedRoutes],
            }
        },

        delLeftRoute({commit, state}, route) {
            commit('delLeftRouter', route)
            return [...state.visitedRoutes]
        },
        async delLeftRouteAsync({dispatch, state}, route) {
            await dispatch('delLeftRoute', route)
            return {
                visitedRoutes: [...state.visitedRoutes],
            }
        },

        delRightRoute({commit, state}, route) {
            commit('delRightRouter', route)
            return [...state.visitedRoutes]
        },
        async delRightRouteAsync({dispatch, state}, route) {
            await dispatch('delRightRoute', route)
            return {
                visitedRoutes: [...state.visitedRoutes],
            }
        },

        delAllRoute({commit, state}) {
            commit('delAllRouter')
            return [...state.visitedRoutes]
        },
        async delAllRouteAsync({dispatch, state}, route) {
            await dispatch('delAllRoute', route)
            return {
                visitedRoutes: [...state.visitedRoutes],
            }
        },

        updateVisitedRoute({commit}, route) {
            commit('updateRouter', route)
        },
    },
}
export default tabsBar
