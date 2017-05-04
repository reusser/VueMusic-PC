<template>
  <div class="search-song-list-container" :id="theme">
    <ul class="playlist">
      <li v-for="item in playList" @click="$router.push({name: 'songList', params:{id: item.id}})">
        <img :src="item.imgUrl" class="playlist-logo">
        <span class="playlist-name">{{item.name}}</span>
        <span class="track-count">{{item.trackCount}}首</span>
        <span class="creator">by&nbsp;&nbsp;{{item.creator}}</span>
      </li>
    </ul>
    <div class="page">
      <ul>
        <li class="pre-btn" @click="$emit('updatePlayListOffset', ~~ (nowPageIndex - 1))"><i class="fa fa-angle-left"></i></li>
        <li :class="nowPageIndex === 1 ? 'active' : ''" @click="$emit('updatePlayListOffset', 1)" v-if="Math.ceil(playListTotal / 30) > 1">1</li>
        <li class="apostrophe" v-show="nowPageIndex >= 6">...</li>
        <li v-for="(item, index) in pageList" @click="$emit('updatePlayListOffset', ~~ item)" :class="~~ item === nowPageIndex ? 'active' : ''">{{item}}</li>
        <li class="apostrophe" v-show="nowPageIndex <= Math.ceil(playListTotal / 30) - 5">...</li>
        <li :class="nowPageIndex === Math.ceil(playListTotal / 30) ? 'active' : ''" @click="$emit('updatePlayListOffset', Math.ceil(playListTotal / 30))">{{Math.ceil(playListTotal / 30)}}</li>
        <li class="next-btn" @click="$emit('updatePlayListOffset',~~ (nowPageIndex + 1))"><i class="fa fa-angle-right"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * A module that define searchSongList a type of search
 * @exports searchSongList
 * @author oyh(Reusjs)
 */
export default {
  name: 'searchSongList',
  props: {
    playList: {
      type: Array,
      default: []
    },
    playListTotal: {
      type: Number,
      default: 0
    },
    nowPageIndex: {
      type: Number,
      default: 1
    }
  },
  computed: {
    pageList() {
      let arr = []
      let total = Math.ceil(this.singerTotal / 30)
      if (total < 3) return []
      if (total < 9) {
        let arr = [...Array(total).keys()]
        arr.shift()
        arr.shift()
        return arr
      }
      if (this.nowPageIndex < 6) return [2, 3, 4, 5, 6, 7, 8]
      if (this.nowPageIndex > total - 5) return [total - 7, total - 6, total - 5, total - 4, total - 3, total - 2, total - 1]
      return [this.nowPageIndex - 3, this.nowPageIndex - 2, this.nowPageIndex - 1, this.nowPageIndex, this.nowPageIndex + 1, this.nowPageIndex + 2, this.nowPageIndex + 3]
    },
    theme() {
      return this.$store.state.theme
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/searchSongList";
</style>