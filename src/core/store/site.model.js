import axios from '@/config/axios/axios'
import * as utils from '@/helpers/helpers/utils.js'
import SimpleCrypto from "simple-crypto-js"
import * as mb from '@/helpers/loaders/model.load'

/**Generate by ASGENS
*@author Charlietyn 
*@date Wed May 17 21:42:06 GMT-04:00 2023  
*@time Wed May 17 21:42:06 GMT-04:00 2023  
*/const simpleCrypto = new SimpleCrypto(process.env.VUE_APP_TOKEN_KEY)

export default class SiteModel {
    _user = undefined
    loading = false
    tip = ""

    static get url() {
        return ''
    };

    get url() {
        return ''
    };

    get mb() {
        return mb
    }

    get user() {
        return localStorage.getItem(process.env.VUE_APP_HASH) ? Object.freeze(utils.extract_user_data('user', simpleCrypto.decrypt(localStorage.getItem(process.env.VUE_APP_HASH)))) : null
    }

    get jwt() {
        return simpleCrypto.decrypt(localStorage.getItem(process.env.VUE_APP_HASH));
    }

    get refresh_token() {
        return simpleCrypto.decrypt(localStorage.getItem('refresh_' + process.env.VUE_APP_HASH));
    }

    set user(value) {
        this._user = value
    }

    login(params = {}) {
        return axios.post(this.url + 'login', params).then((response) => {
            const token_hash = simpleCrypto.encrypt(response.data.token);
            const refresh_token_hash = simpleCrypto.encrypt(response.data.refresh_token);
            localStorage.setItem(process.env.VUE_APP_HASH, token_hash);
            localStorage.setItem('refresh_' + process.env.VUE_APP_HASH, refresh_token_hash);
            return response
        }).catch(error => {
            throw error
        })
    }

    refresh() {
        return axios.post(this.url + 'refresh', {}).then(async (response) => {
            const token_hash = await simpleCrypto.encrypt(response.data.token);
            const refresh_token_hash = await simpleCrypto.encrypt(response.data.refresh_token);
            localStorage.setItem(process.env.VUE_APP_HASH, token_hash);
            localStorage.setItem('refresh_' + process.env.VUE_APP_HASH, refresh_token_hash);
            return response
        }).catch(error => {
            throw error
        })
    }

    logout(params = {}) {
        const config = {
            headers: {
                "Refresh-Token": this.refresh_token
            }
        }
        return axios.post(this.url + 'logout', params, config).then((response) => {
            return {success: true, response: response}
        }).catch(error => {
            throw JSON.parse(JSON.stringify(error))
        }).finally(() => {
            localStorage.removeItem(process.env.VUE_APP_HASH);
            localStorage.removeItem('refresh_' + process.env.VUE_APP_HASH);
            location.reload()
        })
    }

    signup(params = {}, isFormData = false) {
        return axios.post(this.url + 'signup', params, header(isFormData)).then((response) => {
            return response
        }).catch(error => {
            throw JSON.parse(JSON.stringify(error))
        })
    }

    static custom(verb, action, params = {}, header = {'Content-Type': 'application/json; charset=UTF-8'}) {
        return axios[verb](this.url + '/' + action, params, header).then((response) => {
            return response
        }).catch(error => {
            throw JSON.parse(JSON.stringify(error))
        })
    }
}


