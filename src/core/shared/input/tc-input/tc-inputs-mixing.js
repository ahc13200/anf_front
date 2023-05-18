import {getTextValidation} from '../../validation/validationsTexts'
import {debounce} from "../../../../helpers/helpers/utils";

export const TcInputMixing = {
  props: {
    vobject: {
      type: Object
    },
    debounce: {
      type: Boolean,
      default: false
    },
    class_element: {
      type: String,
      default: ""
    },
    // Size of input. Should be 'default' 'large' or 'small'
    size: {
      type: String,
      default: 'default'
    },
    placeholder: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    // If show icon success on valid input
    successFeed: {
      type: Boolean,
      default: true
    },

    // The name of the property in the vuelidate object
    name: {
      type: String
      // required: true
    },

    // Icon suffix name. Should be antd icon
    icon: {
      type: String
    },
    // Input html type

    value: {
      type: String | Number,
      default: ''
    },
    nested: {
      type: String,
      default: null
    },
    /**
     *  A object with the text feedback for each validate param rule
     *  @example  {required: 'Email is required', email:'Email is invalid'}
     */
    feedback: {
      type: Object
    },

    popoverPlacement: {
      type: String,
      default: 'topLeft'
    },

    // Function that returns the container of the popover
    container: {
      type: Function,
      default: () => document.body
    },
    disabled: {
      type: Boolean,
      default: false
    },

    // Select: Contries code
    locationPhone: {
      type: String,
      default: 'national'
    },
    disabledLocation: {
      type: Boolean,
      default: true
    }
  },
  model: {
    prop: 'value',
    event: 'change'
  },
  data() {
    return {
      vueobject: null,
      // This self feedback is for avoid mutate parent props
      self_feedback: null,
      self_container: null,
      self_nested: null,
      hover: false,
      debounce_value: ""
    }
  },
  computed: {
    debounce_val() {
      return this.debounce_value
    },
    object() {
      let object
      if (!this.vueobject)
        return {}
      if (!this.self_nested) {
        object = this.vueobject[this.name]
        return object || {}
      } else {
        object = this.vueobject[this.self_nested][this.name]
        return object || {}
      }
    },
    validateStatus() {
      return this.object.$error ? 'error' : !this.object.$invalid && this.successFeed ? 'success' : ''
    },
    showPopover() {
      return this.object.$error && this.hover
    },
    getText() {
      for (const param in this.object.$params) {
        if (!this.object[param]) {
          if (this.self_feedback && this.self_feedback[param]) {
            return this.self_feedback[param]
          }
          return this.object.$params[param] ? getTextValidation(this.object.$params[param]) : "Feedback missing"
        }
      }
      return ''
    }
  },
  watch: {
    value: debounce(function (newVal) {
      if (this.debounce) {
        this.debounce_value = newVal
        this.$emit('input', newVal)
      }
    }, 500)
  },
  methods: {
    //  TODO: WTF?  Who put this here?
    isNationalLocation() {
      return this.locationPhone === 'national'
    },
    handleChange(e) {
      if (e) {
        let value = e.target ? e.target.value : e
        if (e.target && this.class_element === "text-uppercase")
          value = value.toUpperCase()
        if (e.target && this.class_element === "text-capitalize")
          value = value.split(" ").map((word) => {
            return word[0] ? word[0].toUpperCase() + word.substring(1) : ""
          }).join(" ")
        if (e.target && this.class_element === "text-lowercase")
          value = value.toLowerCase()
        this.$emit('change', value)
      } else {
        this.$emit('change', null)
      }
    },
    emitEmpty() {
      this.$refs.input.focus()
      this.value = ''
      this.$emit('onClear')
    },
    blurInput() {
      Object.keys(this.object).length != 0 ? this.object.$touch() : console.log('Error', this.name + ' has no v-model associated')
    },
    shake() {
      if (this.object.$invalid) {
        this.object.$touch()
        this.$refs.formItem.$el.classList.add('animated', 'vshake')
        setTimeout(() => {
          this.$refs.formItem.$el.classList.remove('animated', 'vshake')
        }, 500)
      }
    },

    clear() {
      this.value = ''
    },
    validate() {
      if (this.object.$invalid) {
        this.shake()
        return false
      }
      return true
    }
  },
  beforeMount() {
    this.vueobject = this.vobject || {}
    this.self_container = this.container
    this.self_nested = this.nested
    // This is for avoid mutate parent props
    if (this.feeback) {
      this.self_feedback = this.feedback || {}
    }
  }
}
