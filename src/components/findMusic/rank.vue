<template>
<div class="rank-container" :id="theme">
  <ul class="rank-nav">
    <li @click="$router.push({name: 'findMusic'})">个性推荐</li>
    <li @click="$router.push({name: 'playList'})">歌单</li>
    <li class="active">排行榜</li>
    <li @click="$router.push({name: 'hotSinger'})">歌手</li>
    <li @click="$router.push({name: 'newSong'})">最新音乐</li>
  </ul>
  <div class="content" v-if="!isLoading">
    <p class="title">官方榜</p>
    <ul class="rank">
      <li v-for="item in netEaseRank">
        <div class="item-head" @click="$router.push({name: 'songList', params: {id: item.id}})">
          <img :src="item.imgUrl">
          <span class="update-time">{{formatTime(item.updateTime)}}</span>
        </div>
        <ul>
          <li v-for="(item, index) in item.songList" @dblclick="$store.commit('modifyMusicList', item)">
            <span class="index" :class="index + 1 < 4 ? 'top' : ''">{{index + 1}}</span>
            <span class="signal">-</span>
            <span class="song-name">{{item.name}}<span class="alias" v-if="item.isAlias">({{item.alias}})</span></span>
            <span class="singer"  @click="$router.push({name: 'singer', params: {id: item.singerId}})">{{item.singer}}</span>
          </li>
          <li id="all"><span @click="$router.push({name: 'songList', params: {id: item.id}})">查看全部<i class="fa fa-angle-right"></i></span></li>
        </ul>
      </li>
    </ul>
    <p class="title">全球榜</p>
    <ul class="other-rank">
      <li v-for="item in rank">
        <img :src="item.imgUrl" @click="$router.push({name: 'songList', params:{id: item.id}})">
        <div class="listen-num">
          <i class="fa fa-headphones"></i><span>{{formatCount(item.playCount)}}</span>
        </div>
        <p class="other-rank-name"><span @click="$router.push({name: 'songList', params: {id: item.id}})">{{item.name}}</span></p>
      </li>
    </ul>
  </div>
  <transition name="fade">
    <div class="loading" v-if="isLoading">
      <i class="fa fa-spinner fa-pulse"></i>
      <p>载入中...</p>
    </div>
  </transition>
</div>
</template>

<script>
/**
 * A module that define rank component
 * @exports rank
 * @author oyh(Reusjs)
 */
export default {
  name: 'rank',
  data() {
    return {
      netEaseRank: [],
      isLoading: true,
      rank:[]
    }
  },
  mounted() {
    this.netEaseRank = []
    this.isLoading = true
    this.rank = []
    this.axios.get(`http://localhost:3000/top/list?idx=3`)
    .then(res => {
      this.fetchData(res)
    })
    .then(() => {
      this.axios.get(`http://localhost:3000/top/list?idx=0`)
      .then(res => {
        this.fetchData(res)
      })
    })
    .then(() => {
      this.axios.get(`http://localhost:3000/top/list?idx=2`)
      .then(res => {
        this.fetchData(res)
      })
    })
    .then(() => {
      this.axios.get(`http://localhost:3000/top/list?idx=1`)
      .then(res => {
        this.fetchData(res)
      })
      setTimeout(() => {
        this.isLoading = false
      }, 6000)
    })
    .then(() => {
      for (let i = 4; i < 22; i++) {
        this.axios.get(`http://localhost:3000/top/list?idx=${i}`)
        .then(res => {
          this.fetchOther(res)
        })
      }
    })
  },
  computed: {
    theme() {
      return this.$store.state.theme
    }
  },
  methods: {
    fetchData(res) {
      let obj = {
        id: res.data.result.id,
        imgUrl: res.data.result.coverImgUrl,
        updateTime: res.data.result.updateTime,
        songList: []
      }
      res.data.result.tracks.slice(0, 8).forEach(item => {
        let track = {
          id: item.id,
          name: item.name,
          singer: item.artists[0].name,
          singerId: item.artists[0].id,
          duration: item.duration
        }
        if (item.alias.length > 0) {
          track.isAlias = true
          track.alias = item.alias[0]
        } else {
          track.isAlias = false
          track.alias = ''
        }
        obj.songList.push(track)
      })
      this.netEaseRank.push(obj)
    },
    fetchOther(res) {
      let obj = {
        imgUrl: res.data.result.coverImgUrl,
        name: res.data.result.name,
        playCount: res.data.result.playCount,
        id: res.data.result.id
      }
      this.rank.push(obj)
    },
    formatTime(time) {
      let date = new Date(time)
      let month = date.getMonth() + 1
      let day = date.getDate()
      month = month > 9 ? month : `0${month}`
      day = day > 9 ? day : `0${day}`
      return `${month}月${day}日更新`
    },
    formatCount(count) {
      return count < 100000 ? count : `${Math.floor(count / 10000)}万`
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/rank";
</style>