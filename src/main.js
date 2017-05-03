// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'
import storage from './storage.js'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    musicList: {'musicData': []},
    theme: 'red',
    isPlaying: false,
    nowPlayIndex: 0,
    showMiniAudio: true,
    commendList: {'commendList': []},
    curTimeNum: 0,
    showPlay: false,
    showAbout: false,
    showLogin: false,
    day: {'musicData': []},
    theme: ''
  },
  mutations: {
    setMusicList: (state, playload) => {
      state.musicList = playload
      storage.saveMusic(playload)
    },
    play: state => {
      state.isPlaying = true

    },
    pause: state => {
      state.isPlaying = false
    },
    clear: state => {
      state.musicList = {'musicData':[]}
      storage.saveMusic({'musicData':[]})
    },
    setPlayIndex: (state, playload) => {
      state.nowPlayIndex = playload
    },
    setShowMiniAudio: (state, playload) => {
      state.showMiniAudio = playload
    },
    setCommendList: (state, playload) => {
      state.commendList = playload
    },
    setCurTimeNum: (state, playload) => {
      state.curTimeNum = playload
    },
    setShowPlay: (state, playload) => {
      state.showPlay = playload
    },
    modifyMusicList: (state, playload) => {
      for (let i = 0, length = state.musicList.musicData.length; i < length; i++) {
        if (state.musicList.musicData[i].id == playload.id) {
          return
        }
      }
      state.musicList.musicData.splice(state.nowPlayIndex + 1, 0, playload)
      state.nowPlayIndex = state.nowPlayIndex + 1
      storage.saveMusic(playload)
    },
    setShowAbout: (state, playload) => {
      state.showAbout = playload
    },
    setShowLogin: (state, playload) => {
      state.showLogin = playload
    },
    setDay: (state, playload) => {
      state.day = playload
    },
    setTheme: (state, playload) => {
      state.theme = playload
    } 
  },
  actions: {
    getInitData() {
      return new Promise((resolve, reject) => {
        Vue.axios.get('http://oyhfe.com:666/music-data')
          .then(res => {
            resolve(res.data.musicData)
          })
      })
    },
    getInitCommend() {
      return new Promise((resolve, reject) => {
        Vue.axios.get('http://oyhfe.com:666/commend-list')
          .then(res => {
            resolve(res.data.commendList)
          })
      })
    },
    getInitDay() {
      return new Promise((resolve, reject) => {
        Vue.axios.get('http://oyhfe.com:666/day')
        .then(res => {
          resolve(res.data.day)
        })
      })
    }
  }
})
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
console.log("%c18届萌新求前端实习 熟悉css ES5 ES6 前端自动化构建 vue.js","background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #4096EE), color-stop(0.15, #FF1A00), color-stop(0.3, #4096EE), color-stop(0.45, #FF1A00),color-stop(0.6, #4096EE), color-stop(0.75, #FF1A00),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));color:transparent;-webkit-background-clip:text;font-size:10px;");
console.log("%c联系方式(QQ): 919917215","background-image:-webkit-gradient( linear, left top,right top, color-stop(0, #4096EE), color-stop(0.15, #FF1A00), color-stop(0.3, #4096EE), color-stop(0.45, #FF1A00),color-stop(0.6, #4096EE), color-stop(0.75, #FF1A00),color-stop(0.9, #4096EE), color-stop(1, #FF1A00));color:transparent;-webkit-background-clip:text;font-size:10px;");

