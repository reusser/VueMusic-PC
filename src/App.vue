<template>
  <div id="app">
    <v-head></v-head>
    <router-view></router-view>
  </div>
</template>

<script>
import vHead from './components/public/head.vue'

export default {
  name: 'app',
  components: {
    vHead
  }
}
</script>

<style lang="scss">
@import 'style/app'
</style>
