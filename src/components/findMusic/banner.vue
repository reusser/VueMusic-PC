<template>
  <div class="banner-container">
    <div class="img-container">
      
    </div>
  </div>
</template>

<script>
/**
 * A module that define banner component
 * @exports vBanner
 * @author oyh(Reusjs)
 */
export default {
  name: 'vBanner',
  props: {
    imgs: {
      type: Array,
      default: []
    },
    time: {
      type: Number,
      default: 2000  //ms
    }
  },
  data() {
    return {
      imgList: this.imgs,
      timing: this.time
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/banner';
</style>

