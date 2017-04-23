<template>
  <div id="app">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <v-play></v-play>
    <router-view class="router-view"></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
import vHead from './components/public/head.vue'
import vFooter from './components/public/footer.vue'
import storage from './storage.js'
import vSidebar from './components/public/sidebar.vue'
import vPlay from './components/play/play.vue'

export default {
  name: 'app',
  components: {
    vHead,
    vFooter,
    vSidebar,
    vPlay
  }
}
</script>

<style lang="scss">
@import 'style/app';
</style>
