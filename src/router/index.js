import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'',
      redirect:'/login'
    },
    {
      path:'/login',
      component:()=>import('../components/Login')
    },
    {
      path:'/login/:user',
      component:()=>import('../components/Login')
    },
    {
      path:'/register',
      component:()=>import('../components/Register')
    },
    {
      path:'/tools',
      component:()=>import('../components/Tools'),
      children:[
        {
          path:'home',
          component:()=>import('../components/Home')
        },
        {
          path:'userinfo',
          component:()=>import('../components/UserInfo')
        },
        {
          path:'bin',
          component:()=>import('../components/Bin')
        },
        {
          path:'usermessage',
          component:()=>import('../components/UserMessage')
        },
        {
          path:'userteam',
          component:()=>import('../components/UserTeam')
        },
        {
          path:'userfile',
          component:()=>import('../components/UserFile')
        },
      ]
    },

  ]
})
