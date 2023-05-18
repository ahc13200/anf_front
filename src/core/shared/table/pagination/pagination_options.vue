<template>
  <div><b>Rango</b> {{start}}-{{end}} <b>Total</b> {{total}}<span></span>
    <a-tooltip placement="topLeft" title="Refrescar">
      <a-button shape="circle" style="margin-left:10px;height:28px;width:28px;font-size:16px" icon="reload"
                @click="load_data()"
      />
    </a-tooltip>
  </div>
</template>

<script>
  export default {
    name: "pagination_functions",
  inject: {
    load_data: {
      default: () => {
      }
    },
  },
    props: {
      start: Number,
      end: Number,
      total: Number,
      vm: Object,
    },
    data() {
      return {}
    },
    methods: {

    },
    mounted() {
    }
  }
</script>

<style scoped>

</style>

