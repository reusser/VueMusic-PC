<template>
  <div class="sidebar" :id="theme">
    <div class="sidebar-list">
      <div class="sidebar-head">推荐</div>
      <ul>
        <li><i class="fa fa-music fa-fw"></i>发现音乐</li>
        <li><i class="fa fa-podcast fa-fw"></i>私人FM</li>
        <li><i class="fa fa-youtube-play fa-fw"></i>MV</li>
        <li><i class="fa fa-user-o fa-fw"></i>朋友</li>
      </ul>
      <div class="sidebar-head">我的音乐</div>
        <ul>
          <li><i class="fa fa-music fa-fw"></i>本地音乐</li>
          <li><i class="fa fa-download fa-fw"></i>下载管理</li>
          <li><i class="fa fa-mixcloud fa-fw"></i>我的音乐云盘</li>
          <li><i class="fa fa-user-md fa-fw"></i>我的歌手</li>
          <li><i class="fa fa-ravelry fa-fw"></i>我的电台</li>
        </ul>
      <div class="sidebar-head" 
        @click="isToggleCreateList = !isToggleCreateList"
      >创建的歌单<i class="fa"
                  :class="isToggleCreateList ? 'fa-angle-right' : 'fa-angle-down'"></i></div>
      <ul v-if="!isToggleCreateList">
        <li @click="$router.push({name: 'songList', params:{id: '169815571'}})"><i class="fa fa-heart-o fa-fw"></i>我喜欢的音乐</li>
        <li @click="$router.push({name: 'songList', params:{id: '471972418'}})"><i class="fa fa-file-audio-o fa-fw"></i>敲代码时听的歌</li>
        <li @click="$router.push({name: 'songList', params:{id: '404264863'}})"><i class="fa fa-file-audio-o fa-fw"></i>1</li>
      </ul>
      <div class="sidebar-head"
        @click="isToggleCollectList = !isToggleCollectList"
      >收藏的歌单<i class="fa"
                  :class="isToggleCollectList ? 'fa-angle-right' : 'fa-angle-down'"></i></div>
      <ul v-if="!isToggleCollectList">
        <li @click="$router.push({name: 'songList', params:{id: '327106241'}})"><i class="fa fa-file-audio-o fa-fw"></i>周傲娇哼喜欢的音乐</li>
        <li @click="$router.push({name: 'songList', params:{id: '699672611'}})"><i class="fa fa-file-audio-o fa-fw"></i>前端金曲</li>
        <li @click="$router.push({name: 'songList', params:{id: '545031614'}})"><i class="fa fa-file-audio-o fa-fw"></i>年度盘点 | 2016年华语优质影视歌曲</li>
        <li @click="$router.push({name: 'songList', params:{id: '311206484'}})"><i class="fa fa-file-audio-o fa-fw"></i>时光怎么让爱笑的人哭了</li>
        <li @click="$router.push({name: 'songList', params:{id: '368529707'}})"><i class="fa fa-file-audio-o fa-fw"></i>前奏直接秒杀的纯音乐</li>
      </ul>
    </div> 
    <div class="preview" v-if="showMiniAudio">
      <img :src="imgUrl" class="musicImg">
      <div class="shadow" @click="$store.commit('setShowPlay', true)">
        <i class="fa fa-expand"></i>
      </div>
      <div class="info">
        <div>
          <span class="song-name">{{songName}}</span><i class="fa" 
            :class="isLike ? 'fa-heart' : 'fa-heart-o'"
            @click="isLike = !isLike"></i>
        </div>
        <div>
          <span class="singer">{{singer}}</span><i class="fa fa-share-square-o"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * A module that define sidebar component
 * @exports v-sidebar
 * @author oyh(Reusjs)
 */
export default {
  name: 'vSidebar',
  data() {
    return {
      isToggleCreateList: false,
      isToggleCollectList: false,
      imgUrl: '',
      isLike: false
    }
  },
  mounted() {
    this.axios.get(`http://localhost:3000/search?keywords=${this.songName}`)
    .then(res => {
      this.imgUrl = res.data.result && res.data.result.songs[0].album.blurPicUrl
    })
  },
  computed: {
    songName() {
      return this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex] ? this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex].name : ''
    },
    singer() {
      return this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex] ? this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex].singer : ''
    },
    showMiniAudio() {
      return this.$store.state.showMiniAudio
    },
    theme() {
      return this.$store.state.theme
    }
  },
  watch: {
    songName: {
      handler(newVal) {
        if (!newVal) return
        this.axios.get(`http://localhost:3000/search?keywords=${newVal}`)
        .then(res => {
          this.imgUrl = res.data.result.songs[0].album.blurPicUrl
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/sidebar';
</style>