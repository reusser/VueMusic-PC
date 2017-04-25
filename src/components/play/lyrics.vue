<template>
  <div class="lyrics-container" ref="lyc">
    <template v-if="!isNoLyric">
      <p v-for="(item, index) in lyricsArray" :class="index === nowLyricIndex ? 'now' : ''">
        {{item.txt}}
      </p>
    </template>
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
      nowLyricIndex: -1,
      scrollDis: 0
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
    }
  },
  methods: {
    showLyrics() {
      for (let i = 0, length = this.lyricsArray.length; i < length; i++) {
        if (this.lyricsArray[i].totalTime - this.curTimeNum > 0) {
          this.nowLyricIndex = i - 1 >= 0 ? i - 1 : -1
          break
        }
      }
      this.nowLyricIndex > 4 ? this.animation((this.nowLyricIndex - 4) * (this.distance + 2)) : this.$refs.lyc.scrollTop = 0
    },
    animation(dis) {
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
    }
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
          this.lyricsArray.push({min: 999, second: 999, ms: 999, totalTime: '99999999', txt: ''})
          this.lyricsArray.sort((a, b) => a.totalTime - b.totalTime)
        })
        this.$refs.lyc.scrollTop = 0
        this.scrollDis = 0 
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

