<template>
  <div id="app">
    <v-head></v-head>
    <v-sidebar></v-sidebar>
    <v-play></v-play>
    <router-view class="router-view" v-if="!isShowPlay"></router-view>
    <v-footer></v-footer>
    <about></about>
  </div>
</template>

<script>
import vHead from './components/public/head.vue'
import vFooter from './components/public/footer.vue'
import storage from './storage.js'
import vSidebar from './components/public/sidebar.vue'
import vPlay from './components/play/play.vue'
import about from './components/about.vue'

export default {
  name: 'app',
  components: {
    vHead,
    vFooter,
    vSidebar,
    vPlay,
    about
  },
  computed: {
    isShowPlay() {
      return this.$store.state.showPlay
    }
  }
}
</script>

<style lang="scss">
@import 'style/app';
</style>
