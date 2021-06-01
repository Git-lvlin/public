import Vue from 'vue';
import Big from 'big.js';
import VConsole from 'vconsole';
import Bridge from '@/utils/jsBridge';
import App from './App';
import router from './router';
import store from './store';

const vconsole = new VConsole();

Vue.prototype.$bridge = Bridge;
Vue.config.productionTip = false;
Vue.filter('price', (value) => new Big(value).div(new Big(100)));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

export default vconsole;
