<template>
  <div class="playlist-container" :id="theme">
    <ul class="playlist-nav">
      <li @click="$router.push({name: 'findMusic'})">个性推荐</li>
      <li class="active">歌单</li>
      <li @click="$router.push({name: 'rank'})"> 排行榜</li>
      <li @click="$router.push({name: 'hotSinger'})">歌手</li>
      <li @click="$router.push({name: 'newSong'})">最新音乐</li>
    </ul>
    <ul class="playlists">
      <template v-for="item in playlists">
        <li class="playlist">
          <div class="listen-num">
              <i class="fa fa-headphones"></i><span>{{formatCount(item.playCount)}}</span>
          </div>
          <div class="detail">
            <img :src="item.imgUrl" class="item-img" @click="$router.push({name: 'songList', params:{id: item.id}})">
            <span class="creator"><i class="fa fa-user-o fa-fw"></i>{{item.creator}}</span>
          </div>
          <div class="dec">
            <span @click="$router.push({name: 'songList', params:{id: item.id}})">{{item.name}}</span>
          </div>
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
/**
 * A module that define playlist component
 * @exports playList
 * @author oyh(Reusjs)
 */
export default {
  name: 'playList',
  data() {
    return {
      playlists: []
    }
  },
  mounted() {
    this.playlists = []
    this.axios.get(`http://localhost:3000/top/playlist`)
    .then(res => {
      res.data.playlists.forEach(item => {
        let obj = {
          name: item.name,
          id: item.id,
          imgUrl: item.coverImgUrl,
          playCount: item.playCount,
          creator: item.creator.nickname
        }
        this.playlists.push(obj)
      })
    })
  },
  methods: {
    formatCount(count) {
      return count < 100000 ? count : `${Math.floor(count / 10000)}万`
    }
  },
  computed: {
    theme() {
      return this.$store.state.theme
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/playList";
</style>