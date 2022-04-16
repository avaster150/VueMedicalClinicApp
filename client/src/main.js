import Vue from 'vue'
import App from '@/components/app/App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import VueMask from 'v-mask'
import moment from 'moment';


import {
  ApiPlugin
} from './plugins/api'

import '@/styles/index.scss'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.config.productionTip = false
Vue.use(VueMask);
Vue.use(ApiPlugin);

new Vue({
  router,
  store,
  vuetify,
  moment,
  render: h => h(App),
}).$mount('#app')