<template>
  <div class="sidebar">
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
        <li><i class="fa fa-heart-o fa-fw"></i>我喜欢的音乐</li>
        <li><i class="fa fa-file-audio-o fa-fw"></i>敲代码时听的歌</li>
        <li><i class="fa fa-file-audio-o fa-fw"></i>1</li>
      </ul>
      <div class="sidebar-head"
        @click="isToggleCollectList = !isToggleCollectList"
      >收藏的歌单<i class="fa"
                  :class="isToggleCollectList ? 'fa-angle-right' : 'fa-angle-down'"></i></div>
      <ul v-if="!isToggleCollectList">
        <li><i class="fa fa-file-audio-o fa-fw"></i>周傲娇哼喜欢的音乐</li>
        <li><i class="fa fa-file-audio-o fa-fw"></i>2016年五月最新热歌TOP50</li>
        <li><i class="fa fa-file-audio-o fa-fw"></i>2016年五月最新热歌TOP50</li>
        <li><i class="fa fa-file-audio-o fa-fw"></i>2016年五月最新热歌TOP50</li>
        <li><i class="fa fa-file-audio-o fa-fw"></i>2016年五月最新热歌TOP50</li>
      </ul>
    </div> 
    <div class="preview">
      <img :src="imgUrl">
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
      imgUrl: ''
    }
  },
  mounted() {
    this.axios.get(`http://localhost:3000/search?keywords=${this.songName}`)
    .then(res => {
      console.log(res.data)
      this.imgUrl = res.data.result.songs[0].artists[0].img1v1Url
    })
  },
  computed: {
    songName() {
      return this.$store.state.musicList ? this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex].name : ''
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/sidebar'
</style>