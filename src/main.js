// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
var VueResource = require('vue-resource')

window.bus = new Vue()
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

/* eslint-disable no-new */
new Vue({
  router
}).$mount('#app')
