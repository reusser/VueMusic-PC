<template>
  <div class="index-container">
    <ul class="find-music-nav">
      <li class="active">个性推荐</li>
      <li>歌单</li>
      <li>主播电台</li>
      <li>排行榜</li>
      <li>歌手</li>
      <li>最新音乐</li>
    </ul>
  <v-banner
    :imgs="[
      'http://p4.music.126.net/a84glhVWa5P9XzZkpPNuHQ==/19042441881532433.jpg',
      'http://p4.music.126.net/aEzLASFy9UnIkIpdMm4EtQ==/19023750183861398.jpg',
      'http://p3.music.126.net/EubXT4UhtAy08gjJR1B_1Q==/19104014532698868.jpg',
      'http://p4.music.126.net/KE__Tj0gIz5ZWbZVDNhp9w==/19104014532705101.jpg',
      'http://p3.music.126.net/uEwDB-sZeivV2S0jiN5U_A==/19021551160569909.jpg',
      'http://p4.music.126.net/zBiNdjsk9APUYSjAgRHatQ==/19104014532698871.jpg',
      'http://p4.music.126.net/B356D3Hd0MFTEJZLTUeoPQ==/18711488883355465.jpg',
      'http://p3.music.126.net/dHBj9OSyhvDx8WpHXCe7Bg==/18958878997807302.jpg'
    ]"
  ></v-banner>
  </div>
</template>

<script>
import vBanner from './banner.vue'
/**
 * A moudule that define index component
 * @exports index
 * @author oyh(Reusjs)
 */
export default {
  name: 'index',
  components: {
    vBanner
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/index';
</style>