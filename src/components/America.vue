<template>
  <div class="America">
    <h3>America</h3>
    <img :src="image">
  </div>
</template>
<script>
import image from '../assets/image/bless.jpeg';

export default {
  name: 'America',

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
    console.log('America');

  },

  methods: {

  }
};
</script>
<style lang="scss" scoped>

</style>