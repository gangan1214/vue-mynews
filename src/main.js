// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// css
import '@/assets/css/reset.css'
import '@/assets/css/icon.css'
import '@/assets/css/transition.css'
import '@/assets/css/global.css'

// 第三方库
import MintUI, { MessageBox, Toast, Indicator } from 'mint-ui' // 饿了么移动端UI组件
import 'mint-ui/lib/style.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/dist/css/swiper.css'

// 自定义组件
import myLoading from '@/components/loading'
import myBanner from '@/components/banner'
import listItem from '@/components/listItem'
import listInfo from '@/components/info'

Vue.config.productionTip = false
Vue.use(MintUI)
Vue.use(VueAwesomeSwiper)
Vue.prototype.$toast = Toast
Vue.prototype.$msgBox = MessageBox
Vue.prototype.$indicator = Indicator

// 注册全局组件
Vue.component('my-loading', myLoading)
Vue.component('my-banner', myBanner)
Vue.component('list-item', listItem)
Vue.component('list-info', listInfo)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
