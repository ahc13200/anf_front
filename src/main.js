import Vue from 'vue'
import App from '@/App'
import router from '@/config/router'
import LoadScript from 'vue-plugin-load-script'
import Vuelidate from 'vuelidate'
import {state} from '@/config/store/'
import '@/core/shared'


/*customs css*/
import '@/assets/scss/main.scss'
/* Antd */
import 'ant-design-vue/dist/antd.css'
import Antd from 'ant-design-vue'

/* Jquery */
window.$ = window.jQuery = require('jquery')

/* using components */
Vue.use(LoadScript)
Vue.use(Antd)
Vue.use(Vuelidate)

Vue.prototype.$store = state
new Vue({
  el: '#app',
  router,
  // store,
  render: h => h(App)
})

