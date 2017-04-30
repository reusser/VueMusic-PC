<template>
  <div class="search-singer-container">
    <ul class="singer-list">
      <li v-for="item in singerList" @click="$router.push({name: 'singer', params:{id: item.id}})">
        <img :src="item.imgUrl">
        <span class="singer-name">{{item.singerName}}</span>
        <span class="alias" v-if="item.isAlias">({{item.alias}})</span>
      </li>
    </ul>
    <div class="page">
      <ul>
        <li class="pre-btn" @click="$emit('updateSingerOffset', ~~ (nowPageIndex - 1))"><i class="fa fa-angle-left"></i></li>
        <li :class="nowPageIndex === 1 ? 'active' : ''" @click="$emit('updateSingerOffset', 1)" v-if="Math.ceil(singerTotal / 30) > 1">1</li>
        <li class="apostrophe" v-show="nowPageIndex >= 6">...</li>
        <li v-for="(item, index) in pageList" @click="$emit('updateSingerOffset', ~~ item)" :class="~~ item === nowPageIndex ? 'active' : ''">{{item}}</li>
        <li class="apostrophe" v-show="nowPageIndex <= Math.ceil(singerTotal / 30) - 5">...</li>
        <li :class="nowPageIndex === Math.ceil(singerTotal / 30) ? 'active' : ''" @click="$emit('updateSingerOffset', Math.ceil(singerTotal / 30))">{{Math.ceil(singerTotal / 30)}}</li>
        <li class="next-btn" @click="$emit('updateSingerOffset',~~ (nowPageIndex + 1))"><i class="fa fa-angle-right"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * A module that define searchSinger a type of searchType
 * @exports searchSinger
 * @author oyh(Reusjs)
 */
export default {
  name: 'searchSinger',
  props: {
    singerList: {
      type: Array,
      default: []
    },
    nowPageIndex: {
      type: Number,
      default: 1
    },
    singerTotal: {
      type: Number,
      default: 0
    }
  },
  computed: {
    pageList() {
      let arr = []
      let total = Math.ceil(this.singerTotal / 30)
      if (total < 3) return []
      if (total < 9) {
        let arr = [...Array(total).keys()]
        arr.shift()
        arr.shift()
        return arr
      }
      if (this.nowPageIndex < 6) return [2, 3, 4, 5, 6, 7, 8]
      if (this.nowPageIndex > total - 5) return [total - 7, total - 6, total - 5, total - 4, total - 3, total - 2, total - 1]
      return [this.nowPageIndex - 3, this.nowPageIndex - 2, this.nowPageIndex - 1, this.nowPageIndex, this.nowPageIndex + 1, this.nowPageIndex + 2, this.nowPageIndex + 3]
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../style/searchSinger";
</style>