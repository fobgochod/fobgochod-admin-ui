export default function checkRoles(to, from, next) {
    let loginRole = sessionStorage.getItem('loginRole');
    let loginMark = sessionStorage.getItem('loginMark');
    let hasRole = to.meta.roles.indexOf(loginRole) //判断是否有权限
    let needLogin = to.meta.loginState //是否需要登录
    if (!needLogin) {
        next()
        document.title = to.meta.title
    } else if (loginMark === 'login' && hasRole >= 0) {
        next()
        document.title = to.meta.title
    } else {
        // alert('您未登录或权限不足');
        // next({
        //     path: 'from.path'
        // })
        next('/error/401')
    }
}
