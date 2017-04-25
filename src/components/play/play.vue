<template>
  <div class="play-container" :class="isShow ? 'show' : 'hide'">
    <div class="shadow" :style="{'background': `url(${imgUrl})`, 'background-size': 'cover'} ">
    </div>
    <div class="play-box">
      <div class="play-rotate">
        <v-rotate @getImgUrl="getImgUrl"></v-rotate>
      </div>
      <div class="btn-box">
        <button @click="isLike = !isLike"><i class="fa fa-fw" :class="isLike ? 'fa-heart' : 'fa-heart-o'"></i>喜欢</button>
        <button><i class="fa fa-folder-open-o fa-fw"></i>收藏</button>
        <button><i class="fa fa-cloud-download fa-fw"></i>下载</button>
        <button><i class="fa fa-share-square-o fa-fw"></i>分享</button>
      </div>
      <div class="detail">
        <div class="detail-head">
          <p class="song-name">{{songName}}</p>
          <p class="song-detail">
            <span>专辑：&nbsp;<span class="album-name">{{albumName}}</span></span>
            <span>歌手：&nbsp;<span class="singer">{{singer}}</span></span>
          </p>
        </div>
        <v-lyrics :sendLyric="sendLyric" :distance="30" :noLyric="noLyric"></v-lyrics>
      </div>
    </div>
  </div>
</template>

<script>
import vRotate from './rotate.vue'
import vLyrics from './lyrics.vue'
/**
 * A module that define play component
 * @exports vPlay
 * @author oyh(Reusjs)
 */
export default {
  name: 'vPlay',
  components: {
    vRotate,
    vLyrics
  },
  data() {
    return {
      imgUrl: '',
      isLike: false,
      albumName: '',
      sendLyric: '',
      noLyric: false
    }
  },
  /*mounted() {
    this.axios.get(`http://localhost:3000/music/songDetail?ids=${this.id}`)
      .then(res => {
        this.albumName = res.data.songs && res.data.songs[0].album.name
      })
  },*/
  computed: {
    isShow() {
      return this.$store.state.showPlay
    },
    id() {
      return this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex] && this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex].id
    },
    songName() {
      return this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex] && this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex].name
    },
    singer() {
      return this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex] && this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex].singer
    }
  },
  methods: {
    getImgUrl(value) {
      this.imgUrl = value
    }
  },
  watch: {
    id: {
      handler(newVal) {
        this.axios.get(`http://localhost:3000/music/songDetail?ids=${newVal}`)
        .then(res => {
          this.albumName = res.data.songs && res.data.songs[0].album.name
        })
        .then(() => {
          this.axios.get(`http://localhost:3000/lyric?id=${newVal}`)
          .then(res => {
            if (res.data.nolyric === true) {
              this.noLyric = true
              return
            }
            this.noLyric = false
            this.sendLyric = res.data.lrc.lyric
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/play';
</style>