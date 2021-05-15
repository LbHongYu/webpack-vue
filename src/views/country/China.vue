<template>
  <div class="China">
    <h4>China</h4>
    <!-- <p>{{count}}</p> -->
    <button @click="countUp">UP</button>
    <input type="text" v-model="iptValue"/>
    <!-- <num-lab></num-lab> -->
    <num-la></num-la>
    <num-l></num-l>
  </div>
</template>

<script>
import img from '@/assets/image/篮球.jpg';
// console.log(numLabel);

export default {
  name: 'China',
  props: {
    location: Object,
    population: Number
  },
  data () {
    return {
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
