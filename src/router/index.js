import Vue from 'vue'
import Router from 'vue-router'
import index from '../components/content'
import story from '../components/story'
import hot from '../components/hot'
import favorite from '../components/favorite'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },
      {path: '/story/:id', name: 'story', component: story},
      {path: '/hot', name: 'hot', component: hot},
       {path: '/favorite', name: 'favorite', component: favorite}
  ]
})
