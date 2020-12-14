<template>
  <div class="hello-world">
    <h3>hello-world</h3>
    <America/>
  </div>
</template>

<script>
import America from './America.vue'

export default {
  name: 'hello-world',

  props: {},

  data () {
    return {

    };
  },

  watch: {},

  components: {
    America
  },

  created () {
    console.log('hello-world');

  },

  methods: {

  }
};
</script>
<style lang="scss" scoped>
  @import '~@/assets/scss/reset.scss';
  .hello-world {
    color: #ADFADF;
  }
</style>