<template>
  <div class="progress-container"
    @mousedown="skip"
    ref="progress"
    :style="{width: `${width}px`}">
    <div class="progress" 
      :style="{width: ismove ? `${dragWidth}px` : `${proWidth}px`}">
      <span class="dot" 
        :style="{transform: ismove ? `translateX(${dragWidth}px) translateY(-50%)` : `translateX(${proWidth}px) translateY(-50%)`}" 
        @mousedown="moveInit"
        ref="dot"
      >
      <span class="circle"></span>
    </span>
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
      flag: false,
      ismove: false,
      dragWidth: 0
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
      document.addEventListener('dragenter', e => {
        e.preventDefault()
      })
      document.addEventListener('dragover', e => {
        e.preventDefault()
        document.removeEventListener('mousemove', this.moveHandler, false)
        document.removeEventListener('mouseup', this.upHandler, false)
        this.ismove = false
      })
    },
    moveHandler(e) {
      if (this.flag) {
        document.removeEventListener('mousemove', this.moveHandler, false) 
        return
      }
      this.ismove = true
      let moveWidth = this.$refs.progress && e.clientX - this.$refs.progress.offsetLeft

      if (moveWidth < 0) return this.dragWidth = 0
      if (moveWidth > this.width) return this.dragWidth = this.width
      return this.dragWidth = moveWidth
    },
    upHandler(e) {
      this.ismove = false
      this.flag = true
      document.removeEventListener('mousemove', this.moveHandler, false)
      document.removeEventListener('mouseup', this.upHandler, false)
      this.$emit('move', this.dragWidth)
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