<template>
  <div class="music-footer">
    <audio autoplay controls
      :src="url"
      v-show="false"
      ref="audio"></audio>
      <div class="footer-left">
        <span class="back">
          <i class="fa fa-step-backward"></i>
        </span>
        <span class="play-pause">
          <i class="fa fa-play"></i>
        </span>
        <span class="next">
          <i class="fa fa-step-forward"></i>
        </span>
      </div>
      <span class="time">{{curTime}}</span>
      <v-slider
        :value="curTimeNum"
        :totalVal="tolTimeNum"
        :width="1000"></v-slider>
      <span class="time">{{tolTime}}</span>
  </div>
</template>

<script>
import vSlider from '../slider.vue'
  /**
   * A module define public footer component
   * @exports vFooter
   * @author oyh(Reusjs)
   */
  export default {
    name: 'vFooter',
    components: {
      vSlider
    },
    data() {
      return {
        url: '',
        id: 347230,
        curTime: '0:00',
        tolTime: '0:00',
        curTimeNum: 0,
        tolTimeNum: 0,
        timer: {}
      }
    },
    created() {
      this.axios.get('http://localhost:3000/music/url?id=437250607').then(response => {
        this.url = response.data.data[0].url
      })
    },
    mounted() {
      this.$refs.audio.addEventListener('play', () => {
        this.tolTimeNum = this.$refs.audio && this.$refs.audio.duration
        this.tolTime = this.$refs.audio && this.formatTime(this.$refs.audio.duration)
      }, false)
      this.timer = setInterval(() => {
        this.curTimeNum = this.$refs.audio && this.$refs.audio.currentTime
        this.curTime = this.$refs.audio && this.formatTime(this.$refs.audio.currentTime)
      }, 990)
    },
    methods: {
      formatTime(time) {
        let second = time.toFixed() % 60
        let min = (time.toFixed() - second) / 60
        second = second > 9 ? second : `0${second}`
        min = min > 9 ? min : `0${min}`
        return `${min}:${second}`
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../style/footer';
</style>