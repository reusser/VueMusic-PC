<template>
  <div class="album-container" :id="theme">
    <div class="album-container-head">
      <div class="album-logo">
        <img :src="albumImgUrl">
      </div>
      <div class="detail">
        <p><span class="tag">专辑</span><span class="album-name">{{albumName}}</span></p>
        <p>歌手:<span class="singer">{{singer}}</span></p>
        <p>时间:<span class="publishtime">{{time && formatDate(time)}}</span></p>
      </div>
    </div>
    <div class="nav">
      <span>歌曲列表</span>
    </div>
    <music-list :musicList="list" :albumName="albumName" :id="theme"></music-list>
  </div>
</template>

<script>
import musicList from './musicList.vue'
/**
 * A module that define album component
 * @exports album
 * @author oyh(Reusjs)
 */
export default {
  name: 'album',
  components: {
    musicList
  },
  data() {
    return {
      albumImgUrl: '',
      albumName: '',
      time: '',
      list: {musicData:[]},
      singer: '',
      singerId: ''
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
      this.list = {musicData:[]}
      this.axios.get(`http://localhost:3000/album?id=${this.$route.params.id}`)
      .then(res => {
        this.albumImgUrl = res.data.album && res.data.album.blurPicUrl
        this.albumName = res.data.album && res.data.album.name
        this.time = res.data.album && res.data.album.publishTime
        this.singer = res.data.album && res.data.album.artist.name
        this.singerId = res.data.album && res.data.album.artist.id
        res.data.songs.forEach(item => {
          let obj = {
            name: item.name,
            id: item.id,
            singer: this.singer,
            singerId: this.singerId,
            duration: item.duration
          }
          this.list.musicData.push(obj)
        })
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
@import '../style/album';
</style>