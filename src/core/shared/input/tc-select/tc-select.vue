<template>
  <a-form-item class="w-100" ref="formItem" :has-feedback="true" :validate-status="validateStatus">
    <popover-validation
      :container="self_container"
      :placement="popoverPlacement"
      :text="getText"
      :show="showPopover"
    >
      <a-select
        class="w-100"
        :placeholder="placeholder"
        :loading="loading"
        :size="size"
        :disabled="disabled"
        :value="value"
        @blur="blurInput"
        @change="handleChange"
        @mouseenter="hover = true"
        @mouseleave="hover = false"
        :default-value="defaultValue"
      >
        <a-select-option v-for="item in reactiveData" :key="item[idKey]">{{ item[textKey] }}</a-select-option>
      </a-select>
    </popover-validation>
  </a-form-item>
</template>

<script>
import axios from '../../../../config/axios/axios'
import { TcInputMixing } from '../tc-input/tc-inputs-mixing'

export default {
  mixins: [TcInputMixing],
  props: {
    fetching: Boolean,
    idKey: {
      type: String,
      default: 'id'
    },
    textKey: {
      type: String,
      default: 'text'
    },
    defaultValue: String,
    dataSource: Array,
    url: String
  },
  computed: {
    // This is because data can be obtained in props or, on the other hand, in mounted method
    reactiveData () {
      return this.dataSource ? this.dataSource : this.self_data
    }
  },
  methods: {
    refresh () {
      this.loading = true
      axios.get(this.url).then(({ data }) => {
        this.loading = false
        this.self_data = data.data
      })
    }
  },
  beforeMount () {
    if (this.url) {
      this.loading = true
      axios.get(this.url).then(({ data }) => {
        this.loading = false
        this.self_data = data.data
      })
    }
  },
  watch: {
    value: function (value, old) {
      if (!value && old) {
        this.$emit('onClear')
      }
    }
  },
  components: {},
  data: () => ({
    self_data: [],
    loading: false,
    vueobject: null,
    hover: false
  })
}
</script>
