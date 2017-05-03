<template>
  <div class="search-container">
    <transition name="fade">
      <div v-if="!isLoading">
        <div class="search-count">
          <p v-if="searchType === 1">搜索<span class="keywords">"{{$route.params.keywords}}"</span>, 找到
          <span class="search-num">{{searchSongsNum}}</span>首单曲</p>
          <p v-if="searchType === 100">搜索<span class="keywords">"{{$route.params.keywords}}"</span>, 找到
          <span class="search-num">{{searchSingerNum}}</span>位歌手</p>
          <p v-if="searchType === 10">搜索<span class="keywords">"{{$route.params.keywords}}"</span>, 找到
          <span class="search-num">{{searchAlbumNum}}</span>张专辑</p>
          <p v-if="searchType === 1000">搜索<span class="keywords">"{{$route.params.keywords}}"</span>, 找到
          <span class="search-num">{{searchPlayListNum}}</span>个歌单</p>
        </div>
        <div class="nav">
          <span :class="searchType === 1 ? 'active' : ''" @click="searchType = 1">歌曲</span>
          <span :class="searchType === 100 ? 'active' : ''" @click="searchType = 100">歌手</span>
          <span :class="searchType === 10 ? 'active' : ''" @click="searchType = 10">专辑</span>
          <span :class="searchType === 1000 ? 'active' : ''" @click="searchType = 1000">歌单</span>
        </div>
        <search-song :songList="searchSongList" :songTotal="searchSongsNum" @updateOffset="updateOffset" :nowPageIndex="nowPageIndex" v-if="searchType === 1"></search-song>
        <search-singer v-if="searchType === 100" :singerList="searchSingerList" :singerTotal="searchSingerNum" :nowPageIndex="nowSingerPageIndex" @updateSingerOffset="updateSingerOffset"></search-singer>
        <search-album v-if="searchType === 10" :albumList="searchAlbumList" :albumTotal="searchAlbumNum" :nowPageIndex="nowAlbumPageIndex" @updateAlbumOffset="updateAlbumOffset"></search-album>
        <search-song-list v-if="searchType === 1000" :playList="searchPlayList" :playListTotal="searchPlayListNum" :nowPageIndex="nowPlayListPageIndex" @updatePlayListOffset="updatePlayListOffset"></search-song-list>
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
import searchAlbum from './searchType/searchAlbum.vue'
import searchSongList from './searchType/searchSongList.vue'
/**
 * A module that define search component
 * @exports search
 * @author oyh(Reusjs)
 */
