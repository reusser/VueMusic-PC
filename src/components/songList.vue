<template>
  <div class="song-list-container" :id="theme">
    <div class="container-head" v-if="!isLoading">
      <div class="list-logo">
        <img :src="imgUrl">
      </div>
      <div class="detail">
        <p>
          <span class="tag">歌单</span>
          <span class="list-name">{{listName}}</span>
        </p>
        <p>
          <img :src="avatarUrl" class="avatar">
          <span class="creator">{{creator}}</span>
          <span class="time">{{formatDate(time)}}</span>
        </p>
        <p v-if="isTag" class="istag">标签:&nbsp;&nbsp;<span v-for="tag in tags" class="tags"> {{tag}} /</span></p>
        <p v-if="isDescription && (index < 2 || !isToggle)" v-for="(item, index) in description" class="description">{{item}}</p>
        <span class="toggle-btn" @click="isToggle = false" v-if="isToggle && description.length > 2"><i class="fa fa-angle-down"></i></span>
        <div class="count">
          <span class="song-count"><i class="fa fa-music fa-fw"></i>{{songCount}}</span>
          <span class="play-count"><i class="fa fa-play-circle-o fa-fw"></i>{{formatCount(playCount)}}</span>
        </div>
      </div>
    </div>
    <div class="nav" v-if="!isLoading">
      <span>歌曲列表</span>
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
      <li v-for="(item, index) in songList.musicData" @dblclick="$store.commit('setMusicList', songList); $store.commit('setPlayIndex', index)">
        <span class="index">{{index + 1 > 9 ? index + 1 : `0${index + 1}`}}</span>
        <span class="option"><i class="fa fa-heart-o fa-fw"></i><i class="fa fa-download fa-fw"></i></span>
        <span class="music-title">{{item.name}}<span class="alias" v-if="item.isAlias">{{item.alias}}</span></span>
        <span class="singer" @click="$router.push({name: 'singer', params: {id: item.singerId}})">{{item.singer}}<span class="alias" v-if="item.isSingerAlias">{{item.singerAlias}}</span></span>
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
 * A module that define songlist component
 * @exports songList
 * @author oyh(Reusjs)
 */
export default {
  name: 'songList',
  data() {
    return {
      imgUrl: '',
      listName: '',
      avatarUrl: '',
      creator: '',
      time: '',
      songCount: 0,
      playCount: 0,
      isTag: false,
      isDescription: false,
      tags: [],
      description: [],
      songList: {musicData: []},
      isToggle: true,
      isLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  computed: {
    theme() {
      return this.$store.state.theme
    }
  },
  methods: {
    fetchData() {
      this.songList = {musicData: []}
      this.isLoading = true
      this.axios.get(`http://localhost:3000/playlist/detail?id=${this.$route.params.id}`)
      .then(res => {
        this.imgUrl    = res.data.playlist && res.data.playlist.picUrl
        this.listName  = res.data.playlist && res.data.playlist.name
        this.avatarUrl = res.data.playlist && res.data.playlist.creator.avatarUrl
        this.creator   = res.data.playlist && res.data.playlist.creator.nickname
        this.time      = res.data.playlist && res.data.playlist.createTime
        this.songCount = res.data.playlist && res.data.playlist.trackCount
        this.playCount = res.data.playlist && res.data.playlist.playCount
        if (res.data.playlist.tags.length > 0) {
          this.isTag = true
          this.tags = res.data.playlist.tags
        } else {
          this.isTag = false
          this.tags = []
        }
        if (res.data.playlist.description != null) {
          this.isDescription = true
          this.description = res.data.playlist.description.split('\n')
        } else {
          this.isDescription = false
          this.description = ''
        }
        return res
      })
      .then(res => {
        res.data.playlist.tracks.forEach(item => {
          let obj = {
            name: item.name,
            id: item.id,
            singer: item.ar[0].name,
            singerId: item.ar[0].id,
            duration: item.dt,
            albumName: item.al.name,
            albumId: item.al.id,
          }
          if (item.alia.length > 0) {
            obj.isAlias = true
            obj.alias = item.alia[0]
          } else {
            obj.isAlias = false
            obj.alias = ''
          }
          if (item.ar[0].alias.length > 0) {
            obj.isSingerAlias = true
            obj.singerAlias = item.ar[0].alias[0]
          } else {
            obj.isSingerAlias = false
            obj.singerAlias = ''
          }
          this.songList.musicData.push(obj)
        })
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
      })
    },
    formatDate(time) {
      let date = new Date(time)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      month = month > 9 ? month : `0${month}`
      day = day > 9 ? day : `0${day}`
      return `${year}-${month}-${day}`
    },
    formatCount(count) {
      return count < 100000 ? count : `${Math.floor(count / 10000)}万`
    },
    formatTime(time) {
      time = Math.floor(time / 1000)
      let second = time % 60
      let min = (time - second) / 60
      second = second > 9 ? second : `0${second}`
      min = min > 9 ? min : `0${min}`
      return `${min}:${second}`
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        this.fetchData()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../style/songList";
</style>