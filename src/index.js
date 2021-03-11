import Vue from '@/utils/vue.esm.browser.js';
import router from '@/router/index.js';
import App from './App.vue';
import 'core-js/stable';

/* eslint-disable no-new */
new Vue({
  router,
  render: h => {
    console.log(App);

    return h(App);
  }
}).$mount('#app');
