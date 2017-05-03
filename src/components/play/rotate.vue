<template>
  <div class="rotate-container">
    <img class="needle" src="http://on99ebnkk.bkt.clouddn.com/play_needle.png" :class="isPlaying ? 'playing' : 'pause'">
    <div class="disk-bg">
      <div class="disk" :class="isPlaying ? 'playing' : 'pause'">
        <div>
          <img :src="imgUrl" class="song-img">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 *  A moudle that define rotate component
 *  @exports vRotate
 *  @author oyh(Reusjs)
 */
export default {
  name: 'vRotate',
  data() {
    return {
      imgUrl: ''
    }
  },
  mounted() {
    this.axios.get(`http://localhost:3000/song/detail?ids=${this.id}`)
      .then(res => {
        this.imgUrl = res.data.songs[0] && res.data.songs[0].al.picUrl
      })
    this.$emit('getImgUrl', this.imgUrl)
  },
  computed: {
    id() {
      return this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex] && this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex].id
    },
    isPlaying() {
      return this.$store.state.isPlaying
    }
  },
  watch: {
    id: {
      handler(newVal) {
        if (!newVal) return
        this.axios.get(`http://localhost:3000/song/detail?ids=${this.id}`)
        .then(res => {
          this.imgUrl = res.data.songs[0].al.picUrl
          this.$emit('getImgUrl', this.imgUrl)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/rotate';
</style>