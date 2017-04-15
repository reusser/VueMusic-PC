<template>
  <div class="progress-container" @mousedown="skip" ref="progress">
    <div class="progress" :style="{width: `${proWidth}px`}"></div>
    <div class="dot" :style="{left: `${proWidth - 7.5}px`}">
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

    }
  },
  computed: {
    curTime() {
      return this.value
    },
    proWidth() {
      return this.curTime / this.totalVal * this.width
    }
  },
  methods: {
    move() {

    },
    skip(e) {
      let skipWidth = e.clientX - this.$refs.progress.offsetLeft
      if (skipWidth < -3) return
      if (skipWidth > -3 && skipWidth < 0) return 0
      return skipWidth
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../style/slider';
</style>