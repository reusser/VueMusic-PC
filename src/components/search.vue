<template>
  <div class="search-container">
    <transition name="fade">
      <div v-if="!isLoading">
        <div class="search-count">
        <p>搜索<span class="keywords">"{{$route.params.keywords}}"</span>, 找到
          <span class="search-num">{{searchSongsNum}}</span>首单曲</p>
        </div>
        <search-song :songList="searchSongList"></search-song>
      </div>
    </transition>
    <transition name="fade">
      <div class="loading" v-if="isLoading">
        <i class="fa fa-spinner fa-pulse"></i>
        <p>载入中...</p>
      </div>
    </transition>
  </div>
</template>

<script>
import searchSong from './searchType/searchSong.vue'
/**
 * A module that define search component
 * @exports search
 * @author oyh(Reusjs)
 */
export default {
  name: 'search',
  components: {
    searchSong
  },
  data() {
    return {
      searchSongList: {musicData: []},
      searchSongsNum: 0,
      isLoading: true
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.searchSongList = {musicData: []}
      this.isLoading = true
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
          if (item.alias.length > 0) {
            obj.isAlias = true
            obj.alias = item.alias[0]
          } else {
            obj.isAlias = false
            obj.alias = ''
          }
          this.searchSongList.musicData.push(obj)
        })
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
      })
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
@import '../style/search';
</style>