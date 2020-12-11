import Vue from 'vue';
import App from './App.vue';
import helloWorld from '@/components/hello-world.vue';
import 'core-js/stable';

const promise = new Promise((reslove, reject) => {
  setTimeout(() => {
    console.log('resloveFn Done');
    reslove();
  }, 3000);
});

// const fn = () => {
//   console.log('this is a function');
// };

// class Car {
//   constructor () {
//     this.door = '';
//   }

//   setDoor (newDoor) {
//     this.door = newDoor;
//   }
// }

Vue.component('hello-World', helloWorld);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
}).$mount('#app');
