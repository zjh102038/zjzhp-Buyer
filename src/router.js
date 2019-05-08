import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue';
import ShopCar from './views/shopcar.vue';
import MyHome from './views/myhome.vue';
import Affirm from './views/affirm.vue';
import PaySuccess from './views/paysuccess.vue';
import Detail from './views/detail.vue';
import Login from './views/Login.vue';
import Register from './views/register.vue';

// import derectives from './components/lianxi/directives.vue';
// import tianjia from './components/lianxi/tinajia.vue';
import storelist from './views/StoreList.vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Router)
Vue.use(ElementUI)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect:'/home/storelist'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      children: [
        {
          path:'/home/storelist',
          name:'myhome',
          component:storelist  //首页
        },
        {
          path:'/home/myhome/:id',
          name:'myhome',
          component:MyHome  //商品
        },
        {
          path: '/home/shopcar',
          name: 'shopcar',
          component: ShopCar  //购物车
        },
        {
          path: '/home/mine',
          name: 'mine',
          component: () => import('./views/Mine'),  //我的
        },
      ]
    },
    {
      path: '/affirm',
      name: 'affirm',
      component: Affirm  //确认订单
    },
    {
      path: '/paysuccess',
      name: 'paysuccess',
      component: PaySuccess  //支付完成
    },
    {
      path: '/setup',
      name: 'setUp',
      component: () => import('./views/setUp')  //设置
    },
    {
      path: '/mystorelist',
      name: 'mystorelist',
      component: () => import('./views/myStoreList')  //收藏店铺列表
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: () => import('./views/MyOrder'),  //订单列表
      
    },
    {
      path: '/detail',
      name: 'detail',
      component: Detail  //商品详情
    },
    {
      path:'/login',
      name:'login',
      component:Login  //登录
    },
    {
      path:'/register',
      name:'register',
      component:Register  //注册
    },
    // {
    //   path:'/derectives',
    //   name:'derectives',
    //   component:derectives
    // },
    // {
    //   path:'/tianjia',
    //   name:'tianjia',
    //   component:tianjia
    // },
    {
      path: '/storelist',
      name: 'storelist',
      component: storelist  //店铺列表
    }
  ]
})
