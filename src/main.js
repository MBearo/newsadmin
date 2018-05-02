// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from './vuex'
import Vuex from 'vuex'

import axios from 'axios'
import urls from './vuex/urls'
import qs from 'qs'

Vue.use(Vuex)

Vue.config.productionTip = false
Vue.use(ElementUI);

Vue.prototype.$axios = axios
Vue.prototype.$url = urls.urls
Vue.prototype.$url2 = urls.url2
Vue.prototype.$qs = qs


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
