<template>
  <div class="China">
    {{label}}
  </div>
</template>
<script>
import { add } from '@/utils/arithmetic.js';

export default {
  name: 'China',

  props: {
    customLabel: String
  },

  data () {
    return {
      label: 'comp-3'
    };
  },

  watch: {},

  components: {

  },

  created () {
    // console.log('China');

  },

  methods: {

  }
};
</script>
<style lang="scss" scoped>

</style>