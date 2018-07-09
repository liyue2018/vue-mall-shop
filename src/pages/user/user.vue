<template>
    <div>
        <mall-header class="user-header"></mall-header>
        <div class="user-content w">
            <div class="slider-nav">
                <div class="user-img">
                    <img :src="imgUrl" alt="">
                    <h3 class="username">test</h3>
                </div>
                <ul class="slider-nav-list">
                    <li class="slider-nav-item">
                        <router-link to="/user/orderList">我的订单</router-link>
                    </li>
                    <li class="slider-nav-item">
                        <router-link to="/user/information">账户资料</router-link>
                    </li>
                    <li class="slider-nav-item">
                        <router-link to="/user/addressList">收货地址</router-link>
                    </li>
                    <li class="slider-nav-item">
                        <router-link to="/user/coupon">我的优惠</router-link>
                    </li>
                    <li class="slider-nav-item">
                        <router-link to="/user/support">售后服务</router-link>
                    </li>
                    <li class="slider-nav-item">
                        <router-link to="/user/replace">以旧换新</router-link>
                    </li>
                </ul>
            </div>
            <div class="main-content">
                <transition mode="out-in" tag="div">
                    <router-view class="user-panel" @getImg="getImgUrl"></router-view>
                </transition>
            </div>
        </div>
        <mall-footer></mall-footer>
    </div>
</template>

<script>
    import mallHeader from '../common/header.vue'
    import mallFooter from '../common/footer.vue'

    export default {
        data: function () {
            return {
                imgUrl: ''
            }
        },
        created() {
            this.getImgUrl();
        },
        methods: {
            getImgUrl() {
                this.imgUrl = JSON.parse(localStorage.getItem('submitImgUrl'));
            }
        },
        watch: {
            '$route.path': function(newVal, oldVal) {
                switch(newVal) {
                    case '/user/orderList':
                        console.log('欢迎进入我的订单页面')
                        break;
                    case '/user/information':
                        console.log('欢迎进入账户资料页面');
                        break;
                    case '/user/addressList':
                        console.log('欢迎进入收货地址页面');
                        break;
                    case '/user/coupon':
                        console.log('欢迎进入我的优惠页面')
                        break;
                    case '/user/coupon':
                        console.log('欢迎进入售后服务页面')
                        break;

                    default:
                    console.log('欢迎进入以旧换新页面');
                }
            }
        },
        components: {
            "mallHeader": mallHeader,
            "mallFooter": mallFooter
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .user-header {
        height: 100px;
        // overflow-y: hidden;
        .nav {
            opacity: 0;
            height: 0;

        }
        .top-header .search-box {
            .cart-box.slide {
                z-index: -1!important;
            }
        }
    }

    .user-content {
        margin-top: 30px;
        position: relative;
        z-index: 5;
        .slider-nav {
            width: 210px;
            height: 518px; 
            background: #fff; 
            border-radius: 5px; 
            border: 1px solid #ddd;
            position: absolute; 
            left: 0; 
            top: 0;
            .user-img {
                width: 100%;
                height: 200px;
                padding-top: 40px; 
                text-align: center;
                margin: 0 auto;
                img {
                    width: 100px; 
                    height: 100px;
                }
                .username {
                    font-size: 18px; 
                    font-weight: 500; 
                }
            }

            .slider-nav-list {
                margin-top: 16px;
                .slider-nav-item {
                    width: 100%; 
                    height: 50px;
                    border-top: 1px solid #ebebeb;
                    a {
                        display: block;
                        width: 100%; 
                        height: 50px; 
                        line-height: 50px; 
                        text-align: center; 
                        font-weight: 500; 
                        color: #5079d9;
                        &:hover {
                            background: #98afee; 
                            color: #fff;
                        }
                    }
                    a.active {
                        background: #98afee; 
                        color: #fff;
                    }
                }
            }
        }

        .main-content {
            min-height: 600px;
            padding-left: 230px;
        }

        // 路由动画

        .v-enter, 
        .v-leave-to {
            opacity: 0; 
            transform: translateY(80px);
        }

        .v-enter-active, 
        .v-leave-active {
            transition: all 0.5s ease;
        }

        .user-panel {
            background: #eee; 
            // border: 1px solid #ddd; 
            // border-radius: 5px;
            .title {
                height: 60px; 
                line-height: 60px; 
                border: 1px solid #d4d4d4; 
                background: #f3f3f3; 
                background: linear-gradient(#fbfbfb,#ececec); 
                padding-left: 20px; 
                box-shadow: 0 9px 4px -8px rgba(0, 0, 0, 0.1);
                font-size: 18px; 
                font-weight: 400;
                color: #333;
                border-radius: 4px;
            }
        }
    }
</style>