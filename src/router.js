import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 1. Define route components.
import App from './App'
import Editor from './vue-comps/group-editor-page'

// 2. Define some routes
const routes = [
  { path: '/', component: App },
  { path: '/editor', component: Editor }
]

// 3. Create the router instance and pass the `routes` option
const router = new VueRouter({
  routes //, // short for routes: routes
  // mode: 'history'
})

export default router
