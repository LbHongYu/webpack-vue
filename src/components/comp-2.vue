<template>
  <div class="China">
    {{label}}
  </div>
</template>
<script>
import { add } from '@/utils/arithmetic.js';

export default {
  name: 'comp-2',

  props: {
    customLabel: String
  },

  data () {
    return {
      label: 'comp-2'
    };
  },

  watch: {},

  components: {

  },

  created () {
    // console.log('China');
    this.label = this.$props.customLabel ? this.$props.customLabel : 'comp-2'
  },

  methods: {

  }
};
</script>
<style lang="scss" scoped>

</style>