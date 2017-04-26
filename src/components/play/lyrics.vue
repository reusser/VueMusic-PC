<template>
  <div class="lyrics-container" ref="lyc">
    <div ref="lyrics" class="lyrics" v-if="!isNoLyric">
        <p v-for="(item, index) in lyricsArray" :class="index === nowLyricIndex ? 'now' : ''">
          {{item.txt}}
        </p>
    </div>
    <p v-if="isNoLyric" class="no-lyric">
      纯音乐，请您欣赏
    </p>
  </div>
</template>

<script>
/**
 * A module that define lyrics component
 * @exports vLyrics
 * @author oyh(Reusjs)
 */
export default {
  name: 'vLyrics',
  props: {
    sendLyric: {
      type: String,
      default: ''
    },
    distance: {
      type: Number,
      default: 30
    },
    noLyric: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      lyricsArray: [],
      nowLyricIndex: -1
    }
  },
  computed: {
    id() {
      return this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex] && this.$store.state.musicList.musicData[this.$store.state.nowPlayIndex].id
    },
    lyrics() {
      return this.sendLyric.split('\n')
    },
    curTimeNum() {
      return this.$store.state.curTimeNum
    },
    isNoLyric() {
      return this.noLyric
    },
    translateNum() {
      if (this.nowLyricIndex <= 4) return 0
      if (this.nowLyricIndex >= this.lyricsArray.length - 6) return (this.lyricsArray.length - 11) * (this.distance + 2)
      return (this.nowLyricIndex - 4) * (this.distance + 2)
    }
  },
  methods: {
    showLyrics() {
      let length = this.lyricsArray.length
      for (let i = 0; i < length; i++) {
        if (this.lyricsArray[i].totalTime - this.curTimeNum > 0) {
          this.nowLyricIndex = i - 1 >= 0 ? i - 1 : -1
          break
        }
      }
      //this.nowLyricIndex > 4 ? this.animation((this.nowLyricIndex - 4) * (this.distance + 2)) : this.$refs.lyc.scrollTop = 0
     this.$refs.lyrics.style.transform = `translateY(-${this.translateNum}px)`
    },
    /*scrollHandler() {
      if (this.timer) clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.$refs.lyc.scrollTop = 0
      }, 2000)
    }*/
    /*animation(dis) {
      let d = dis / 15
      let timer = setInterval( () => {
        if (this.scrollDis >= dis) {
          this.scrollDis = dis
          //this.$refs.lyc.scrollTop = this.scrollDis
          clearInterval(timer)
          return
        }
        this.scrollDis += d
        this.$refs.lyc.scrollTop = this.scrollDis
      }, 1000 / 15)
    }*/
  },
  watch: {
    lyrics: {
      handler(newVal) {
        if (this.isNoLyric === true) return
        this.lyricsArray = []
        this.nowLyricIndex = -1
        this.scrollDis = 0
        this.$refs.lyc.scrollTop = 0
        newVal.forEach(item => {
          item = item.trim()
          let arr = item.match(/\[\d*:\d*((\.|\:)\d*)*\]/g)
          if (arr && arr.length > 1) {
            let obj = {
              min: ~~ arr[0].substring(1, 3),
              second: ~~ arr[0].substring(4, 6),
              ms: ~~ arr[0].substring(7, 9),
              txt: item.substring(20, item.length).trim().replace(/\d*]/, '')
            }
            obj.totalTime = obj.min * 60 + obj.second + obj.ms / 100
            let obj1 = {
              min: ~~ arr[1].substring(1, 3),
              second: ~~ arr[1].substring(4, 6),
              ms: ~~ arr[1].substring(7, 9),
              txt: item.substring(20, item.length).trim().replace(/\d*]/, '')
            }
            obj1.totalTime = obj1.min * 60 + obj1.second + obj1.ms / 100
            if (obj.txt.length > 0) {
              this.lyricsArray.push(obj)
              this.lyricsArray.push(obj1)
            }
          } else {
            let obj = {
              min: ~~ item.substring(1, 3),
              second: ~~ item.substring(4, 6),
              ms: ~~ item.substring(7, 9),
              txt: item.substring(10, item.length).trim().replace(/\d*]/, '')
            }
            obj.totalTime = obj.min * 60 + obj.second + obj.ms / 100
            if (obj.txt.length > 0) this.lyricsArray.push(obj)
          }
          this.lyricsArray.sort((a, b) => a.totalTime - b.totalTime)
        })
        this.lyricsArray.push({min: 999, second: 999, ms: 999, totalTime: '99999999', txt: ''})
        //this.$refs.lyc.scrollTop = 0
        //this.scrollDis = 0 
      }
    },
    curTimeNum: {
      handler(newVal) {
        if (this.isNoLyric === true) {
          return
        }
        this.showLyrics()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/lyrics';
</style>

