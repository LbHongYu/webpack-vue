<template>
  <div class="China">
    <h4>China</h4>
    <img :src="img" alt=""/>
    <img src="~assets/image/篮球.jpg" alt=""/>
    <!-- <p>{{count}}</p> -->
    <button @click="countUp">UP</button>
    <input type="text" v-model="iptValue"/>
    <num-lab></num-lab>
    <num-la></num-la>
    <num-l></num-l>
  </div>
</template>

<script>
import img from '@/assets/image/篮球.jpg';
import img1 from '@/assets/image/CodeCogsEqn (36).png';
console.log(img, img1);

// console.log(numLabel);
var aaa = new Promise((resolve, reject) => {
  resolve();
});

export default {
  name: 'China',
  props: {
    location: Object,
    population: Number
  },
  data () {
    return {
      img: img,
      iptValue: '',
      dataPool: {
        count: 0
      }
    };
  },
  created () {
  },

  watch: {
    'dataPool.count': {
      handler (newV, oldV) {
        console.log('count', oldV);
      }
      // immediate: true
    }
  },

  computed: {
    plusCount () {
      return this.dataPool.count + 2;
    }
  },
  components: {
    numLab: () => import('@/components/comp-3.vue'),
    numLa: () => import('@/components/comp-2.vue'),
    numL: () => import('@/components/comp-1.vue')
  },
  methods: {
    countUp () {
      this.dataPool.count++;
    }
  }
};
</script>
<style lang="scss" scoped>
// Chinan Style
// Chinan Style
// Chinan Style
// Chinan Style
.China {
  h4 {
    background: url(~assets/image/篮球.jpg);
    background: cadetblue;
    display: grid;
    text-size-adjust: 100%;
  }
}
</style>
