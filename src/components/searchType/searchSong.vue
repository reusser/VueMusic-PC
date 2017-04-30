<template>
  <div class="search-songs-container">
    <div class="search-list-head">
      <span class="space"></span>
      <span class="option">操作</span>
      <span class="music-title">音乐标题</span>
      <span class="singer">歌手</span>
      <span class="album-name">专辑</span>
      <span class="duration">时长</span>
    </div>
    <ul class="songs">
      <li v-for="(item, index) in songList.musicData" @dblclick="$store.commit('modifyMusicList', item)">
        <span class="index">{{(index + 1 + (nowPageIndex  - 1)* 30) > 9 ? index + 1 + (nowPageIndex - 1) * 30 : `0${index + 1}`}}</span>
        <span class="option"><i class="fa fa-heart-o fa-fw"></i><i class="fa fa-download fa-fw"></i></span>
        <span class="music-title" v-if="!item.isAlias">{{item.name}}</span>
        <div class="music-title" v-if="item.isAlias"><p>{{item.name}}</p><p class="alias">{{item.alias}}</p></div>
        <span class="singer" @click="$router.push({name: 'singer', params: {id: item.singerId}})">{{item.singer}}</span>
        <span class="album-name" @click="$router.push({name: 'album', params: {id: item.albumId}})">{{item.albumName}}</span>
        <span class="duration">{{formatTime(~~ item.duration)}}</span>
      </li>
    </ul>
    <div class="page">
      <ul>
        <li class="pre-btn" @click="$emit('updateOffset', ~~ (nowPageIndex - 1))"><i class="fa fa-angle-left"></i></li>
        <li :class="nowPageIndex === 1 ? 'active' : ''" @click="$emit('updateOffset', 1)" v-if="Math.ceil(songTotal / 30) > 1">1</li>
        <li class="apostrophe" v-show="nowPageIndex >= 6">...</li>
        <li v-for="(item, index) in pageList" @click="$emit('updateOffset', ~~ item)" :class="~~ item === nowPageIndex ? 'active' : ''">{{item}}</li>
        <li class="apostrophe" v-show="nowPageIndex <= Math.ceil(songTotal / 30) - 5">...</li>
        <li :class="nowPageIndex === Math.ceil(songTotal / 30) ? 'active' : ''" @click="$emit('updateOffset', Math.ceil(songTotal / 30))">{{Math.ceil(songTotal / 30)}}</li>
        <li class="next-btn" @click="$emit('updateOffset',~~ (nowPageIndex + 1))"><i class="fa fa-angle-right"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * A module that define searchSong a type of searchResult
 * @exports searchSong
 * @author oyh(Reusjs)
 */
export default {
  name: 'searchSong',
  props: {
    songList: {
      type: Object,
      default: {musicData: []}
    },
    songTotal: {
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
      let total = Math.ceil(this.songTotal / 30)
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
    }
  },
  methods: {
    formatTime(time) {
      time = Math.floor(time / 1000)
      let second = time % 60
      let min = (time - second) / 60
      second = second > 9 ? second : `0${second}`
      min = min > 9 ? min : `0${min}`
      return `${min}:${second}`
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/searchSong';
</style>