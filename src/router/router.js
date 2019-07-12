import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'admin',  //操作首页
      component: () => import(/* webpackChunkName: "admin" */ '../views/admin/adminIndex.vue'),
    },
    {
      path: '/admin',
      name: 'adminIndex',  //操作首页
      component: () => import(/* webpackChunkName: "adminIndex" */ '../views/admin/adminIndex.vue'),
      children: [
        {
          path: '/income',
          name: 'income',   //收入分析
          component: () => import(/* webpackChunkName: "income" */ '../views/admin/income.vue'),
        },
        {
          path: '/productData',
          name: 'productData',  //产品数据分析
          component: () => import(/* webpackChunkName: "productData" */ '../views/admin/productData.vue'),
        },
        {
          path: '/auditDispose',
          name: 'auditDispose',  //审核处理
          component: () => import(/* webpackChunkName: "auditDispose" */ '../views/admin/auditDispose.vue'),
        },
        {
          path: '/auditInquire',
          name: 'auditInquire',  //审核查询
          component: () => import(/* webpackChunkName: "auditInquire" */ '../views/admin/auditInquire.vue'),
        },
        {
          path: '/auditDetails',
          name: 'auditDetails',  //审核查询
          component: () => import(/* webpackChunkName: "auditDetails" */ '../components/auditDetails.vue'),
        }
      ]
    },
    {
      path: '/login',
      name: 'login',  //操作首页
      component: () => import(/* webpackChunkName: "login" */ '../views/login/login.vue'),
    }
  ]
})
