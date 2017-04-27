<template>
  <div class="music-list">
    <ul>
      <li class="music-list-head">
        <span class="space"></span>
        <span class="option">操作</span>
        <span class="music-title">音乐标题</span>
        <span class="singer">歌手</span>
        <span class="album-name">专辑</span>
        <span class="duration">时长</span>
      </li>
      <li v-for="(item, index) in musicList.musicData" @dblclick="$store.commit('setMusicList', musicList); $store.commit('setPlayIndex', index)">
        <span class="index">{{index + 1 > 9 ? index + 1 : `0${index + 1}`}}</span>
        <span class="option"><i class="fa fa-heart-o fa-fw"></i><i class="fa fa-download fa-fw"></i></span>
        <span class="music-title">{{item.name}}</span>
        <span class="singer" @click="$router.push({name: 'singer', params: {id: item.singerId}})">{{item.singer}}</span>
        <span class="album-name">{{albumName}}</span>
        <span class="duration">{{formatTime(~~ item.duration)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * A module that define musicList component
 * @exports musicList
 * @author oyh(Reusjs)
 */
export default {
  name: 'musicList',
  props: {
    musicList: {
      type: Object,
      default: {musicData: []}
    },
    albumName: {
      type: String,
      default: ''
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
@import '../style/musicList';
</style>