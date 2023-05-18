<template>
  <div v-if="name" class="w-100 position-relative">
    <a-form-item
        ref="formItem"
        :has-feedback="true"
        :style="custom_style"
        :validate-status="object.$error?'error':!object.$invalid && successFeed?'success':''"
    >
      <popover-validation
          :container="self_container"
          :placement="popoverPlacement"
          :text="getText"
          :show="object.$error && hover"
      >
        <a-input v-if="!text_area"
                 autocomplete="off"
                 @mouseenter="hover = true"
                 @mouseleave="hover = false"
                 @input="handleChange"
                 @blur="blurInput"
                 @keypress="keypress"
                 :class="class_element"
                 :id="id"
                 :type="type"
                 :placeholder="placeholder"
                 :title="title"
                 :value="value"
                 :size="size"
                 :disabled="disabled"
                 :maxLength="maxLength"
                 ref="input"
        >
          <slot slot='addonBefore' name="addonBefore"/>
          <slot slot='addonAfter' name="addonAfter"/>
          <a-icon class="mr-1" v-if="icon" slot="prefix" :type="icon"/>
        </a-input>
        <vue-editor v-else
                    @mouseenter="hover = true"
                    @mouseleave="hover = false"
                    @input="handleChange"
                    @blur="blurInput"
                    :id="id"
                    :placeholder="placeholder"
                    :value="value"
                    :size="size"
                    :disabled="disabled"
                    :rows="rows"
                    ref="input"
                    :show_char_cant="show_char_cant"

        >
          <a-icon class="mr-1" v-if="icon" slot="prefix" :type="icon"/>
        </vue-editor>
      </popover-validation>
    </a-form-item>

    <span
        :style="size=='large'? {bottom:'-4px'}:{}"
        :class="{'text-danger':invalidLength}"
        v-if="vueobject && object.$params && object.$params['maxLength'] && show_char_cant"
        class="limit-length"
    >{{ value.length }}/{{ object.$params['maxLength']['max'] }}
    </span>
    <span
        :style="size==='large'? {bottom:'-4px'}:{}"
        :class="{'text-danger':value.length>length}"
        v-if="show_char_cant && length"
        class="limit-length"
    >{{ value.length }}/{{ length }}</span>
  </div>

  <a-form-item :style="custom_style" v-else>
    <a-input
        autocomplete="off"
        @input="handleChange"
        :type="type"
        :id="id"
        :placeholder="placeholder"
        :title="title"
        :value="value"
        :size="size"
        :disabled="disabled"
        ref="input"
    >
      <slot slot='addonBefore' name="addonBefore"/>
      <slot slot='addonAfter' name="addonAfter"/>
    </a-input>
  </a-form-item>
</template>

<script>
import {TcInputMixing} from './tc-inputs-mixing'
import './tc-input.scss'
import * as utils from '@/helpers/helpers/utils'
import {VueEditor} from 'vue2-editor'

export default {
  props: {
    // Input html type
    type_car: {
      type: String,
      default: ''
    },
    id: {
      type: String,
      default: () => Math.random().toString(36).substr(2, 5)
    },
    show_char_cant: {
      type: Boolean,
      default: false
    },
    text_area: {
      type: Boolean,
      default: false
    },
    rows: {
      type: Number,
      default: 10
    },
    length: {
      type: Number,
      default: null
    },
    custom_style: {
      type: Object,
      default: null
    },
    type: {
      type: String,
      default: 'text'
    },
    maxLength: Number
  },
  mixins: [TcInputMixing],
  computed: {
    invalidLength() {
      let invalid = this.object['maxLength'] === false
      if (invalid) {
        this.object.$touch()
      }
      return invalid
    }
  },
  components: {
    VueEditor
  },
  watch: {

  },
  methods: {
    keypress(e) {
      if (this.type_car != '' && !utils.allow_character(e, this.type_car)) {
        e.preventDefault()
      }
      this.$emit('keypress', e)
    }
  }
}
</script>


