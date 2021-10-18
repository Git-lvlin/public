import Vue from 'vue';
import Big from 'big.js';
import VConsole from 'vconsole';
import jsBridge from '@/utils/jsBridge';
import App from './App';
import router from './router';
import store from './store';

let vconsole = null;
if(process.env.VUE_APP_API_ENV != "pro") {
  vconsole = new VConsole();
}
console.log('href', window.location.href);
console.log("jsBridge", jsBridge);
if (window.location.href.indexOf('web/share') == -1) {
  Vue.prototype.$bridge = jsBridge;
}
Vue.config.productionTip = false;
Vue.filter('price', (value) => new Big(value).div(new Big(100)));
Vue.filter('pxtovw', (value) => `${value / 375 * 100}vw`);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default vconsole;
