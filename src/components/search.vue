<template>
  <div class="search-container">
    <transition name="fade">
      <div v-if="!isLoading">
        <div class="search-count">
        <p>搜索<span class="keywords">"{{$route.params.keywords}}"</span>, 找到
          <span class="search-num">{{searchSongsNum}}</span>首单曲</p>
        </div>
        <div class="nav">
          <span :class="searchType === 1 ? 'active' : ''" @click="searchType = 1">歌曲</span>
          <span :class="searchType === 10 ? 'active' : ''" @click="searchType = 10">歌手</span>
          <span :class="searchType === 100 ? 'active' : ''" @click="searchType = 100">专辑</span>
          <span :class="searchType === 1000 ? 'active' : ''" @click="searchType = 1000">歌单</span>
        </div>
        <search-song :songList="searchSongList" :songTotal="searchSongsNum" @updateOffset="updateOffset" :nowPageIndex="nowPageIndex" v-if="searchType === 1"></search-song>
        <search-singer v-if="searchType === 10" :singerList="searchSingerList"></search-singer>
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
import searchSinger from './searchType/searchSinger.vue'
/**
 * A module that define search component
 * @exports search
 * @author oyh(Reusjs)
 */
export default {
  name: 'search',
  components: {
    searchSong,
    searchSinger
  },
  data() {
    return {
      searchSongList: {musicData: []},
      searchSongsNum: 0,
      isLoading: true,
      nowPageIndex: 1,
      searchType: 1,
      searchSingerList: []
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.searchSongList = {musicData: []}
      this.isLoading = true
      this.searchType = 1
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
    },
    fetchSingerData() {
      this.searchSingerList = []
      this.isLoading = true
      this.axios.get(`http://localhost:3000/search?keywords=${this.$route.params.keywords}&type=${this.searchType}`)
      .then(res => {
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
      })
    },
    updateOffset(index) {
      if (index < 1 || index > ~~(Math.ceil(this.searchSongsNum / 30))) return
      this.nowPageIndex = index
      this.searchSongList = {musicData: []}
      this.axios.get(`http://localhost:3000/search?keywords=${this.$route.params.keywords}&offset=${(index - 1) * 30}`)
      .then(res => {
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
      })
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        this.fetchData()
      }
    },
    searchType: {
      handler(newVal) {
        if (newVal === 1) {
          this.fetchData()
          return
        }
        if (newVal === 10) {
          this.fetchSingerData()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/search';
</style>