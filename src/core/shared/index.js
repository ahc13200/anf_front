import Vue from 'vue'

import PopoverValidation from './validation/PopoverValidation'
import tcInput from './input/tc-input/tc-input.vue'
import tcPhone from './input/tc-input/tc-phone'
import tcSelect from './input/tc-select/tc-select'
import tcAutocomplete from './input/tc-autocomplete/tc-autocomplete.vue'
import tcFormItem from './input/tc-form-item.vue'
import tcDatePicker from './input/tc-date-picker/tc-date-picker.vue'
import FormValidation from './validation/FormValidation'
import Spinner from './loading/SpinnerLoading.vue'

Vue.component('spinner', Spinner)
Vue.component('popover-validation', PopoverValidation)
Vue.component('tc-form', FormValidation)
Vue.component('tc-input', tcInput)
Vue.component('tc-phone', tcPhone)
Vue.component('tc-autocomplete', tcAutocomplete)
Vue.component('tc-form-item', tcFormItem)
Vue.component('tc-select', tcSelect)
Vue.component('tc-date-picker', tcDatePicker)
