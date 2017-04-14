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
        <i class="fa fa-yelp" id="yelp"></i>
        <i class="fa fa-envelope-o"></i>
        <i class="fa fa-cog"></i>
      </div>
      <div class="tools">
        <i class="fa fa-external-link"></i>
        <i class="fa fa-minus"></i>
        <i class="fa fa-square-o"></i>
        <i class="fa fa-close"></i>
      </div>
      <div 
        class="head-dialog"
        :class="{'show-option': showOption, 'show-theme': showTheme}"
        ref="headDialog">
        <div class="user-option"
        v-if="showOption">
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
          <ul class="msg">
            <li><i class="fa fa-vimeo fa-fw"></i><span>会员中心</span>
              <span>未订购<span class="gt">&gt;</span></span>
            </li>
            <li><i class="fa fa-database fa-fw"></i><span>等级</span>
              <span class="level">LV10<span class="gt">&gt;</span></span>
            </li>
            <li><i class="fa fa-opencart fa-fw"></i><span>积分商城</span>
              <span>999积分<span class="gt">&gt;</span></span> 
            </li>
            <li><i class="fa fa-cogs fa-fw"></i><span>个人信息设置</span>
              <span><span class="gt">&gt;</span></span> 
            </li>
            <li><i class="fa fa-mobile"></i><span>绑定社交账号</span>
              <span><i class="fa fa-weibo"></i><i class="fa fa-weixin"></i>
              <span class="gt">&gt;</span></span>             
            </li>
            <li><i class="fa fa-usb fa-fw"></i><span>导入歌单</span>
              <span><span class="gt">&gt;</span></span> 
            </li>
            <li><i class="fa fa-power-off fa-fw"></i><span>退出登录</span>
              <span><span class="gt">&gt;</span></span>      
            </li>
          </ul>
        </div>
        <div class="theme-option"
        v-if="showTheme">
          <p class="theme-head">
            主题
          </p>
          <ul class="line-one">
            <li><span>酷炫黑</span></li>
            <li><span>官方红</span></li>
            <li><span>可爱粉</span></li>
          </ul>
          <ul class="line-two">
            <li><span>天际蓝</span></li>
            <li><span>清新绿</span></li>
            <li><span>土豪金</span></li>
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
      placeholder: '搜索音乐，歌手，歌词，用户',
      showOption: false,
      showTheme: false
    }
  },
  mounted() {
    document.addEventListener('click', e => {
      if (e.target.id === 'username') {
        this.showOption = !this.showOption
        this.showTheme = false
        return
      }
      if (e.target.id === 'yelp') {
        this.showTheme = !this.showTheme
        this.showOption = false
        return
      }
      if (this.showOption === false && this.showTheme === false) {
        return
      }
      let eles = this.$refs.headDialog ? this.$refs.headDialog.getElementsByTagName('*') : ''
      for (let i = 0, length = eles.length; i < length; i++) {
        if (eles[i] === e.target) {
          return
        }
      }
      this.showTheme = false
      this.showOption = false
    }, false)
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