export default {
  name: 'search',
  components: {
    searchSong,
    searchSinger,
    searchAlbum,
    searchSongList
  },
  data() {
    return {
      searchSongList: {musicData: []},
      searchSongsNum: 0,
      isLoading: true,
      nowPageIndex: 1,
      searchType: 1,
      searchSingerList: [],
      searchSingerNum: 0,
      nowSingerPageIndex: 1,
      searchAlbumList: [],
      searchAlbumNum: 0,
      nowAlbumPageIndex: 1,
      searchPlayList: [],
      searchPlayListNum: 0,
      nowPlayListPageIndex: 1
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
      this.searchType = 100
      this.axios.get(`http://localhost:3000/search?keywords=${this.$route.params.keywords}&type=${this.searchType}`)
      .then(res => {
        this.searchSingerNum = res.data.result && res.data.result.artistCount
        res.data.result.artists.forEach(item => {
          let obj = {
            imgUrl: item.picUrl,
            singerName: item.name,
            id: item.id
          }
          if (item.alias.length > 0) {
            obj.isAlias = true
            obj.alias = item.alias[0]
          } else {
            obj.isAlias = false
            obj.alias = ''
          }
          this.searchSingerList.push(obj)
        })
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
      })
    },
    fetchAlbumData() {
      this.searchAlbumList = []
      this.isLoading = true
      this.searchType = 10
      this.axios.get(`http://localhost:3000/search?keywords=${this.$route.params.keywords}&type=${this.searchType}`)
      .then(res => {
        this.searchAlbumNum = res.data.result && res.data.result.albumCount
        res.data.result.albums.forEach(item => {
          let obj = {
            imgUrl: item.picUrl,
            albumName: item.name,
            albumId: item.id,
            singer: item.artist.name,
            singerId: item.artist.id
          }
          if (item.alias.length > 0) {
            obj.isAlias = true
            obj.alias = item.alias[0]
          } else {
            obj.isAlias = false
            obj.alias = ''
          }
          if (item.artist.alias.length > 0) {
            obj.isSingerAlias = true
            obj.singerAlias = item.artist.alias[0]
          } else {
            obj.isSingerAlias = false
            obj.singerAlias = ''
          }
          this.searchAlbumList.push(obj)
        })
        setTimeout(() => {
          this.isLoading = false
        }, 2000)
      })
    },
    fetchPlayList() {
      this.searchPlayList = []
      this.searchType = 1000
      this.isLoading = true
      this.axios.get(`http://localhost:3000/search?keywords=${this.$route.params.keywords}&type=${this.searchType}`)
      .then(res => {
        this.searchPlayListNum = res.data.result && res.data.result.playlistCount
        res.data.result.playlists.forEach(item => {
          let obj = {
            id: item.id,
            name: item.name,
            imgUrl: item.coverImgUrl,
            creator: item.creator.nickname,
            trackCount: item.trackCount
          }
          this.searchPlayList.push(obj)
        })
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
    },
    updateSingerOffset(index) {
      if (index < 1 || index > ~~(Math.ceil(this.searchSingerNum / 30))) return
      this.nowSingerPageIndex = index
      this.searchSingerList = []
      this.axios.get(`http://localhost:3000/search?keywords=${this.$route.params.keywords}&type=100&offset=${(index - 1) * 30}`)
      .then(res => {
        res.data.result.artists.forEach(item => {
          let obj = {
            imgUrl: item.picUrl,
            singerName: item.name,
            id: item.id
          }
          if (item.alias.length > 0) {
            obj.isAlias = true
            obj.alias = item.alias[0]
          } else {
            obj.isAlias = false
            obj.alias = ''
          }
          this.searchSingerList.push(obj)
        })
      })
    },
    updateAlbumOffset(index) {
      if (index < 1 || index > ~~(Math.ceil(this.searchAlbumNum / 30))) return
      this.nowAlbumPageIndex = index
      this.searchAlbumList = []
      this.axios.get(`http://localhost:3000/search?keywords=${this.$route.params.keywords}&type=10&offset=${(index - 1) * 30}`)
      .then(res => {
        res.data.result.albums.forEach(item => {
          let obj = {
            imgUrl: item.picUrl,
            albumName: item.name,
            albumId: item.id,
            singer: item.artist.name,
            singerId: item.artist.id
          }
          if (item.alias.length > 0) {
            obj.isAlias = true
            obj.alias = item.alias[0]
          } else {
            obj.isAlias = false
            obj.alias = ''
          }
          if (item.artist.alias.length > 0) {
            obj.isSingerAlias = true
            obj.singerAlias = item.artist.alias[0]
          } else {
            obj.isSingerAlias = false
            obj.singerAlias = ''
          }
          this.searchAlbumList.push(obj)
        })
      })
    },
    updatePlayListOffset(index) {
      if (index < 1 || index > ~~(Math.ceil(this.searchPlayListNum/ 30))) return
      this.nowPlayListPageIndex = index
      this.searchPlayList = []
      this.axios.get(`http://localhost/search?keywords=${this.$route.params.keywords}&type=1000&offset=${(index - 1) * 30}`)
      .then(res => {
        res.data.result.playlists.forEach(item => {
          let obj = {
            id: item.id,
            name: item.name,
            imgUrl: item.coverImgUrl,
            creator: item.creator.nickname,
            trackCount: item.trackCount
          }
          this.searchPlayList.push(obj)
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
        if (newVal === 100) {
          this.fetchSingerData()
          return
        }
        if (newVal === 10) {
          this.fetchAlbumData()
          return
        }
        if (newVal === 1000) {
          this.fetchPlayList()
          return
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../style/search';
</style>