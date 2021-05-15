<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import {
  add,
  subtract,
  multiply,
  divide
} from '@/utils/arithmetic.js'
export default {
  name: 'app',
  created () {

  },
  components: {
  },
  methods: {
  }
};
</script>
