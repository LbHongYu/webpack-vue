import Router from 'vue-router';
import Vue from '@/utils/vue.esm.browser.js';

const push = Router.prototype.push;
Router.prototype.push = function (location) {
  return push.call(this, location).catch(error => error);
};

Vue.use(Router);

let routeObj = {
  // mode: 'history',
  routes: [{
  path: '/',
  name: 'Home',
  component: () => import('@/views/home.vue'),
  // redirect: '/China',
  children: [
    {
      path: '/China',
      name: 'China',
      component: () => import('@/views/country/China.vue'),
    }, {
      path: '/America',
      name: 'America',
      component: () => import('@/views/country/America.vue'),
    }, {
      path: '/Japan',
      name: 'Japan',
      component: () => import('@/views/country/Japan.vue'),
    }, {
      path: '/web-rtc',
      name: 'WebRTC',
      component: () => import('@/views/web-rtc/index.vue'),
    }
  ]
}]
};

let routerInstance = new Router(routeObj);

export default routerInstance;
