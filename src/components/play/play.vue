<template>
  <div class="play-container" :class="isShow ? 'show' : 'hide'" :id="theme">
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
          <p class="song-name">{{songName}}<span @click="$store.commit('setShowPlay', false)"><i class="fa fa-compress"></i></span></p>
          <p class="song-detail">
            <span>专辑：&nbsp;<span class="album-name" @click="$router.push({name: 'album', params: {id: albumId}}); $store.commit('setShowPlay', false)">{{albumName}}</span></span>
            <span>歌手：&nbsp;<span class="singer" @click="$router.push({name: 'singer', params: {id: singerId}}); $store.commit('setShowPlay', false)">{{singer}}</span></span>
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
            <div class="hot-comment" v-if="nowPageIndex === 1">
              <p class="hot-comment-head">精彩评论</p>
              <div class="comment-box" v-for="item in hotCommentList">
                <div class="avatar">
                  <img :src="item.avatarUrl">
                </div>
                <div class="content">
                  <p><span class="user-name">{{item.userName}}:</span>&nbsp;&nbsp;{{item.content}}</p>
                  <div class="replied" v-if="item.beReplied">
                    <p><span class="user-name">@{{item.beRepliedUser}}</span>&nbsp;&nbsp;{{item.beRepliedContent}}</p>
                  </div>
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
            <div class="new-comment">
              <p class="new-comment-head">最新评论</p>
              <div class="comment-box" v-for="item in commentList">
                <div class="avatar">
                  <img :src="item.avatarUrl">
                </div>
                <div class="content">
                  <p><span class="user-name">{{item.userName}}:</span>&nbsp;&nbsp;{{item.content}}</p>
                  <div class="replied" v-if="item.beReplied">
                    <p><span class="user-name">@{{item.beRepliedUser}}</span>&nbsp;&nbsp;{{item.beRepliedContent}}</p>
                  </div>
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
            <div class="page">
              <ul>
                <li class="pre-btn" @click="updateComment(~~ (nowPageIndex - 1))"><i class="fa fa-angle-left"></i></li>
                <li :class="nowPageIndex === 1 ? 'active' : ''" @click="updateComment(1)" v-if="Math.ceil(commentTotal / 20) > 1">1</li>
                <li class="apostrophe" v-show="nowPageIndex >= 6">...</li>
                <li v-for="(item, index) in pageList" @click="updateComment(~~ item)" :class="~~ item === nowPageIndex ? 'active' : ''">{{item}}</li>
                <li class="apostrophe" v-show="nowPageIndex <= Math.ceil(commentTotal / 20) - 5">...</li>
                <li :class="nowPageIndex === Math.ceil(commentTotal / 20) ? 'active' : ''" @click="updateComment(Math.ceil(commentTotal / 20))">{{Math.ceil(commentTotal / 20)}}</li>
                <li class="next-btn" @click="updateComment(~~ (nowPageIndex + 1))"><i class="fa fa-angle-right"></i></li>
              </ul>
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
      albumId: '',
      sendLyric: '',
      noLyric: false,
      isLoading: true,
      commentList: [],
      hotCommentList: [],
      commentTotal: 0,
      nowPageIndex: 1
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
    },
    singerId() {
      return this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex] && this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex].singerId
    },
    pageList() {
      let arr = []
      let total = Math.ceil(this.commentTotal / 20)
      if (total < 3) return []
      if (total < 9) {
        let arr = [...Array(total).keys()]
        arr.shift()
        arr.shift()
        return arr
      }
      if (this.nowPageIndex < 6) return [2, 3, 4, 5, 6, 7, 8]
      if (this.nowPageIndex > total - 5) return [total - 7, total - 6, total - 5, total - 4, total - 3, total - 2, total - 1]
      return [this.nowPageIndex - 3, this.nowPageIndex - 2, this.nowPageIndex - 1, this.nowPageIndex, this.nowPageIndex + 1, this.nowPageIndex + 2, this.nowPageIndex + 3]
    },
    theme() {
      return this.$store.state.theme
    }
  },
  methods: {
    getImgUrl(value) {
      this.imgUrl = value
    },
    formatTime(ms) {
      let date = new Date(ms)
      let hours = date.getHours()
      hours = hours > 9 ? hours : `0${hours}`
      let minutes = date.getMinutes()
      minutes = minutes > 9 ? minutes : `0${minutes}`
      return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日  ${hours}:${minutes}`
    },
    updateComment(index) {
      if (index < 1 || index > ~~(Math.ceil(this.commentTotal / 20))) return
      this.nowPageIndex = index
      this.commentList = []
      this.axios.get(`http://localhost:3000/comment/music?id=${this.id}&offset=${(this.nowPageIndex - 1) * 20}`)
      .then(res => {
        this.commentTotal = res.data.total
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
            obj.beRepliedUser = item.beReplied[0].user && item.beReplied[0].user.nickname
            obj.beRepliedContent = item.beReplied[0].content
          } else {
              obj.beReplied = false
            }
          this.commentList.push(obj)
        })
      })
    }
  },
  watch: {
    id: {
      handler(newVal) {
        if (!newVal) return
        this.isLoading = true
        this.commentList = []
        this.hotCommentList = []
        this.nowPageIndex = 1
        this.axios.get(`http://localhost:3000/song/detail?ids=${newVal}`)
        .then(res => {
          this.albumName = res.data.songs && res.data.songs[0].al.name
          this.albumId = res.data.songs && res.data.songs[0].al.id
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
            this.axios.get(`http://localhost:3000/comment/music?id=${newVal}`)
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
                  obj.beRepliedUser = item.beReplied[0].user && item.beReplied[0].user.nickname
                  obj.beRepliedContent = item.beReplied[0].content
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
                  obj.beRepliedUser = item.beReplied[0].user && item.beReplied[0].user.nickname
                  obj.beRepliedContent = item.beReplied[0].content
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