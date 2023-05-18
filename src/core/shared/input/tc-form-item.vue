<template>
  <div class="w-100">
    <slot></slot>
  </div>
</template>
<script>
export default {
  computed: {},
  methods: {
    validate () {
      let valid = true
      this.$children.forEach(children => {
        if (children.hasOwnProperty('validate')) {
          if (!children.validate()) {
            valid = false
          }
        }
      })
      return valid
    },
    reset () {
      this.$children.forEach(children => {
        if (children.hasOwnProperty('clear')) {
          children.clear()
        }
      })
    }
  },
  mounted () {
    this.$children.forEach(children => {
      if (children.hasOwnProperty('self_container')) {
        children.self_container =
          this.self_container || this.$parent.$parent.container
      }
      if (children.hasOwnProperty('self_nested')) {
        children.self_nested = this.self_nested || this.$parent.$parent.nested
      }
      if (children.hasOwnProperty('vueobject')) {
        children.vueobject = this.vueobject || this.$parent.$parent.vobject
      }
      if (children.hasOwnProperty('self_feedback')) {
        const feedbacks = this.$parent.$parent.feedbacks
        if (feedbacks) {
          const { self_feedback } = this
          const { self_nested, name } = children
          if (self_nested) {
            children.self_feedback =
              self_feedback || feedbacks[self_nested][name]
          } else {
            children.self_feedback = self_feedback || feedbacks[name]
          }
        }
      }
    })
  },
  watch: {},
  components: {},
  data: () => ({
    self_container: null,
    self_nested: null,
    vueobject: null,
    self_feedback: null
  })
}
</script>
