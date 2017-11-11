import Vue from 'vue'
import Router from 'vue-router'
import BlogArticle from '@/pages/blog/Article'
import BlogJournal from '@/pages/blog/Journal'
import SystemUser from '@/pages/system/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'SystemUser',
      component: SystemUser
    },
    {
      path: '/system/user',
      name: 'SystemUser',
      component: SystemUser
    },
    {
      path: '/blog/article',
      name: 'BlogArticle',
      component: BlogArticle
    },
    {
      path: '/blog/journal',
      name: 'BlogJournal',
      component: BlogJournal
    }
  ]
})
