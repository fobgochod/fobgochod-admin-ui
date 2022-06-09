<template>
    <div>
        <div id='app'>
            <router-view />
        </div>
    </div>
</template>

<script>
import Login from '@/api/home/login'
import {PUBLIC_KEY, SECRET_KEY} from './assets/js/id_rsa'

export default {
    mounted() {
        let securityKey = sessionStorage.getItem(SECRET_KEY)
        if (!securityKey) {
            Login.getSecurityKey(PUBLIC_KEY).then((res) => {
                sessionStorage.setItem(SECRET_KEY, res.data.secretKey)
            })
        }
    }
}
</script>
