import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'admin',  //操作首页
      component: () => import(/* webpackChunkName: "adminIndex" */ '../views/admin/adminIndex.vue'),
      children:[
        {
          path: 'income',
          name: 'income',   //收入分析
          component: () => import(/* webpackChunkName: "income" */ '../views/admin/income.vue'),
        },
        {
          path: 'operation',
          name: 'operation',  //运营管理
          component: () => import(/* webpackChunkName: "operation" */ '../views/admin/operation.vue'),
        },
        {
          path: 'productData',
          name: 'productData',  //产品数据分析
          component: () => import(/* webpackChunkName: "productData" */ '../views/admin/productData.vue'),
        },
      ]
    },
    {
      path: '/login',
      name: 'login',  //操作首页
      component: () => import(/* webpackChunkName: "adminIndex" */ '../views/login/login.vue'),
    }
  ]
})
