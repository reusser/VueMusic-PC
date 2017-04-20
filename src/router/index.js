import Vue from 'vue'
import Router from 'vue-router'
import findMusic from '../components/findMusic/findMusic.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'findMusic',
      component: findMusic
    }
  ]
})
