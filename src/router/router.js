import Vue from 'vue'
import VueRouter from 'vue-router'

// 路由懒加载
const Home = () => import('../pages/home/home.vue')
const Login = () => import ('../pages/login/login.vue')
const Register = () => import ('../pages/register/register.vue')
const Goods = () => import ('../pages/goods/goods.vue')
const Index = () => import ('../pages/index.vue')
const GoodsDetail = () => import ('../pages/goods/goodsDetail.vue')
const Cart = () => import ('../pages/cart/cart.vue')
const Checkout = () => import ('../pages/checkout/checkout.vue')
const User = () => import ('../pages/user/user.vue')
const Support = () => import ('../pages/user/children/support.vue')
const OrderList = () => import ('../pages/user/children/order-list.vue')
const Information = () => import ('../pages/user/children/information.vue')
const AddressList = () => import ('../pages/user/children/addressList.vue')
const Coupon = () => import ('../pages/user/children/coupon.vue')
const Replace = () => import ('../pages/user/children/replace.vue')
const OrderDetail = () => import ('../pages//user/children/order-detail.vue')
const Order = () => import ('../pages/order/order.vue')
const Payment = () => import ('../pages/order/payment.vue')
const Alipay = () => import ('../pages/order/alipay.vue')
const Qqpay = () => import ('../pages/order/qqpay.vue')
const Weixinpay = () => import ('../pages/order/weixinpay.vue')
const Popup = () => import ('../pages/components/popup.vue')
const Search = () => import ('../pages/search/search.vue')

// scrollBehavior:
// - only available in html5 history mode
// - defaults to no scroll behavior
// - return false to prevent scroll

const scrollBehavior = (to, from, savedPosition) => {

  if (savedPosition) {
    return savedPosition;
  } else {
    const position = {};

    // new navigation.
    // scroll to anchor by returning the selector

    if (to.hash) {
      position.selector = to.hash
    }

    // check if any matched route config has meta that requires scrolling to top
    if (to.matched.some(m => m.meta.scrollToTop)) {
      // cords will be used if no selector is provided,
      // or if the selector didn't match any element.
      position.x = 0;
      position.y = 0;
    }

    // if the returned position is falsy or an empty object,
    // will retain current scroll position.
    return position;
  }
}

Vue.use(VueRouter);

const router = new VueRouter({

    // 添加异步滚动
    mode: 'history', // 清除地址栏中的 # 
    base: __dirname,
    scrollBehavior,
    routes: [
        { 
            path: '/', 
            component: Index, 
            redirect: '/home',
            children: [
                { path: 'home', name: 'home', component: Home, meta: { scrollToTop: true} },
                { path: 'goods', component: Goods },
                { path: 'goodsDetails', component: GoodsDetail, meta: { scrollToTop: true} },
                { path: 'search', component: Search }
            ]
        },
        { path: '/login', name: 'login', component: Login },
        { path: '/register', component: Register },
        { 
            path: '/cart', 
            name: 'cart',
            meta: {
                requireAuth: true
            },
            component: Cart
        },
        { 
            path: '/checkout',
            name: 'checkout',
            meta: {
                requireAuth: true
            },
            component: Checkout
        },
        { 
            path: '/user', 
            name: 'user',
            meta: {
                requireAuth: true
            },
            component: User,
            redirect: '/user/orderList',
            children: [
                { path: '/user/orderList', component: OrderList }, 
                { path: '/user/OrderDetail', component: OrderDetail }, 
                { path: '/user/information', component: Information },
                { path: '/user/addressList', component: AddressList },
                { path: '/user/coupon', component: Coupon },
                { path: '/user/support', component: Support },
                { path: '/user/replace', component: Replace }
            ]

        },
        { 
            path: '/order', 
            meta: {
                    requireAuth: true
            },
            redirect: '/order/payment', 
            component: Order,
            children: [
                { path: '/order/payment',name: 'order', component: Payment },
                { path: '/order/alipay', component: Alipay },
                { path: '/order/qqpay', component: Qqpay },
                { path: '/order/weixinpay', component: Weixinpay }
            ]
        },
        {
            path: '*',
            redirect: '/home'
        }
        
    ],
    linkActiveClass: 'active'
})

// 全局路由守卫

router.beforeEach ((to, from, next) => {
    console.log ('navigation-guards');
    const nextRoute = ['cart', 'checkout', 'user', 'order'];
    // 是否登录
    let isLogin = JSON.parse (localStorage.getItem('login') || '');
    // 未登录状态；当路由到nextRoute指定页时，跳转至login
    if (nextRoute.indexOf (to.name) >= 0) {
        if (!isLogin) {
            console.log ('未登录,请先登录');
            var l = prompt ("未登录,请先登录");
            if (l == true) {
                router.push ({ name: 'login' });
            } else {
                router.push ({ name: 'home' });
                console.log ('好吧，那就留在原地吧');
            }
        }
    }

    // 已登录状态；当路由到login时，跳转至home 

    if (to.name === 'login') {
        if (isLogin) {
            router.push ({ name: 'home' });
        }
    }

    // 一定要调用该方法来 resolve 这个钩子。执行效果依赖 next 方法的调用参数。
    next ();
})

export default router;