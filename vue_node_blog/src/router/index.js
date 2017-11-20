import Vue from 'vue'
import Router from 'vue-router'
import BlogArticle from '@/pages/blog/Article'
import BlogProject from '@/pages/blog/Project'
import BlogResume from '@/pages/blog/Resume'
import SystemUser from '@/pages/system/User'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {
        name: 'SystemUser'
      }
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
      path: '/blog/project',
      name: 'BlogProject',
      component: BlogProject
    },
    {
      path: '/blog/resume',
      name: 'BlogResume',
      component: BlogResume
    }
  ]
})
