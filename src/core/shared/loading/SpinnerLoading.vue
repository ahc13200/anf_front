<template>
  <div
    v-if=" mode !=='custom'"
    class="d-inline-block u-transition-02"
    :class="{'position-absolute w-100 h-100 spinner-overlay': overlay}"
  >
    <div :style="containerStyle" :class="containerClass">
      <div :class="spinnerClass" class="spinner-loader"></div>
      <h6 v-if="textLoadingOverlay" class="mt-2">{{textLoadingOverlay}}</h6>
    </div>
  </div>
  <div v-else :class="spinnerClass" class="spinner-loader"></div>
</template>

<script>
export default {
  props: {
    overlay: {
      type: Boolean,
      default: true
    },
    // Suported types: small, medium , large
    size: {
      type: String,
      default: 'medium'
    },
    // Suported types: center, corner, custom
    mode: {
      type: String,
      default: 'center'
    },
    // Only if mode === corner
    padding: {
      type: Number,
      default: 20
    },
    clases: {
      type: String,
      default: ''
    },
    textLoadingOverlay: {
      type: String,
      default: null
    }
  },
  computed: {
    spinnerClass () {
      return {
        small: this.size === 'small',
        medium: this.size === 'medium',
        large: this.size === 'large',
        [this.clases]: true
      }
    },
    containerClass () {
      return {
        'u-absCenter': this.mode === 'center',
        'position-absolute': this.mode === 'center' || this.mode === 'corner',
        'd-flex flex-column align-center': this.textLoadingOverlay
      }
    },
    containerStyle () {
      if (this.mode === 'corner') {
        return {
          top: this.padding + 'px',
          right: this.padding + 'px'
        }
      }
    }
  },
  methods: {},
  watch: {},
  components: {},
  data: () => {
    return {}
  }
}
</script>
<style lang="scss">
.spinner-loader {
  border-radius: 50%;
  border: 2px solid rgba(29, 161, 242, 0.2);
  border-left-color: #1890ff;
  background: transparent;
  animation: rotate-s-loader 0.5s linear infinite;

  &.small {
    width: 20px;
    height: 20px;
  }
  &.medium {
    width: 25px;
    height: 25px;
  }
  &.large {
    border-width: 4px;
    width: 35px;
    height: 35px;
  }
}
.spinner-overlay {
  background: #ffffffc7;
  z-index: 100;
  top: 0;
  left: 0;
}
@keyframes rotate-s-loader {
  from {
    transform: rotate(0);
  }

  to {
    transform: rotate(360deg);
  }
}
</style>
