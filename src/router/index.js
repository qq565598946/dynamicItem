import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  // mode:'history',
  routes: [
    {
      path: '/',
      name: '动态单位统计',
      component: resolve => require(['@/view/querylist/index'], resolve),
    },{
      path:'/subofficeCon',
      name:'分局',
      component: resolve => require(['@/view/querylist/subofficeCon'], resolve),
    },{
      path:'/threePage',
      name:'分局详情',
      component: resolve => require(['@/view/querylist/threePage'], resolve),
    }
  ]
})
