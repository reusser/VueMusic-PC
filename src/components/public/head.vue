<template>
  <div class="music-head">
    <img src="http://on99ebnkk.bkt.clouddn.com/QQ%E5%9B%BE%E7%89%8720170413213632.png" @click="$store.commit('setShowPlay', false); $router.push({path: '/'})">
    <label>
      <input type="text"
      :placeholder = "placeholder"
      @focus = "searchFocus"
      @blur = "searchBlur"
      @keyup.enter = "searchHandler(searchText)"
      v-model = "searchText"><i class="fa fa-search" :class="{active: isActive}" @click="searchHandler(searchText)"></i>
      </label>
      <span class="about" @click="$store.commit('setShowAbout', true)">关于我</span>
    <div class="right">
      <div class="settings">
        <img :src="user.avatarUrl">
        <span id="username">{{user.nickname && usernameHandler(10)}}</span>
        <i class="fa fa-yelp" id="yelp"></i>
        <i class="fa fa-envelope-o"></i>
        <i class="fa fa-cog"></i>
      </div>
      <div class="tools">
        <i class="fa fa-external-link"></i>
        <i class="fa fa-minus"></i>
        <i class="fa fa-square-o"></i>
        <a href="http://oyhfe.com"><i class="fa fa-close"></i></a>
      </div>
      <transition name="fade">
        <div 
          class="head-dialog"
          :class="{'show-option': showOption, 'show-theme': showTheme}"
          ref="headDialog">
          <div class="user-option"
          v-if="showOption">
            <div class="avatar">
              <img :src="user.avatarUrl">
              <span class="avatar-name">{{user.nickname && usernameHandler(8)}}</span>
              <span class="sign" @click="sign">签到</span>
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
              <!--<li v-if="user.isLogin" @click="signOut"><i class="fa fa-power-off fa-fw"></i><span>退出登录</span>
                <span><span class="gt">&gt;</span></span>      
              </li>-->
              <li @click="$store.commit('setShowAbout', true)"><i class="fa fa-sign-in fa-fw"></i><span>关于我</span>
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
      </transition>
    </div>
  </div>
</template>

<script>
import storage from '../../storage.js'
/**
 * A module define public head component
 * @exports vHead
 * @author oyh(Reusjs)
 */
export default {
  name: 'vHead',
  data() {
    return {
      searchText: '',
      isActive: false,
      placeholder: '搜索音乐，歌手，歌词，用户',
      showOption: false,
      showTheme: false,
      user: {}
    }
  },
  mounted() {
    if (storage.getUser() !== null) {
      this.user = storage.getUser()
    } else {
      storage.saveUser({
        isLogin: false,
        nickname: 'oyh(未登录)',
        avatarUrl: 'http://on99ebnkk.bkt.clouddn.com/head.jpg'
      })
      this.user = storage.getUser()
    }
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
      return this.user.nickname.length >= num ? `${this.user.nickname.slice(0, num - 1)}...` : this.user.nickname
    },
    searchFocus() {
      this.isActive = true
      this.placeholder = ''
    },
    searchBlur() {
      this.isActive = false
      this.placeholder = '搜索音乐，歌手，歌词，用户'
    },
    sign() {
      if (this.isLogin === false) {
        //弹出登录框
      } else {
        //执行签到
      }
    },
    signOut() {
      this.user.isLogin = false
      this.user.nickname = 'oyh(未登录)'
      this.user.avatarUrl = 'http://on99ebnkk.bkt.clouddn.com/head.jpg'
      storage.saveUser(this.user)
    },
    signIn() {
      this.user.isLogin = true
    },
    searchHandler(keywords) {
      keywords = keywords.trim()
      if (keywords === '') return alert('输入关键词搜索')
      this.$router.push({name: 'search', params: {keywords: keywords}})
      this.$store.commit('setShowPlay', false)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/head';
</style>