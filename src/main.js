// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import Vuex from 'vuex'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

Vue.use(Vuex)


const store = new Vuex.Store({
  state: {
    musicList: {'musicData':[]},
    theme: 'red',
    isPlaying: false,
    nowPlayIndex: 0,
    showMiniAudio: true
  },
  mutations: {
    setMusicList: (state, playload) => {
      state.musicList = playload
    },
    play: state => {
      state.isPlaying = true

    },
    pause: state => {
      state.isPlaying = false
    },
    clear: state => {
      state.musicList = {'musicData':[]}
    },
    setPlayIndex: (state, playload) => {
      state.nowPlayIndex = playload
    },
    setShowMiniAudio: (state, playload) => {
      state.showMiniAudio = playload
    } 
  },
  actions: {
    getInitData() {
      return new Promise((resolve, reject) => {
        Vue.axios.get('/music-data')
          .then(res => {
            resolve(res.data.musicData)
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
