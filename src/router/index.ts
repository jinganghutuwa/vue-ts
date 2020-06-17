/*
 * @Author: Jason
 * @Date: 2019-11-08 14:16:45
 * @version: 
 * @LastEditors: Jason
 * @LastEditTime: 2020-06-17 21:59:48
 * @Descripttion: 
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  // { path : '/', redirect: '/'},
  { path : '*', redirect: '/'},
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/model',
    name: 'modelTest',
    component: () => import('../views/modelTest.vue')
  },
  {
    path: '/solt',
    name: 'soltTest',
    component: () => import('../views/soltTest.vue')
  },

  {
    path: '/point/city',
    name: 'pointCity',
    meta:{
      isShowBack:true
    },
    component: () => import('../views/point/city.vue')
  },
  {
    path: '/point/list',
    name: 'pointList',
    meta:{
      isShowBack:true
    },
    component: () => import('../views/point/list.vue')
  },
  {
    path: '/point/nav',
    name: 'pointNav',
    meta:{
      isShowBack:true
    },
    component: () => import('../views/point/nav.vue')
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
