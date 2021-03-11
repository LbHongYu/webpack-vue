<template>
  <div class="China">
    <h4>China</h4>
    <p>{{count}}</p>
    <button @click="countUp">UP</button>
  </div>
</template>

<script>
import numLabel from '@/components/comp-1.vue';
console.log(numLabel);

export default {
  name: 'China',
  props: {
    location: Object,
    population: Number
  },
  data () {
    return {
      count: 0
    };
  },
  created () {

  },
  components: {
  },
  methods: {
    countUp () {
      this.count++;
    }
  }
};
</script>
