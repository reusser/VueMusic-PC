<template>
  <div class="search-album-container">
    <ul class="album-list">
      <li v-for="item in albumList">
        <img :src="item.imgUrl" @click="$router.push({name: 'album', params:{id: item.albumId}})">
        <span class="album-name" @click="$router.push({name: 'album', params:{id: item.albumId}})">{{item.albumName}}&nbsp;&nbsp;<span v-if="item.isAlias" class="alias">({{item.alias}})</span></span>
        <span class="singer" @click="$router.push({name: 'singer', params:{id: item.singerId}})">{{item.singer}}&nbsp;&nbsp;<span v-if="item.isSingerAlias" class="alias">({{item.singerAlias}})</span></span>
      </li>
    </ul>
    <div class="page">
      <ul>
        <li class="pre-btn" @click="$emit('updateAlbumOffset', ~~ (nowPageIndex - 1))"><i class="fa fa-angle-left"></i></li>
        <li :class="nowPageIndex === 1 ? 'active' : ''" @click="$emit('updateAlbumOffset', 1)" v-if="Math.ceil(albumTotal / 30) > 1">1</li>
        <li class="apostrophe" v-show="nowPageIndex >= 6">...</li>
        <li v-for="(item, index) in pageList" @click="$emit('updateAlbumOffset', ~~ item)" :class="~~ item === nowPageIndex ? 'active' : ''">{{item}}</li>
        <li class="apostrophe" v-show="nowPageIndex <= Math.ceil(albumTotal / 30) - 5">...</li>
        <li :class="nowPageIndex === Math.ceil(albumTotal / 30) ? 'active' : ''" @click="$emit('updateAlbumOffset', Math.ceil(albumTotal / 30))">{{Math.ceil(albumTotal / 30)}}</li>
        <li class="next-btn" @click="$emit('updateAlbumOffset',~~ (nowPageIndex + 1))"><i class="fa fa-angle-right"></i></li>
      </ul>
    </div>
  </div>
</template>

<script>
/**
 * A module that define searchAlbum a type of searchType
 * @exports searchAlbum
 * @author oyh(Reusjs)
 */
export default {
  name: 'searchAlbum',
  props: {
    albumList: {
      type: Array,
      default: []
    },
    nowPageIndex: {
      type: Number,
      default: 1
    },
    albumTotal: {
      type: Number,
      default: 0
    }
  },
  computed: {
    pageList() {
      let arr = []
      let total = Math.ceil(this.albumTotal / 30)
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
@import '../../style/searchAlbum';
</style>