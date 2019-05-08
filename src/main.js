import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import Drag from './components/lianxi/position';


import loding from './components/loding';
import http from './utils/http.js';
import message from './components/message/index';
import BScroll from 'better-scroll'

import VueLazyload from 'vue-lazyload';
Vue.prototype.BScroll = BScroll
Vue.prototype.$bus = new Vue()
Vue.config.productionTip = false;
Vue.use(Drag)
Vue.use(http);
Vue.config.productionTip = false;
Vue.use(loding)
Vue.use(message)
Vue.use(VueLazyload,{
  preLoad:0.8,
  // error:'/2.jpg',
  // loading:'/3.jpg'
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
