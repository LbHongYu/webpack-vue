<template>
  <div class="China">
    {{label}}
  </div>
</template>
<script>
import { add } from '@/utils/arithmetic.js';

export default {
  name: 'comp-1',

  props: {
    customLabel: String
  },

  data () {
    return {
      label: 'comp-1'
    };
  },

  watch: {},

  components: {

  },

  created () {
    // console.log('China');
    this.label = this.$props.customLabel ? this.$props.customLabel : 'comp-1'
  },

  methods: {

  }
};
</script>
<style lang="scss" scoped>

</style>