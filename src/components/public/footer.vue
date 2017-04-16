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
        :width="950"
        @skip="skip"
        @move="move"></v-slider>
      <span class="time">{{tolTime}}</span>
      <span class="value" @click="volumeOff"><i class="fa fa-fw"
        :class="{'fa-volume-up': !isVolumeOff, 'fa-volume-off': isVolumeOff}"></i></span>
      <v-slider
        :value="volume"
        :totalVal="1"
        :width="100"
        :style="{'margin-left': '5px'}"
        @skip="skipVolume"></v-slider>
      <span class="play-state"
        @click="playStateIndex = playStateIndex === 3 ? 0 : ++playStateIndex"
      >
        <i class="fa fa-fw" :class="playState"></i>
      </span>
      <span class="list-num">
        <span class="list-icon"><i class="fa fa-file-text-o fa-fw"></i></span>
        {{listLength}}
      </span>
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
        curTime: '00:00',
        tolTime: '00:00',
        curTimeNum: 0,
        tolTimeNum: 0,
        volume: 1,
        timer: {},
        isVolumeOff: false,
        saveVolume: 1,
        playStateAll: ['loop', 'loopOne', 'random', 'order'],
        playStateIndex: 0,
        listLength: 0
      }
    },
    created() {
      this.axios.get('http://localhost:3000/music/url?id=26075648').then(response => {
        this.url = response.data.data[0].url
      })
    },
    mounted() {
      this.$refs.audio.addEventListener('play', () => {
        this.tolTimeNum = this.$refs.audio && this.$refs.audio.duration
        this.tolTime = this.$refs.audio && this.formatTime(this.$refs.audio.duration)

        this.timer = setInterval(() => {
          this.curTimeNum = this.$refs.audio && this.$refs.audio.currentTime
          this.curTime = this.$refs.audio && this.formatTime(this.$refs.audio.currentTime)
        }, 990)
      }, false)
    },
    computed: {
      playState() {
        let obj = {
          loop:    'fa-rotate-right',
          loopOne: 'fa-refresh',
          random:  'fa-random',
          order:   'fa-reorder'
        }
        let {[this.playStateAll[this.playStateIndex]]: bg} = obj
        return bg
      }
    },
    methods: {
      formatTime(time) {
        let second = time.toFixed() % 60
        let min = (time.toFixed() - second) / 60
        second = second > 9 ? second : `0${second}`
        min = min > 9 ? min : `0${min}`
        return `${min}:${second}`
      },
      skip(skipWidth) {
        if (skipWidth === 0) {
          this.$refs.audio.currentTime = 0
          this.curTimeNum = 0
          return
        } 
        this.$refs.audio.currentTime = skipWidth / 950 * this.tolTimeNum
        this.curTimeNum = this.$refs.audio.currentTime
      },
      skipVolume(skipWidth) {
        if (skipWidth === 0) {
          this.$refs.audio.volume = 0
          this.volume = 0
          this.saveVolume = 0
          return 
        }
        this.$refs.audio.volume = skipWidth / 100 * 1
        this.volume = this.$refs.audio.volume
        this.saveVolume = this.volume
      },
      volumeOff() {
        this.isVolumeOff = !this.isVolumeOff
        if (this.isVolumeOff) {
          this.$refs.audio.volume = 0
          this.volume = 0
        } else {
          this.$refs.audio.volume = this.saveVolume
          this.volume = this.$refs.audio.volume
        }
      },
      move(value) {
        if (value === 0) {
          this.$refs.audio.currentTime = 0
          this.curTimeNum = 0
          return
        } 
        this.$refs.audio.currentTime = value / 950 * this.tolTimeNum
        this.curTimeNum = this.$refs.audio.currentTime
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../style/footer';
</style>