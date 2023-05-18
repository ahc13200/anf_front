import Vue from 'vue'
/**Generate by ASGENS
*@author Charlietyn 
*@date Wed May 17 21:42:06 GMT-04:00 2023  
*@time Wed May 17 21:42:06 GMT-04:00 2023  
*/
import Router from 'vue-router'
import router_array from '@/helpers/loaders/router.load'

Vue.use(Router)
const router= new Router({
    mode: 'history',
    hash: false,
    routes: [
        ...router_array,
    ],
})
router.beforeEach((to, from, next) => {
    next()
})
export default router
