<template>

</template>

<script>
  import Vue from "vue";
  import pagination_functions from "./pagination_options";

  export default {
    name: "VAntdpagination",
  inject: {
    load_data: {
      default: () => {
      }
    },
  },
    props: {
      load_data: Function
    },
    data() {
      return {
        total: 0,
        defaultCurrent: 1,
        defaultPageSize: 10,
        pageSize: 10,
        hideOnSinglePage: false,
        pageSizeOptions: ['10', '20', '30', '40'],
        showQuickJumper: true,
        size: 'small',
        simple: false,
        showSizeChanger: true,
        view_instance:Object,
        showTotal:this.show_total
      }
    },
    watch:{
      pageSizeOptions:function(){
        this.pageSize=Number.parseInt(this.pageSizeOptions[0])
      }
    },
    computed:{
    },
    components: {
    },
    mounted() {
    },
    methods:{
      show_total (total, range) {
        let start = range[0]
        let end = range[1]
        return (<pagination_functions start={start} end={end} total={total} load_data={this.$options.props.load_data}/>)
      },
    }
  }
</script>

<style scoped>

</style>

