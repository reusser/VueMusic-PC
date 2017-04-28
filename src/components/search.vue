<template>
  <div class="search-container">
    <div class="search-count">
      <p>搜索<span>{{$route.params.keywords}}</span>, 找到首<span class="search-num">{{searchSongsNum}}</span>单曲</p>
    </div>
  </div>
</template>

<script>
import musicList from './musicList.vue'
/**
 * A module that define search component
 * @exports search
 * @author oyh(Reusjs)
 */
export default {
  name: 'search',
  data() {
    return {
      searchSongList: {musicData: []},
      searchSongsNum: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.searchSongList = {musicData: []}
      this.axios.get(`http://localhost:3000/search?keywords=${this.$route.params.keywords}`)
      .then(res => {
        this.searchSongsNum = res.data.result && res.data.result.songCount
        res.data.result.songs.forEach(item => {
          let obj = {
            name: item.name,
            id: item.id,
            singer: item.artists[0].name,
            singerId: item.artists[0].id,
            duration: item.duration,
            albumName: item.album.name,
            albumId: item.album.id
          }
          this.searchSongList.musicData.push(obj)
        })
      })
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        this.fetchData
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/search';
</style>