/**Generate by ASGENS
*@author Charlietyn 
*@date Wed May 17 21:42:06 GMT-04:00 2023  
*@time Wed May 17 21:42:06 GMT-04:00 2023  
*/
import axios from 'axios';
import Vue from 'vue'
/*Globally*/


const axios_api=axios.create({
    baseURL : process.env.VUE_APP_BASE_URL,
});

axios_api.defaults.headers.common['Access-Control-Allow-Origin'] = '*'
axios_api.defaults.headers.get['Accepts'] = 'application/json'

axios_api.pending = null
const reqInt = axios_api.interceptors.request.use(
    config => {
        if (Vue.prototype.$store.site.user) {
            if (config.url.endsWith('logout')) {
                config.headers['Refresh-Token'] = Vue.prototype.$store.site.refresh_token
            }
            config.headers.Authorization = 'Bearer ' + (!config.url.endsWith('refresh') ? Vue.prototype.$store.site.jwt : Vue.prototype.$store.site.refresh_token)
        }
        return config    }
)
const respInt = axios_api.interceptors.response.use(
    res => {
        return res
    },
   async error => {
        const originalRequest = error.config;
        if (error.response.request.status === 403 && error.config.headers.Authorization.length > 7) {
            if (!error.response.request.responseURL.endsWith('refresh')) {
                await Vue.prototype.$store.site.refresh()
                originalRequest.headers.Authorization = 'Bearer ' + Vue.prototype.$store.site.jwt
                return axios(originalRequest)
            } else {
                Vue.prototype.$store.site.logout()
            }
        }
        error = error.response ? error : {

            response: {
                data: {
                    message: 'Cors error,Check preflight request, there is not response from server'
                },
                statusText: 'Cors Errors , There no status text'
            }
        }
        throw error}
)
// axios_api.interceptors.request.eject(reqInt)
// axios_api.interceptors.response.eject(respInt)
export default axios_api
export const Axios = axios_api

