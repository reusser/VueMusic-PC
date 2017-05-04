<template>
  <div class="new-song-container" :id="theme">
    <ul class="new-song-nav">
      <li @click="$router.push({name: 'findMusic'})">个性推荐</li>
      <li @click="$router.push({name: 'playList'})">歌单</li>
      <li @click="$router.push({name: 'rank'})">排行榜</li>
      <li @click="$router.push({name: 'hotSinger'})">歌手</li>
      <li class="active">最新音乐</li>
    </ul>
    <ul class="new-song">
      <li v-for="(item, index) in list.musicData" @dblclick="$store.commit('setMusicList', list); $store.commit('setPlayIndex', index)">
        <span class="index">{{index + 1 > 9 ? index + 1 : `0${index + 1}`}}</span>
        <img :src="item.imgUrl">
        <span class="song-name">{{item.name}}<span class="alias" v-if="item.isAlias">({{item.alias}})</span></span>
        <span class="singer" @click="$router.push({name: 'singer', params: {id: item.singerId}})">{{item.singer}}</span>
        <span class="album" @click="$router.push({name: 'album', params: {id: item.albumId}})">{{item.albumName}}<span class="alias" v-if="item.isAlbumAlias">({{item.albumAlias}})</span></span>
        <span class="duration">{{formatTime(item.duration)}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * A module that define newSong component
 * @exports newSong
 * @author oyh(Reusjs)
 */
export default {
  name: 'newSong',
  data() {
    return {
      list: {musicData: []}
    }
  },
  mounted() {
    this.list = {musicData: []}
    this.axios.get(`http://localhost:3000/personalized/newsong`)
    .then(res => {
      res.data.result.forEach(item => {
        let obj = {
          id: item.song.id,
          imgUrl: item.song.album.picUrl,
          name: item.song.name,
          duration: item.song.duration,
          singer: item.song.artists[0].name,
          singerId: item.song.artists[0].id,
          albumName: item.song.album.name,
          albumId: item.song.album.id
        }
        if (item.song.alias.length > 0) {
          obj.isAlias = true
          obj.alias = item.song.alias[0]
        } else {
          obj.isAlias = false
          obj.alias = ''
        }
        if (item.song.album.alias.length > 0) {
          obj.isAlbumAlias = true
          obj.albumAlias = item.song.album.alias[0]
        } else {
          obj.isAlbumAlias = false
          obj.albumAlias = ''
        }
        this.list.musicData.push(obj)
      })
    })
  },
  computed: {
    theme() {
      return this.$store.state.theme
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
@import "../../style/newSong";
</style>