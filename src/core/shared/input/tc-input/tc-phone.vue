<template>
    <div v-if="vueobject" class="w-100 position-relative">
        <a-form-item
                ref="formItem"
                :has-feedback="true"
                :validate-status="object.$error?'error':!object.$invalid && successFeed?'success':''"
        >
            <popover-validation
                    :container="self_container"
                    :placement="popoverPlacement"
                    :text="getText"
                    :show="object.$error && hover"
            >
                <a-input-group compact>
                    <a-select
                            defaultValue="national"
                            @change="onChangelocation"
                            :size="size"
                            style="width: 30%"
                            :disabled="disabledLocation"
                    >
                        <a-select-option key="national">
                            Nacional
                        </a-select-option>
                        <a-select-option key="international">
                            Internacional
                        </a-select-option>
                    </a-select>
                    <a-select
                            class="phone_code"
                            showSearch
                            defaultValue="CU"
                            :size="size"
                            style="width: 25%"
                            :filterOption="filterOption"
                            @change="onChangePhoneInput"
                            :disabled="disabledLocation"
                    >
                        <a-select-option
                                v-for="item in phone_code_data"
                                :key="item.iso_country_code"
                                :title="item.telephone_code"
                                :value="item.iso_country_code"
                        >
                            {{ item.country_name}}
                        </a-select-option>
                    </a-select>
                    <a-input
                            @mouseenter="hover = true"
                            @mouseleave="hover = false"
                            @input="handleChange"
                            @blur="blurInput"
                            @keypress="(e)=>$emit('keypress',e)"
                            :type="type"
                            :placeholder="placeholder"
                            ref="input"
                            :title="title"
                            :value="value"
                            :size="size"
                            style="width: 45%"
                    />
                </a-input-group>
            </popover-validation>
        </a-form-item>

        <span
                :style="size=='large'? {bottom:'-4px'}:{}"
                :class="{'text-danger':invalidLength}"
                v-if="vueobject && object.$params && object.$params['maxLength']"
                class="limit-length"
        >{{value.length}}/{{object.$params["maxLength"]["max"]}}</span>
    </div>
</template>

<script>
import {TcInputMixing} from './tc-inputs-mixing'
import {national_country_code, international_country_code} from './country_code'
import * as utils from '@/helpers/helpers/utils'

export default {
  props: {
    // Input html type
    type: {
      type: String,
      default: 'text'
    }
  },
  mixins: [TcInputMixing],
  computed: {
    invalidLength () {
      const invalid = this.object['maxLength'] === false
      if (invalid) {
        this.object.$touch()
      }
      return invalid
    }
  },
  methods: {
    onChangelocation (value) {
      const is_national_location = value === 'national'
      this.changeLocations(is_national_location)
    },
    onChangePhoneInput (value, data) {
      const {title: code} = data.componentOptions.propsData
      utils.changeSelectTitle(code)
      this.phone_code = `+${code}`
    },

    filterOption (input, option) {
      return option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
    },
    changeLocations (isNationalLocation) {
      this.phone_code_data = isNationalLocation ? national_country_code : international_country_code
      utils.changeSelectTitle(isNationalLocation ? '7' : '53')
      this.phone_code = isNationalLocation ? '7' : '53'
    }
  },
  components: {},
  mounted () {
    this.changeLocations(this.isNationalLocation())
  },
  data () {
    return {
      phone_code_data: [],
      phone_code: '+53'
    }
  }
}
// import "./tc-input.scss";
</script>
