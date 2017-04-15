<template>
  <div id="app">
    <v-head></v-head>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vHead from './components/public/head.vue'
import vFooter from './components/public/footer.vue'

export default {
  name: 'app',
  components: {
    vHead,
    vFooter
  }
}
</script>

<style lang="scss">
@import 'style/app'
</style>
