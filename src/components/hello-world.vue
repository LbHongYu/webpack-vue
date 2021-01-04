<template>
  <div class="hello-world">
    <br/>
    <America/>
    <br/>
    <China/>
  </div>
</template>

<script>
import America from './America.vue'
import China from './China.vue'

export default {
  name: 'hello-world',

  props: {},

  data () {
    return {

    };
  },

  watch: {},

  components: {
    America,
    China
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
    display: flex;
    flex-flow: column;
    // some comment some comment some comment
    .content {
      flex: 1;
      transform: translateX(10px);
    }
  }
</style>