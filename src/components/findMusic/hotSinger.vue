<template>
  <div class="hot-singer-container" :id="theme">
  <ul class="hot-singer-nav">
    <li @click="$router.push({name: 'findMusic'})">个性推荐</li>
    <li @click="$router.push({name: 'playList'})">歌单</li>
    <li @click="$router.push({name: 'rank'})">排行榜</li>
    <li class="active">歌手</li>
    <li @click="$router.push({name: 'newSong'})">最新音乐</li>
  </ul>
    <ul class="singers">
      <li v-for="item in hotSingerList">
        <img :src="item.imgUrl" @click="$router.push({name: 'singer', params:{id: item.id}})">
        <p><span class="name" @click="$router.push({name: 'singer', params:{id: item.id}})">{{item.name}}</span></p>
      </li>
    </ul>
  </div>
</template>

<script>
/**
 * A module that define hotSinger component
 * @exports hotSinger
 * @author oyh(Reusjs)
 */
export default {
  name: 'hotSinger',
  data() {
    return {
      hotSingerList: []
    }
  },
  mounted() {
    this.hotSingerList = []
    this.axios.get(`http://localhost:3000/top/artists?limit=100`)
    .then(res => {
      res.data.artists.forEach(item => {
        let obj = {
          imgUrl: item.picUrl,
          id: item.id,
          name: item.name
        }
        this.hotSingerList.push(obj)
      })
    })
  },
  computed: {
    theme() {
      return this.$store.state.theme
    }
  }
}
</script>

<style lang='scss' scoped>
@import "../../style/hotSinger.scss";
</style>