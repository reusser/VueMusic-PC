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
    <div class="comment-container">
      <transition name="fade">
        <template v-if="!isLoading">
          <div>
            <p class="comment-head">
              听友评论<span class="comment-num">(已有{{commentTotal}}条评论)</span>
            </p>
            <div class="hot-comment">
              <p class="hot-comment-head">精彩评论</p>
              <div class="comment-box" v-for="item in hotCommentList">
                <div class="avatar">
                  <img :src="item.avatarUrl">
                </div>
                <div class="content">
                  <p><span class="user-name">{{item.userName}}:</span>{{item.content}}</p>
                  <div class="content-footer">
                    <div><span class="time">{{item.time}}</span></div>
                    <div>
                      <span class="like-it"><i class="fa fa-thumbs-o-up fa-fw"></i>({{item.likedCount}})</span>
                      <span>分享</span>
                      <span>回复</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </transition>
      <transition name="fade">
        <div class="loading" v-if="isLoading">
          <i class="fa fa-spinner fa-pulse"></i>
          <p>加载评论中</p>
        </div>
      </transition>
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
      noLyric: false,
      isLoading: true,
      commentList: [],
      hotCommentList: [],
      commentTotal: 0
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
    },
    formatTime(ms) {
      let date = new Date(ms)
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日  ${date.getHours()}:${date.getMinutes()}`
    }
  },
  watch: {
    id: {
      handler(newVal) {
        this.isLoading = true
        this.commentList = []
        this.hotCommentList = []
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
        .then(() => {
          setTimeout(()=> {
            this.axios.get(`http://localhost:3000/comment?id=${newVal}`)
            .then(res => {
              this.commentTotal = res.data.total
              res.data.hotComments.slice(0, 10).forEach(item => {
                let obj = {
                  userName: item.user && item.user.nickname,
                  likedCount: item.likedCount,
                  time: this.formatTime(item.time),
                  avatarUrl: item.user.avatarUrl,
                  content: item.content
                }
                if (item.beReplied.length > 0) {
                  obj.beReplied = true
                  obj.beRepliedUser = item.beReplied.user && item.beReplied.user.nickname
                  obj.beRepliedContent = item.beReplied.content
                } else {
                  obj.beReplied = false
                }
                this.hotCommentList.push(obj)
              })
              res.data.comments.forEach(item => {
                let obj = {
                  userName: item.user && item.user.nickname,
                  likedCount: item.likedCount,
                  time: this.formatTime(item.time),
                  avatarUrl: item.user.avatarUrl,
                  content: item.content
                }
                if (item.beReplied.length > 0) {
                  obj.beReplied = true
                  obj.beRepliedUser = item.beReplied.user && item.beReplied.user.nickname
                  obj.beRepliedContent = item.beReplied.content
                } else {
                  obj.beReplied = false
                }
                this.commentList.push(obj)
              })
            })
            setTimeout(() => this.isLoading = false, 1000)
          }, 2000)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/play';
</style>