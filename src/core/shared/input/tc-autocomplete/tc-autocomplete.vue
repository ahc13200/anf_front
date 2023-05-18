<template>
  <div class="w-100 position-relative">
    <a-form-item
        ref="formItem"
        class="m-0 p-0"
        :has-feedback="true"
        :validate-status="validateStatus"
    >
      <popover-validation :placement="popoverPlacement" :text="getText" :show="showPopover">
        <div @mouseenter="hover = true" @mouseleave="hover = false" class="d-inline-flex w-100">
          <a-spin :spinning="loading" class="spin-autocomplete ">
            <a-tree-select
                @change="handleChange"
                :size="size"
                :treeCheckable="treeeCheckable"
                :id="id"
                :showSearch="!loading"
                :disabled="disabled"
                :getPopupContainer="container"
                :value="value"
                :defaultValue="defaultValue"
                @select="select_element"
                :style="{width:'100%'}"
                :filterTreeNode="filter"
                :treeeCheckable="treeeCheckable"
                :dropdownStyle="{overflow: 'auto' }"
                :placeholder="''"
                searchPlaceholder="Filtrar..."
                dropdownClassName="tc-autocomplete"
                :allowClear="allowClear"
                @search="search"
            >
              <a-tree-select-node
                  v-for="opt in data"
                  @select="select_element"
                  :selectable="true"
                  :value="opt[idKey]+''"
                  :key="opt[idKey]"
                  :text="opt[textKey]"
                  :title="opt[textKey]"
              />
            </a-tree-select>
          </a-spin>
        </div>
      </popover-validation>
    </a-form-item>
  </div>
</template>

<script>
import {focus} from 'vue-focus'
import {TcInputMixing} from '../tc-input/tc-inputs-mixing'
import axios from '../../../../config/axios/axios'
import {useDebounce} from "@vueuse/core";
import {ref} from "@vue/composition-api";


export default {
  setup() {
    const search_value = ref('')
    const search_debounce = useDebounce(search_value, 1000)
    return {
      search_value,
      search_debounce
    }
  },
  directives: {focus},
  mixins: [TcInputMixing],
  props: {
    allowClear: Boolean,
    debounce: {
      type: Boolean,
      default: false
    },
    idKey: {
      type: String,
      default: 'id'
    },
    class_style: {
      type: Object,
      default: () => {
        width:'100%'
      }
    },
    id: {
      type: String,
      default: () => Math.random().toString(36).substr(2, 5)
    },
    treeeCheckable: {
      type: Boolean,
      default: false
    },
    aut_load: {
      type: Boolean,
      default: true
    },
    search_params: {
      type: Object,
      default: null
    },
    textKey: {
      type: String,
      default: 'text'
    },
    defaultValue: String | Number,
    dataSource: Array,
    url: String
  },
  data: () => {
    return {
      self_data: null,
      loading: false,
      selected_node: null,
      selected_object: null,
      selected_index: -1
    }
  },
  computed: {
    // dataSource if data is pased for props, or self_data for search data in url on mounted
    data() {
      return this.dataSource || this.self_data
    },
    selected() {
      return this.data ? this.data.find(element => element.id === this.value) : {}
    }
  },
  async beforeMount() {
    if (this.url && this.aut_load && !this.debounce) {
      this.refresh()
    }
  },
  methods: {
    search(value) {
      if (this.debounce)
        this.search_value = value;
    },
    load() {
      this.refresh()
    },
    select_element(value, node) {
      this.selected_index = this.data.findIndex(element => element[this.idKey] == value)
      this.selected_node = node
      this.selected_object = this.data[this.selected_index]
    },
    clear() {
      this.selected_object
      this.$emit('onClear')
    },
    filter(input, treeNode) {
      if (this.debounce)
        return true
      return (
          treeNode.data.attrs.text ? treeNode.data.attrs.text.toUpperCase().indexOf(input.toUpperCase()) >= 0 : false
      )
    },
    process_data(data) {
      if (this.selected_node && !data.find(element => element[this.idKey] == this.selected_node.value))
        data.push(this.selected_object)
      return data
    },
    refresh(other_params) {
      this.loading = true
      const params = {...this.search_params, ...other_params}
      if (this.debounce && this.value) {
        this.self_data = this.self_data.filter((element, index) => index === this.selected_index)
      }
      axios.get(this.url, {params}).then(({data}) => {
        this.loading = false
        this.self_data = this.process_data(data.data ? data.data : data)
      })
    }
  },
  watch: {
    data: function (value, old) {
    },
    value: function (value, old) {
      if (!value && old) {
        this.selected_object = null
        this.selected_index = -1
        this.selected_node = null
        this.$emit('onClear')
      }
    },
    search_debounce: function (value, old) {
      if (value != '') {
        const params = {};
        params.oper = []
        params.oper.push(`${this.textKey}|ilike|%${value.trim()}%`)
        this.refresh(params)
      }
    },
    search_params: {
      deep: true,
      handler(value, oldValue) {
        if (value) {
          this.$parent.$nextTick(this.refresh)
        }
      }
    }
  }
}
</script>
<style lang="scss">
.loading-autocomplete {
  .ant-select-tree li .ant-select-tree-node-content-wrapper:hover {
    background-color: white;
  }
}

.ant-select-selection--multiple {
  padding-top: 20px !important;
}

.ant-select-selection--multiple > .ant-select-selection__rendered {
  margin-top: -20px !important;
}

.ant-select-tree-node-content-wrapper {
  color: #1b1c26 !important;;
}

.spin-autocomplete {
  width: 100% !important;
}

.ant-select-selection:active {
  border-color: #232324 !important;
  border-right-width: 1px !important;
  outline: 0;
  box-shadow: rgba(27, 28, 38, 0.51) !important;
}

.ant-select-selection {
  border-color: #232324 !important;
  border-right-width: 1px !important;
  outline: 0;
}

.ant-select-open .ant-select-selection {
  border-color: #232324 !important;
  border-right-width: 1px !important;
  outline: 0;
  box-shadow: rgba(27, 28, 38, 0.51) !important;
}

.ant-select-arrow {
  color: #1b1c26 !important;
}
</style>
