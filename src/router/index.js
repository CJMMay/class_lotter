import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import pretable from '@/components/pretable'
import nianji_lotter from '@/components/nianji_lotter'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(Router)
// Vue.use(pretable)


export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/pre',
      name: 'pretable',
      component: pretable
    },
    {
      path: '/nianji',
      name: 'nianji_lotter',
      component: nianji_lotter
    }
  ]
})
