import Vue from 'vue'
import Router from 'vue-router'
import findMusic from '../components/findMusic/findMusic.vue'
import singer from '../components/singer.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'findMusic',
      component: findMusic
    },
    {
      path: '/singer',
      name: 'singer',
      component: singer
    }
  ]
})
