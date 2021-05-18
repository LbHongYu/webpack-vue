import Vue from '@/utils/vue.esm.browser.js';
import router from '@/router/index.js';
import App from './App.vue';
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

// Vue.use(ElementUI, { size: 'small', zIndex: 0 });

/* eslint-disable no-new */
new Vue({
  router,
  render: h => {
    return h(App);
  }
}).$mount('#app');
