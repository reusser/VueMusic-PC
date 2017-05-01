import Vue from 'vue'
import Router from 'vue-router'
import findMusic from '../components/findMusic/findMusic.vue'
import singer from '../components/singer.vue'
import album from '../components/album.vue'
import search from '../components/search.vue'
import songList from '../components/songList.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'findMusic',
      component: findMusic
    },
    {
      path: '/singer/:id',
      name: 'singer',
      component: singer
    },
    {
      path: '/album/:id',
      name: 'album',
      component: album
    },
    {
      path: '/search/:keywords',
      name: 'search',
      component: search
    },
    {
      path: '/songList/:id',
      name: 'songList',
      component: songList
    }
  ]
})
