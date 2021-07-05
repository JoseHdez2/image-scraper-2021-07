import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import vueDebounce from 'vue-debounce'
import { PaginationPlugin, SpinnerPlugin, TablePlugin } from 'bootstrap-vue'

Vue.use(vueDebounce)
Vue.use(PaginationPlugin)
Vue.use(SpinnerPlugin)
Vue.use(TablePlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
