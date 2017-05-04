<template>
  <div class="singer-container" :id="theme">
    <div class="singer-head">
      <div class="singer-img">
        <img :src="singerImgUrl">
      </div>
      <div class="detail">
        <p>
          <span class="tag">歌手</span>
          <span class="singer">{{singer}}</span>
        </p>
        <p class="alias">{{alias}}</p>
        <p>单曲数:&nbsp;&nbsp;<span class="detail-num">{{musicSize}}</span></p>
        <p>专辑数:&nbsp;&nbsp;<span class="detail-num">{{albumSize}}</span></p>
        <p>MV数:&nbsp;&nbsp;<span class="detail-num">{{mvSize}}</span></p>
      </div>
    </div>
    <div class="nav">
      <span>专辑</span>
    </div>
    <div class="albums">
      <div class="hot-songs">
        <div class="album-logo">
          <img src="http://on99ebnkk.bkt.clouddn.com/top50.png">
        </div>
        <div class="albums-content">
          <p class="albums-title">热门50首</p>
          <ul>
            <li 
              v-for="(item, index) in hotSongsList.musicData" 
              v-if="index < 10 || showAll" 
              @dblclick="$store.commit('setMusicList', hotSongsList);
              $store.commit('setPlayIndex', index)"
            >
              <span class="index">
                {{index + 1 > 9 ? index + 1 : `0${index + 1}`}}
              </span>
              <span><i class="fa fa-heart-o fa-fw"></i><i class="fa fa-download fa-fw"></i></span>
              <span class="song-name">{{item.name}}</span>
              <span class="time">{{formatTime(~~ item.duration)}}</span>
            </li>
          </ul>
          <p class="show-all" v-if="!showAll"><span @click="showAll = true">查看全部50首&nbsp;<i class="fa fa-angle-right"></i></span></p>
        </div>
      </div>
      <div v-for="item in albumList" class="album-songs">
        <div class="album-logo">
          <img :src="item.albumImgUrl">
          <p class="publishtime">{{formatDate(item.time)}}</p>
        </div>
        <div class="albums-content">
          <p class="albums-title"><span @click="$router.push({name: 'album', params: {id: item.albumId}})">{{item.name}}</span></p>
          <ul>
            <li 
              v-for="(songs, index) in item.musicData.musicData" 
              @dblclick="$store.commit('setMusicList', item.musicData);
              $store.commit('setPlayIndex', index)"
            >
              <span class="index">
                {{index + 1 > 9 ? index + 1 : `0${index + 1}`}}
              </span>
              <span><i class="fa fa-heart-o fa-fw"></i><i class="fa fa-download fa-fw"></i></span>
              <span class="song-name">{{songs.name}}</span>
              <span class="time">{{formatTime(~~ songs.duration)}}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * A module that define singer component
 * @exports singer
 * @author oyh(Reusjs)
 */
export default {
  name: 'singer',
  data() {
    return {
      hotSongsList: {"musicData":[]},
      albumList: [],
      singerImgUrl: '',
      singer: '',
      singerId: '',
      alias: '',
      musicSize: 0,
      albumSize: 0,
      mvSize: 0,
      showAll: false
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
      this.hotSongsList = {"musicData":[]}
      this.albumList = []
      this.axios.get(`http://localhost:3000/artists?id=${this.$route.params.id}`)
      .then(res => {
        this.singerId = res.data.artist && res.data.artist.id
        this.singer = res.data.artist && res.data.artist.name
        this.singerImgUrl = res.data.artist && res.data.artist.picUrl
        this.alias = res.data.artist && res.data.artist.alias[0]
        this.musicSize = res.data.artist && res.data.artist.musicSize
        this.albumSize = res.data.artist && res.data.artist.albumSize
        this.mvSize = res.data.artist && res.data.artist.mvSize
        res.data.hotSongs.forEach(item => {
          let obj = {
            name: item.name,
            id: item.id,
            singer: this.singer,
            singerId: this.singerId,
            duration: item.dt
          }
          this.hotSongsList.musicData.push(obj)
        })
      })
      this.axios.get(`http://localhost:3000/artist/album?id=${this.$route.params.id}`)
      .then(res => {
        res.data.hotAlbums.forEach(item => {
          let obj = {
            name: item.name,
            time: item.publishTime,
            albumId: item.id,
            albumImgUrl: item.picUrl,
            musicData: {"musicData": []}
          }
          this.axios.get(`http://localhost:3000/album?id=${obj.albumId}`)
          .then(res => {
            res.data.songs.forEach(item => {
              let song = {
                name: item.name,
                id: item.id,
                singer: this.singer,
                singerId: this.singerId,
                duration: item.dt
              }
              obj.musicData.musicData.push(song)
            })
          })
          this.albumList.push(obj)
        })
      })
    },
    formatTime(time) {
      time = Math.floor(time / 1000)
      let second = time % 60
      let min = (time - second) / 60
      second = second > 9 ? second : `0${second}`
      min = min > 9 ? min : `0${min}`
      return `${min}:${second}`
    },
    formatDate(time) {
      let date = new Date(time)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      month = month > 9 ? month : `0${month}`
      day = day > 9 ? day : `0${day}`
      return `${year}-${month}-${day}`
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
@import "../style/singer";
</style>