import Vue from "vue"
import App from "./App.vue"
import store from "./store"
import "./assets/style/main.pcss"
import { onClickOutside } from "./helpers/directives"

Vue.config.productionTip = false

//Global Directives
Vue.directive("click-outside", onClickOutside)

new Vue({
  render: (h) => h(App),
  store
}).$mount("#app")
