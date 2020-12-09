<template>
  <div id="app">
    <helloWorld></helloWorld>
  </div>
</template>

<script>
import helloWorld from '@/components/hello-world.vue';
export default {
  name: 'app',
  created () {

  },
  components: {
    helloWorld
  }
};
</script>
