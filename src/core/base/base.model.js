import axios_instance from "@/config/axios/axios"
import axios from "axios";
import * as utils from "@/helpers/helpers/utils.js";

/**Generate by ASGENS
*@author Charlietyn 
*@date Wed May 17 21:42:06 GMT-04:00 2023  
*@time Wed May 17 21:42:06 GMT-04:00 2023  
*/


const header = (isFormdata) => !isFormdata ? {'Content-Type': 'application/json; charset=UTF-8'} : {'Content-Type': 'multipart/form-data'};

export default class BaseModel {

    isFormData = false
    _changed_attributes = {}

    static get url() {
        return ''
    };

    get url() {
        return ''
    };

    getFormData() {
        const formdata = utils.objectToFormData(this.get_id() ? this._changed_attributes : this)
        if (this.get_id())
            formdata.append('_method', 'PATCH')
        return formdata;
    };

    static get select_2_url() {
        return this.url
    };

    constructor(attributes = null) {

    }

    dto() {
        return this;
    }

    object(self=false) {
        const value = Object.assign({}, self?this:this.get_id()?this._changed_attributes:this)
        delete value.isFormData
        return this.isFormData ? this.getFormData() : value
    }
    static columns = []

    create() {
        return axios_instance.post(this.url, this.object(true), header(this.isFormData)).then((response) => {
            return response
        }).catch(error => {
            throw JSON.parse(JSON.stringify(error))
        })
    }

    static custom(verb, action, params = {}, header = {'Content-Type': 'application/json; charset=UTF-8'}) {
        return axios_instance[verb](this.url + '/' + action, params, header).then((response) => {
            return response
        }).catch(error => {
            throw JSON.parse(JSON.stringify(error))
        })
    }

    save() {
        return this.get_id() ? this.update() : this.create()
    }

    update() {
        const verb=this.isFormData?'post':'patch'
        return axios_instance[verb](this.url + '/' + this.get_id(), this.object(), header(this.isFormData)).then((response) => {
            return response
        }).catch(error => {
            throw JSON.parse(JSON.stringify(error))
        })
    }

    get_id() {
        return -1
    }

    delete() {
        return axios_instance.delete(this.url + '/' + this.get_id(), {
            data: this.object()
        }).then((response) => {
            return response
        }).catch(error => {
            throw JSON.parse(JSON.stringify(error))
        })
    }

    static delete_mult(params) {
        return axios_instance.delete(this.url + '/delete_parameters', {
            data: params
        }).then((response) => {
            return response
        }).catch(error => {
            throw JSON.parse(JSON.stringify(error))
        })
    }

    static delete_by_ids(array_id) {
        return axios_instance.delete(this.url + '/delete_by_id', {
            data: array_id
        }).then((response) => {
            return response
        }).catch(error => {
            throw JSON.parse(JSON.stringify(error))
        })
    }

    static show_columns(columns_name, show = true) {
        const columns = columns_name == null ? this.columns : columns_name.map((element) => {
            return this.columns.find((c) => c.key == element)
        })
        return columns_name == null ? this.columns : show ? columns : this.columns.filter((element) => {
            return columns_name.indexOf(element.key) == -1
        })
    }

    static update_mult(params) {
        const verb=this.isFormData?'post':'patch'
        return axios_instance[verb](this.url + '/update_multiple', {params}, header(this.isFormData)).then((response) => {
            return response
        }).catch(error => {
            throw JSON.parse(JSON.stringify(error))
        })    }

    static list(params) {
        return axios_instance.get(this.url, {
            params
        }).then((response) => {
            return response
        }).catch(error => {
            throw JSON.parse(JSON.stringify(error))
        })
    }

    static validate(params) {
        if (axios_instance.pending && utils.compare_object(axios_instance.pending.params, params)) {
            axios_instance.pending.token.cancel('Validate request canceled')
        }
        axios_instance.pending = {
            params: params,
            token: axios.CancelToken.source()
        }
        return axios_instance.post(this.url + '/validate',
            params,
            {cancelToken: axios_instance.pending.token.token}
        ).then((response) => {
            axios_instance.pending = null
            return response
        }).catch(error => {
            if (axios.isCancel(error)) {
                console.log('Request canceled', error.message)
            }
            throw JSON.parse(JSON.stringify(error))
        })
    }

    static view(id, params = null) {
        return axios_instance.get(this.url + '/' + id, {params}).then((response) => {
            return response
        }).catch(error => {
            throw JSON.parse(JSON.stringify(error))
        })
    }

    static select_2_list(params) {
        return axios_instance.get(this.url + '/', {
            params
        }).then((response) => {
            return response
        }).catch(error => {
            throw JSON.parse(JSON.stringify(error))
        })
    }

    static filter_params(value, columns = null) {
        let filter_columns = columns || this.columns
        let params = {oper: {}}
        let params_or = [];
        filter_columns.forEach((element) => {
            if (element.key.indexOf('.') === -1 && element.key!=="action_elements")
                params_or.push(`${element.key}|ilike|%${value.trim()}%`)
        })
        params.oper.or=params_or
        return params
    }
}

