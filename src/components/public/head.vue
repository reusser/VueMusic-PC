<template>
  <div class="music-head">
    <img src="http://on99ebnkk.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720170413213632.png">
    <label>
      <input type="text"
      :placeholder = "placeholder"
      @focus = "searchFocus"
      @blur = "searchBlur"
      v-model = "searchText"><i class="fa fa-search" :class="{active: isActive}"></i>
      </label>
    <div class="right">
      <div class="settings">
        <img src="http://on99ebnkk.bkt.clouddn.com/head.jpg">
        <span id="username">{{usernameHandler(10)}}</span>
        <i class="fa fa-yelp"></i>
        <i class="fa fa-envelope-o"></i>
        <i class="fa fa-cog"></i>
      </div>
      <div class="tools">
        <i class="fa fa-external-link"></i>
        <i class="fa fa-minus"></i>
        <i class="fa fa-square-o"></i>
        <i class="fa fa-close"></i>
      </div>
      <div class="head-dialog">
        <div class="user-option">
          <div class="avatar">
            <img src="http://on99ebnkk.bkt.clouddn.com/head.jpg">
            <span class="avatar-name">{{usernameHandler(8)}}</span>
            <span class="sign">签到</span>
          </div>
          <ul class="social">
            <li>
              <p>0</p>
              <p>动态</p>
            </li>
            <li>
              <p>0</p>
              <p>关注</p>
            </li>
            <li>
              <p>999</p>
              <p>粉丝</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * A module define public head component
 * @exports vHead
 * @author oyh(Reusjs)
 */
export default {
  name: 'vHead',
  data() {
    return {
      username: 'oyh(未登录)',
      searchText: '',
      isActive: false,
      placeholder: '搜索音乐，歌手，歌词，用户'
    }
  },
  methods: {
    usernameHandler(num) {
      return this.username.length >= num ? `${this.username.slice(0, num - 1)}...` : this.username
    },
    searchFocus() {
      this.isActive = true
      this.placeholder = ''
    },
    searchBlur() {
      this.isActive = false
      this.placeholder = '搜索音乐，歌手，歌词，用户'
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/head'
</style>