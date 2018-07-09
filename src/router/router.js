import VueRouter from 'vue-router'

import Home from '../pages/home/home.vue'
import Login from '../pages/login/login.vue'
import Register from '../pages/register/register.vue'
import Goods from '../pages/goods/goods.vue'
import Index from '../pages/index.vue'
import GoodsDetail from '../pages/goods/goodsDetail.vue'
import Cart from '../pages/cart/cart.vue'
import Checkout from '../pages/checkout/checkout.vue'
import User from '../pages/user/user.vue'
import Support from '../pages/user/children/support.vue'
import OrderList from '../pages/user/children/order-list.vue'
import Information from '../pages/user/children/information.vue'
import AddressList from '../pages/user/children/addressList.vue'
import Coupon from '../pages/user/children/coupon.vue'
import Replace from '../pages/user/children/replace.vue'
import OrderDetail from '../pages//user/children/order-detail.vue'
import Order from '../pages/order/order.vue'
import Payment from '../pages/order/payment.vue'
import Alipay from '../pages/order/alipay.vue'
import Qqpay from '../pages/order/qqpay.vue'
import Weixinpay from '../pages/order/weixinpay.vue'
import Popup from '../pages/components/popup.vue'
import Search from '../pages/search/search.vue'

var router = new VueRouter({
    routes: [
        { 
            path: '/', 
            component: Index, 
            redirect: '/home',
            children: [
                { path: 'home', component: Home },
                { path: 'goods', component: Goods },
                { path: 'goodsDetails', component: GoodsDetail },
                { path: 'search', component: Search }
            ]
        },
        { path: '/login', component: Login},
        { path: '/register', component: Register},
        { path: '/cart', component: Cart},
        { path: '/checkout', component: Checkout},
        // { path: '/search', component: Search },
        { 
            path: '/user', 
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
        { path: '/order', redirect: '/order/payment', component: Order,
            children: [
                { path: '/order/payment', component: Payment },
                { path: '/order/alipay', component: Alipay },
                { path: '/order/qqpay', component: Qqpay },
                { path: '/order/weixinpay', component: Weixinpay }
            ]
        }
        
    ],
    linkActiveClass: 'active'
})

export default router