<template>
  <a-form ref="form" class="mt-2">
    <slot></slot>
  </a-form>
</template>

<script>
export default {
  props: {
    feedbacks: Object,
    container: Function,
    vobject: Object,
    nested: String
  },
  methods: {
    shake() {
      this.$refs.form.$children.forEach(children => {
        if (children.shake) {
          children.shake()
        }
      })
    },
    first_invalid() {
      return this.$refs.form.$children.find(children => {
        if (children.hasOwnProperty('validate')) {
          if (!children.validate()) {
            return true
          }
        }
        return false
      })
    },
    validate() {
      let valid = true
      let first_element = null;
      this.$refs.form.$children.forEach((children, index) => {
        if (children.hasOwnProperty('validate')) {
          if (!children.validate()) {
            if (!first_element)
              first_element = children.$el
            valid = false
          }
        }
      })
      if (first_element)
        window.scrollTo(0, first_element.getBoundingClientRect().top)
      return valid
    },
    reset() {
      this.$refs.form.$children.forEach(children => {
        if (children.hasOwnProperty('clear')) {
          children.clear()
        }
      })
    }
  },
  components: {},
  data: () => ({})
}
</script>
