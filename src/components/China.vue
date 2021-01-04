<template>
  <div class="China">
    <h3>China</h3>
    <img :src="image">
  </div>
</template>
<script>
import image from '../assets/image/bless.jpeg';
import { add } from '@/utils/arithmetic.js';

add();

export default {
  name: 'China',

  props: {},

  data () {
    return {
      image: image
    };
  },

  watch: {},

  components: {

  },

  created () {
    console.log('China');

  },

  methods: {

  }
};
</script>
<style lang="scss" scoped>

</style>