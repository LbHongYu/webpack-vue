<template>
  <div class="hello-world">
    <h3>hello-world</h3>
    <p class="content">hello-world contentcontentcontentcontentcontentcontentcontent</p>
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
    display: flex;
    // some comment
    .content {
      flex: 1;
      transform: translateX(10px);
    }
  }
</style>