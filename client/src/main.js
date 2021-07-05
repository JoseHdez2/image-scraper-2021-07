import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

import { PaginationPlugin, TablePlugin } from 'bootstrap-vue'
Vue.use(PaginationPlugin)
Vue.use(TablePlugin)

new Vue({
  render: h => h(App),
}).$mount('#app')
