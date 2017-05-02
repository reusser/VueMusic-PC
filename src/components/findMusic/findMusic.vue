<template>
  <div class="index-container">
    <ul class="find-music-nav">
      <li class="active">个性推荐</li>
      <li @click="$router.push({name: 'playList'})">歌单</li>
      <li @click="$router.push({name: 'rank'})">排行榜</li>
      <li @click="$router.push({name: 'hotSinger'})">歌手</li>
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
    <div class="recommend-list">
      <p>推荐歌单</p>
      <ul>
        <li class="day-commend">
          <div class="copywrite" :class="{'show-copywrite': -1 === showIndex}"
            @mouseover="showCopywrite(-1)"
            @mouseout="showCopywrite(-2)">
            根据您的音乐口味生成每日更新
          </div>
          <div class="content" @mouseover="showCopywrite(-1)" @mouseout="showCopywrite(-2)">
            <div>
              <span class="week">{{week}}</span><br>
              <span class="day">{{day}}</span>
            </div>
          </div>
          <div class="dec"><span>每日歌曲推荐</span></div>
        </li>
        <template v-for="(item, index) in commendList">
          <li class="commend-item">
            <div class="copywrite" :class="{'show-copywrite' : index === showIndex}"
              @mouseover="showCopywrite(index)"
              @mouseout="showCopywrite(-2)">
              <div>{{item.copywrite}}</div>
            </div>
            <div class="listen-num" :class="{'hide-listen-num': index === showIndex}">
              <i class="fa fa-headphones"></i><span>{{~~ commendList[index].playcount >= 100000 ? `${Math.floor(~~ commendList[index].playcount / 10000)}万` : commendList[index].playcount}}</span>
            </div>
            <div 
              class="item-img"
              :style="{background: `url(${item.backgroundUrl}) no-repeat`,
                      'background-size': 'cover',
                      'background-position': 'center center'
              }"
              @mouseover="showCopywrite(index)"
              @mouseout="showCopywrite(-2)"
            >
              <div class="play-btn" :class="{'show-play': index === showIndex}">
              </div>
            </div>
            <div class="dec">
              <span>{{item.name}}</span>
            </div>
          </li>
        </template>
      </ul>
    </div>
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
  },
  data() {
    return { 
      weekArr: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      showIndex: -2
    }
  },
  mounted() {
    this.$store.dispatch('getInitCommend')
    .then(data => this.$store.commit('setCommendList', data))
  },
  computed: {
    commendList() {
      return this.$store.state.commendList.commendList
    },
    week() {
      return this.weekArr[new Date().getDay()]
    },
    day() {
      return new Date().getDate()
    }
  },
  methods: {
    showCopywrite(index) {
      this.showIndex = index
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/index';
</style>