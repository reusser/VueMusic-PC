<template>
  <div class="banner-container">
    <div 
      class="img-container"
      @mouseover="clear"
      @mouseout="set"
      @click="change('', $event)">
      <ul>
        <li :class="[classBox[0], {
          'skip-left': isSkip && leftIndex === 0,
          'skip-center': isSkip && centerIndex === 0,
          'skip-right': isSkip && rightIndex === 0,
          'is-post': isPost,
          'is-prev': isPrev
          }]">
          <img :src="imgList[firstIndex]">
        </li>
        <li :class="[classBox[1], {
          'skip-left': isSkip && leftIndex === 1,
          'skip-center': isSkip && centerIndex === 1,
          'skip-right': isSkip && rightIndex === 1,
          'is-post': isPost,
          'is-prev': isPrev
          }]">
          <img :src="imgList[secondIndex]">
        </li>
        <li :class="[classBox[2], {
          'skip-left': isSkip && leftIndex === 2,
          'skip-center': isSkip && centerIndex === 2,
          'skip-right': isSkip && rightIndex === 2,
          'is-post': isPost,
          'is-prev': isPrev
          }]">
          <img :src="imgList[thirdIndex]">
        </li>
      </ul>
      <div class="prev-btn" @click.stop="change('prev')">
        <i class="fa fa-chevron-left"></i>
      </div>
      <div class="post-btn" @click.stop="change('post')">
        <i class="fa fa-chevron-right"></i>
      </div>
    </div>
    <ul class="dot-list">
      <li class="dot"
          v-for="(item, index) in imgList"
          :class="{active: index === nowImgIndex}"
          @mouseover="skip(index)"
          @mouseout="set">      
      </li>
    </ul>
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
      default: 3000  //ms
    }
  },
  data() {
    return {
      imgList: this.imgs,
      timing: this.time,
      classBox: ['left', 'center', 'right'],
      nextLeftIndex: 2,
      nextRightIndex: 0,
      nowImgIndex: 0,
      firstIndex: this.imgs.length - 1,
      secondIndex: 0,
      thirdIndex: 1,
      nextIndex: 2,
      lastIndex: this.imgs.length - 2,
      timer: '',
      isSkip: false,
      isPrev: false,
      isPost: true
    }
  },
  mounted() {
    this.timer = setInterval(this.nextImg, this.timing)
  },
  computed: {
    centerIndex() {
      let i = -1
      this.classBox.forEach((item, index) => {
        if (item === 'center') i = index
      })
      return i
    },
    leftIndex() {
      let i = -1
      this.classBox.forEach((item, index) => {
        if (item === 'left') i = index
      })
      return i
    },
    rightIndex() {
      let i = -1
      this.classBox.forEach((item, index) => {
        if (item === 'right') i= index
      })
      return i
    }
  },
  methods: {
    nextImg() {
      let item = this.classBox.pop()
      this.classBox.unshift(item)
      if (this.nextRightIndex === 0) {
        this.firstIndex = this.nextIndex
      } else if (this.nextRightIndex === 1) {
        this.secondIndex = this.nextIndex
      } else {
        this.thirdIndex = this.nextIndex
      }
      this.nextRightIndex = this.nextRightIndex === 2 ? 0 : this.nextRightIndex + 1
      this.nextLeftIndex = this.nextLeftIndex === 2 ? 0 : this.nextLeftIndex + 1
      this.nextIndex = this.nextIndex === this.imgList.length - 1 ? 0 : this.nextIndex + 1 
      this.nowImgIndex = this.nowImgIndex === this.imgList.length - 1 ? 0 : this.nowImgIndex + 1
      this.lastIndex = this.lastIndex === this.imgList.length - 1 ? 0 : this.lastIndex + 1
      this.isPost = true
      this.isPrev = false
    },
    prevImg() {
      let item = this.classBox.shift()
      this.classBox.push(item)
      if (this.nextLeftIndex === 0) {
        this.firstIndex = this.lastIndex
      } else if (this.nextLeftIndex === 1) {
        this.secondIndex = this.lastIndex
      } else {
        this.thirdIndex = this.lastIndex
      }
      this.nextLeftIndex = this.nextLeftIndex === 0 ? 2 : this.nextLeftIndex - 1
      this.nextRightIndex = this.nextRightIndex === 0 ? 2 : this.nextRightIndex - 1
      this.lastIndex = this.lastIndex === 0 ? this.imgList.length - 1 : this.lastIndex - 1
      this.nowImgIndex = this.nowImgIndex === 0 ? this.imgList.length - 1 : this.nowImgIndex - 1
      this.nextIndex = this.nextIndex === 0 ? this.imgList.length - 1 : this.nextIndex - 1
      this.isPost = false
      this.isPrev = true
    },
    clear() {
      clearInterval(this.timer)
    },
    set() {
      this.timer = setInterval(this.nextImg, this.timing)
    },
    change(arg, event) {
      if (arg === 'prev') return this.prevImg()
      if (arg === 'post') return this.nextImg()
      if (event.target.className.indexOf('center') >= 0) return
      if (event.target.className.indexOf('left') >= 0) return this.prevImg()
      if (event.target.className.indexOf('right') >= 0) return this.nextImg()
      return 
    },
    skip(index) {
      clearInterval(this.timer)
      if (index === this.nowImgIndex) return
      if (this.nowImgIndex === 0) {
        if (index === 7) {
          this.prevImg()
        } else if (index === 1) {
          this.nextImg()
        } else {
          this.skipHandler(index)
        }
      } else if (this.nowImgIndex === 7) {
        if (index === 0) {
          this.nextImg()
        } else if (index === 6) {
          this.prevImg()
        } else {
          this.skipHandler(index)
        }
      } else {
        if (index === this.nowImgIndex - 1) {
          this.prevImg()
        } else if (index === this.nowImgIndex + 1) {
          this.nextImg()
        } else {
          this.skipHandler(index)
        }
      }
    },
    skipHandler(index) {
      this.isSkip = true
      if (index < this.nowImgIndex) {
        //setTimeout( () => {
          for (let i = 0, length = Math.abs(index - this.nowImgIndex); i < length; i++) {
            this.prevImg()
          }
       // }, 30) 
      } else {
        //setTimeout( () => {
          for (let i = 0, length = Math.abs(index - this.nowImgIndex); i < length; i++) {
            this.nextImg()
          }
        //}, 30)
      }
      setTimeout(() => {
        this.isSkip = false
      }, 20)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/banner';
</style>

