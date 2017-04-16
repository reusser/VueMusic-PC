<template>
  <div class="progress-container"
    @mousedown="skip"
    ref="progress"
    :style="{width: `${width}px`}">
    <div class="progress" :style="{width: `${proWidth}px`}"></div>
    <div class="dot" 
      :style="{left: `${proWidth - 7.5}px`}" 
      @mousedown="moveInit"
      ref="dot"
    >
      <span class="circle"></span>
    </div>
  </div>
</template>

<script>
/**
 * A module that define slider component
 * @exports v-slider
 * @author oyh(Reusjs)
 */
export default {
  name: 'vSlider',
  props: {
    value: {
      type: Number,
      default: 0
    },
    totalVal: {
      type: Number,
      default: 0
    },
    width: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      curValue: this.value,
      flag: false
    }
  },
  computed: {
    proWidth() {
      return parseFloat((this.curValue / this.totalVal * this.width).toFixed(3))
    }
  },
  methods: {
    moveInit(e) {
      this.flag = false
      document.addEventListener('mousemove', this.moveHandler, false)
      document.addEventListener('mouseup', this.upHandler, false)
    },
    /*move(e) {
      let moveWidth = e.clientX - this.$refs.progress.offsetLeft
      if (moveWidth < 0) return this.$emit('move', 0)
      if (moveWidth > this.width) return this.$emit('move', this.width)
      return this.$emit('move', moveWidth)
    },*/
    moveHandler(e) {
      if (this.flag) {
        document.removeEventListener('mousemove', this.moveHandler, false) 
        console.log(22222)
        return
      }
      let moveWidth = this.$refs.progress && e.clientX - this.$refs.progress.offsetLeft
        console.log(moveWidth)

      if (moveWidth < 0) {
        this.curValue = 0
      } else if (moveWidth > this.width) {
        this.curValue = this.totalVal
      } else {
        this.curValue = this.moveWidth
      }
    },
    upHandler(e) {
      console.log(1)
      this.flag = true
      document.removeEventListener('mousemove', this.moveHandler, false)
      document.removeEventListener('mouseup', this.upHandler, false)
    },
    skip(e) {
      let skipWidth = e.clientX - this.$refs.progress.offsetLeft
      if (skipWidth < -3) return
      if (skipWidth > -3 && skipWidth < 0) return this.$emit('skip', 0)
      return this.$emit('skip', skipWidth)
    }
  },
  watch: {
    value: {
      handler(newVal) {
        this.curValue = newVal
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../style/slider';
</style>