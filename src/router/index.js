import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'BlogLayout',
    component: () => import('@/views/layout/blogLayout.vue')
  },
  {
    path: '/article',
    name: 'BlogArticle',
    component: () => import('@/views/article/blogArticle.vue')
  },
  {
    path: '/article/:id',
    name: 'ArticleDetail',
    component: () => import('@/views/article/articleDetail.vue')
  },
  {
    path: '/category',
    name: 'BlogCategory',
    component: () => import('@/views/category/blogCategory.vue')
  },
  {
    path: '/label',
    name: 'BlogLabel',
    component: () => import('@/views/label/blogLabel.vue')
  },
  {
    path: '/about',
    name: 'BlogAbout',
    component: () => import('@/views/about/blogAbout.vue')
  },
  {
    path: '/login',
    name: 'BlogLogin',
    component: () => import('@/views/login/blogLogin.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
