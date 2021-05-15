<template>
  <div class="China">
    {{label}}
  </div>
</template>
<script>
import { add } from '@/utils/arithmetic.js';

export default {
  name: 'comp-3',

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
    this.label = this.$props.customLabel ? this.$props.customLabel : 'comp-3';
  },

  methods: {

  }
};
</script>
<style lang="scss" scoped>

</style>