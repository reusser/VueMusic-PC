<template>
  <div class="day-container">
    <div class="container-head" v-if="!isLoading">
      <div class="list-logo">
        <div>
          <span class="week">{{week}}</span><br>
          <span class="day">{{days}}</span>
        </div>
      </div>
      <div class="detail">
        <p>
          <span class="list-name">每日歌曲推荐</span>
        </p>
        <p class="description"><i class="fa fa-lightbulb-o fa-fw"></i>根据你的音乐口味生成，每天6:00更新</p>
      </div>
    </div>
    <div class="music-list" v-if="!isLoading">
    <ul>
      <li class="music-list-head">
        <span class="space"></span>
        <span class="option">操作</span>
        <span class="music-title">音乐标题</span>
        <span class="singer">歌手</span>
        <span class="album-name">专辑</span>
        <span class="duration">时长</span>
      </li>
      <li v-for="(item, index) in day.musicData" @dblclick="$store.commit('setMusicList', day); $store.commit('setPlayIndex', index)">
        <span class="index">{{index + 1 > 9 ? index + 1 : `0${index + 1}`}}</span>
        <span class="option"><i class="fa fa-heart-o fa-fw"></i><i class="fa fa-download fa-fw"></i></span>
        <span class="music-title">{{item.name}}</span>
        <span class="singer" @click="$router.push({name: 'singer', params: {id: item.singerId}})">{{item.singer}}</span>
        <span class="album-name" @click="$router.push({name: 'album', params: {id: item.albumId}})">{{item.albumName}}</span>
        <span class="duration">{{formatTime(~~ item.duration)}}</span>
      </li>
    </ul>
  </div>
  <transition name="fade">
    <div class="loading" v-if="isLoading">
      <i class="fa fa-spinner fa-pulse"></i>
      <p>载入中...</p>
    </div>
  </transition>
  </div>
</template>

<script>
/**
 * A module that define day component
 * @exports day
 * @author oyh(Reusjs)
 */
export default {
  name: 'day',
  data() {
    return {
      isLoading: true,
      weekArr: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"]
    }
  },
  created() {
    this.$store.dispatch('getInitDay')
    .then(day => {
      this.$store.commit('setDay', day)
      setTimeout(() => this.isLoading = false, 2000)
    })
  },
  computed: {
    day() {
      return this.$store.state.day
    },
    week() {
      return this.weekArr[new Date().getDay()]
    },
    days() {
      return new Date().getDate()
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
@import "../style/day";
</style>