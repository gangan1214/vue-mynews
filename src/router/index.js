import Vue from 'vue'
import Router from 'vue-router'
import App from '../App'

Vue.use(Router)

const index = () => import('@/page/index/index')

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: App,
      children: [{
			path: '/index',
      		component: index
      	}
      ]
    }
  ]
})
