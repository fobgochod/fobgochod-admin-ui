import store from '@/store'

function checkRoles(to, from, next) {
    let needLogin = to.meta.loginState //是否需要验证
    if (needLogin === false) {
        next()
        document.title = to.meta.title
    } else if (needLogin === true) {
        const hasMenu = getMenuPaths().indexOf(to.path) > -1
        if (hasMenu) {
            next()
            document.title = to.meta.title
        } else {
            next('/error/401')
        }
    } else {
        next('/error/401')
    }
}

/**
 * 获取当前用户的菜单路由
 * @returns []
 */
function getMenuPaths() {
    let menuPaths = []
    let userId = store.state.userId
    let menus = sessionStorage.getItem('menus:' + userId)
    JSON.parse(menus).forEach(function(item) {
        menuPaths.push(item.path)
        item.children.forEach(function(child) {
            menuPaths.push(child.path)
        })
    })
    return menuPaths
}

export default checkRoles
