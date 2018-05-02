import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Login from '@/components/Login'
import Frame from '@/components/Frame'
import News from '@/components/News'
import AddNews from '@/components/AddNews'
import Users from '@/components/Users'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: '/login',
      component: HelloWorld
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Frame',
      name: 'Frame',
      component: Frame,
      children: [{
        path: 'News',
        name: 'News',
        component: News,
      },{
        path: 'AddNews',
        name: 'AddNews',
        component: AddNews,
      },{
        path: 'Users',
        name: 'Users',
        component: Users,
      }]
    },
  ]
})
