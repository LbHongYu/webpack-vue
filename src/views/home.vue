<template>
  <div class="conent-main">
    <ul>
      <li @click="routeTo('China')">China</li>
      <li @click="routeTo('America')">America</li>
      <li @click="routeTo('Japan')">Japan</li>
      <li @click="routeTo('WebRTC')">WebRTC</li>
    </ul>

    <keep-alive :include="includeComp">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
var ddd = new Promise((resolve, reject) => {
  resolve();
});
export default {
  name: 'country',
  data () {
    return {
      includeComp: ['China', 'America']
    };
  },
  created () {

  },
  components: {
  },
  methods: {
    routeTo (name) {
      this.$router.push({
        name
      });
    }
  }
};
</script>
