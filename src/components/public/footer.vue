<template>
  <div class="music-footer" ref="footer">
    <audio autoplay controls
      :src="url"
      v-show="false"
      ref="audio"
      @ended="next(false)"></audio>
      <div class="footer-left">
        <span class="back" @click="prev">
          <i class="fa fa-step-backward"></i>
        </span>
        <span class="play-pause" @click="playOrPause">
          <i class="fa" :class="isPlaying ? 'fa-pause' : 'fa-play'"></i>
        </span>
        <span class="next" @click="next(true)">
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
        @skip="skipVolume"
        @move="moveVolume"></v-slider>
      <span class="play-state"
        @click="playStateIndex = playStateIndex === 3 ? 0 : ++playStateIndex"
      >
        <i class="fa fa-fw" :class="playState"></i>
      </span>
      <span class="list-num" @click="showDialog = !showDialog">
        <span class="list-icon"><i class="fa fa-file-text-o fa-fw"></i></span>
        {{musicList && musicList.length}}
      </span>
      <div class="list-dialog" v-if="showDialog">
        <div class="list-head">
          <span>播放列表</span>
          <span @click="showDialog = false"><i class="fa fa-close"></i></span>
        </div>
        <div class="info">
          <span>总{{musicList && musicList.length}}首</span>
          <span 
            @click="$store.commit('clear');
                    url = '';
                    $store.commit('pause');
                ">
            <i class="fa fa-trash-o"></i>清空
          </span>
        </div>
        <ul v-if="musicList && musicList.length !== 0">
          <li v-for="(item, index) in musicList" @dblclick="changeMusic(index)">
            <span class="name">{{item.name}}</span>
            <span class="singer">{{item.singer}}</span>
          </li>
        </ul>
        <div class="no-song" v-else>
          <p>你还没有添加任何歌曲!</p>
          <p>去首页<span>发现音乐</span></p>
        </div>
      </div>
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
        showDialog: false
      }
    },
    created() {
      this.$store.dispatch('getInitData')
      .then(data => this.$store.commit('setMusicList', data))
      .then(() => {
        this.axios.get(`http://localhost:3000/music/url?id=${this.musicList[0].id}`)
          .then(response => {
            this.url = response.data.data[0].url
            this.$store.commit('setPlayIndex', 0)
          })
      }) 
    },
    mounted() {
      this.$refs.audio.addEventListener('play', () => {
        this.$store.commit('play')
        this.tolTimeNum = this.$refs.audio && this.$refs.audio.duration
        this.tolTime = this.$refs.audio && this.formatTime(this.$refs.audio.duration)

        this.timer = setInterval(() => {
          this.curTimeNum = this.$refs.audio && this.$refs.audio.currentTime
          this.curTime = this.$refs.audio && this.formatTime(this.$refs.audio.currentTime)
        }, 990)
      }, false)

      this.$refs.audio.addEventListener('pause', () => {
        this.$store.commit('pause')
        clearInterval(this.timer)
      })

      document.addEventListener('click', e => {
        let eles = this.$refs.footer && this.$refs.footer.getElementsByTagName('*')
        for (let i = 0, length = eles.length; i < length; i++) {
          if (e.target === eles[i] || e.target === this.$refs.footer) {
            return
          }
        }
        this.showDialog = false
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
      },
      musicList() {
        return this.$store.state.musicList.musicData
      },
      isPlaying() {
        return this.$store.state.isPlaying
      },
      nowPlayIndex() {
        return this.$store.state.nowPlayIndex
      },
      showMiniAudio() {
        return this.musicList.length > 0
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
          this.isVolumeOff = true
          return 
        }
        this.$refs.audio.volume = skipWidth / 100 * 1 > 0 ? skipWidth / 100 * 1 : 0
        this.volume = this.$refs.audio.volume
        this.saveVolume = this.volume
        this.isVolumeOff = false
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
      },
      moveVolume(value) {
        if (value === 0) {
          this.$refs.audio.volume = 0
          this.volume = 0
          this.saveVolume = this.volume
          this.isVolumeOff = true
          return
        } 
        this.$refs.audio.volume = value / 100 * 1 > 0 ? value / 100 * 1 : 0
        this.volume = this.$refs.audio.volume
        this.saveVolume = this.volume
        this.isVolumeOff = false
      },
      next(flag) {
        if (this.musicList.length === 0) return 
        if (this.playStateIndex === 0) {
          this.nowPlayIndex === this.musicList.length - 1 ? this.$store.commit('setPlayIndex', 0) : this.$store.commit('setPlayIndex', ++this.nowPlayIndex)
          this.getURL(this.musicList[this.nowPlayIndex].id)
          return 
        }
        if (this.playStateIndex === 1) {
          if (!flag) return this.$refs.audio.load()
          this.nowPlayIndex === this.musicList.length - 1 ? this.$store.commit('setPlayIndex', 0) : this.$store.commit('setPlayIndex', ++this.nowPlayIndex)
          this.getURL(this.musicList[this.nowPlayIndex].id)
        }
        if (this.playStateIndex === 2) {
          this.$store.commit('setPlayIndex', Math.floor(Math.random() * this.musicList.length))
          this.getURL(this.musicList[this.nowPlayIndex].id)
          return
        }
        if (this.playStateIndex === 3) {
          if (this.nowPlayIndex === this.musicList.length - 1 && !flag) {
            return
          }
          this.nowPlayIndex === this.musicList.length - 1 ? this.$store.commit('setPlayIndex', 0) : this.$store.commit('setPlayIndex', ++this.nowPlayIndex)
          this.getURL(this.musicList[this.nowPlayIndex].id)
          return 
        }
      },
      prev() {
        if (this.musicList.length === 0) return 
        this.nowPlayIndex === 0 ? this.$store.commit('setPlayIndex', this.musicList.length - 1) : this.$store.commit('setPlayIndex', --this.nowPlayIndex)
        this.getURL(this.musicList[this.nowPlayIndex].id)
      },
      getURL(id) {
        this.axios.get(`http://localhost:3000/music/url?id=${id}`)
        .then(res => this.url = res.data.data[0].url)
      },
      playOrPause() {
        if (this.isPlaying === true) {
          this.$store.commit('pause')
          this.$refs.audio.pause()
          return
        }
        this.$store.commit('play')
        this.$refs.audio.play()
      },
      changeMusic(index) {
        this.$store.commit('setPlayIndex', index)
        this.getURL(this.musicList[this.nowPlayIndex].id)
      }
    },
    watch: {
      showMiniAudio: {
        handler(newVal) {
          this.$store.commit('setShowMiniAudio', newVal)
        }
      },
      curTimeNum: {
        handler(newVal) {
          this.$store.commit('setCurTimeNum', newVal)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
@import '../../style/footer';
</style>