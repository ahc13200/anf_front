<template>
  <div v-if="vueobject" class="w-100 position-relative">
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
        <div @mouseenter="hover = true" @mouseleave="hover = false" class="d-inline-flex w-100">
          <a-date-picker
              class="w-100"
              :disabled="disabled"
              :defaultValue="defaultValue"
              :showTime="showTime"
              :size="size"
              :format="dateFormat"
              :disabledDate="disabledDate"
              :disabledTime="disabledTime"
              :value="value "
              :defaultPickerValue="defaultDateValue"
              @select="onChange"
              @change="onChange"
          />
        </div>
      </popover-validation>
    </a-form-item>
  </div>
</template>

<script>
import moment from "moment";
import {TcInputMixing} from "../tc-input/tc-inputs-mixing";

export default {
  props: {
    disabledDate: {
      type: Function,
      default: () => {
      }
    },
    showTime: {
      type: Boolean,
      default: false
    },
    disabledTime: {
      type: Function,
      default: () => {
      }
    },
    // defaultDateValue: {
    //   type: Function,
    //   default: () => {
    //     return new DateTime()
    //   }
    // },
    custom_style: {
      type: Object,
      default: null
    },
    defaultValue: {
      type: String,
      default: ""
    },
    dateFormat: {
      type: String,
      default: "DD/MM/YYYY"
    },
    value: {
      type: Object,
      default: () => {
      }
    }
  },
  mixins: [TcInputMixing],
  computed: {
    defaultDateValue() {

    }
  },
  methods: {
    onChange(date, dateString) {
      console.log(date, dateString)
      this.$emit("change", date);
    },
  },
  components: {},
  data() {
    return {
      moment,
    };
  }
};
</script>

