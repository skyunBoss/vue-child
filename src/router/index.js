import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 路由懒加载
const Home = () => import('@/pages/home/home')
const TimeShop = () => import('@/pages/home/timeshop')
const Setting = () => import('@/pages/setting/setting')
const Mine = () => import('@/pages/mine/mine')
const UserValidation = () => import('@/pages/mine/userValidation')
const SetPassword = () => import('@/pages/mine/setpassword')

export default new Router({
  routes: [
    // 根路径
    {
      path: '/',
      redirect: '/home',
      component: Home
    },  
    // 首页
    {
      path: '/home',
      component: Home
    },
    { // 时间商城
  	  path: '/timeshop',
  	  component: TimeShop
  	},
    // 设置页面
    {
      path: '/setting',
      component: Setting
    },
    // 个人中心
    {
      path: '/mine',
      component: Mine
    },
    // 个人资料设置
    {
      path: '/userValidation',
      component: UserValidation
    },
    // 修改密码
    {
      path: '/setpassword',
      component: SetPassword
    }
  ]
})
