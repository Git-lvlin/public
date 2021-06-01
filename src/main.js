import Vue from 'vue';
import Big from 'big.js';
import App from './App';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.filter('price', (value) => new Big(value).div(new Big(100)));

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
