<template>
    <div class="header-container">
        <!-- 顶部logo开始 -->
        <header class="top-header w">
            <div class="logo fl">
                <span class="iconfont icon-RFQ-filling icon-logo"></span>
            </div>
            <div class="search-box fr">
                <div class="search-form">
                    <label><input type="text" name="search" value="" placeholder="请输入商品信息" v-model="keywords" @keyup.enter="setkeywords()" @blur="resetInput"></label>
                    <router-link :to="{ path:'/search',query:{key: keywords}}"><span class="iconfont icon-search"></span></router-link>
                </div>
                <ul class="nav-list fl">
                    <li>
                        <router-link to="/goods">全部商品</router-link>
                    </li>
                </ul>
                <div class="cart-box">
                    <router-link to="/login" class="user" @mouseenter.native="showUserCard" @mouseleave.native="hideUserCard">
                        <span class="iconfont icon-account"></span>
                        <!-- 个人资料卡 -->
                        <div class="user-card" v-show="userCardFlag">
                            <div class="user-info">
                                <img :src="$store.getters.getUserInfo" alt="">
                                <p>test</p>
                            </div>
                            <ul class="user-list">
                                <li class="item">
                                    <router-link to="/user/orderList">我的订单</router-link>
                                </li>
                                <li class="item">
                                    <router-link to="/user/information">账户资料</router-link>
                                </li>
                                <li class="item">
                                    <router-link to="/user/addressList">收货地址</router-link>
                                </li>
                                <li class="item">
                                    <router-link to="/user/coupon">我的优惠</router-link>
                                </li>
                                <li class="item">
                                    <router-link to="/user/support">售后服务</router-link>
                                </li>
                                <li class="item">
                                    <router-link to="/user/replace">以旧换新</router-link>
                                </li>
                            </ul>
                        </div>
                    </router-link>
                    <router-link to="/cart" class="cart">
                        <span class="iconfont icon-cart"></span>
                        <span class="iconnum" id="bage">{{ $store.getters.getAllCount }}</span>

                        <!-- 购物车卡 -->

                        <div class="car-card">
                            <div v-show="$store.getters.getAllCount != 0">
                                <ul class="card-content">
                                    <li class="item" v-for="(item,i) in $store.state.car" :key="item.id">
                                        <a href="#">
                                            <div class="product-img">
                                                <img :src="item.productImgUrl" alt="">
                                            </div>
                                            <div class="product-info">
                                                <h5>{{ item.productName }}</h5>
                                                <p> <span class="price">￥ {{ item.productPrice }} </span><span class="count">x&nbsp;{{ item.count }}</span></p>
                                            </div>
                                        </a>
                                        <div class="del">
                                            <input type="button" readonly="readonly" value="x" name="" class="del-btn" @click="delGoods(item.id, i)" />
                                        </div>
                                    </li>
                                </ul>
                                <div class="card-bottom">
                                    <div class="fl">
                                        <p class="total-num">共计 {{ $store.getters.getAllCount }} 件商品</p>
                                        <p class="total-price">合计:<em>￥<i>{{ $store.getters.getGoodsTotalamount }}</i></em></p>
                                    </div>
                                    <router-link to="/cart" class="goTo-car-btn">去购物车</router-link>
                                </div>
                            </div>
                            <div v-show="$store.getters.getAllCount == 0" class="empty-cart">
                                <img src="static/images/cart-empty-new.png" alt="">
                                <p>您的购物车竟然是空的</p>
                            </div>
                        </div>
                    </router-link>
                </div>
            </div>
        </header>
        <!-- 顶部logo结束 -->
        <!-- 顶部导航开始 -->
        <nav class="nav">
            <ul class="nav-list w">
                <li><router-link to="/home">首页</router-link></li>
                <li><router-link to="/goods">全部商品</router-link></li>
                <li><a href="https://github.com/liyue2018/vue-mall-shop">GitHub</a></li>
            </ul>
        </nav>
        <!-- 顶部导航结束 -->
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                keywords: '',
                userCardFlag: false
            }
        },
        created () {
            this.windowScroll();
        },
        mounted() {
            // this.setkeywords();
        },
        methods: {
            // 导航栏吸顶事件

            // 当屏幕滚动时触发

            windowScroll() {
                window.addEventListener('scroll', function (e) {
                    // 获取元素
                    var nav = document.querySelector('.nav');
                    // 计算滚动出去的距离 兼容性处理
                    var scrollY = document.body.scrollTop || document.documentElement.scrollTop;
                    var cart = document.querySelector('.cart-box');

                    // 判断滚动的距离超过 90px 让nav 吸顶 透明度从0到1变化
                    if (scrollY > 90) {
                        nav.style.position = 'fixed' || '';
                        nav.style.top = 0 + 'px';
                        nav.style.zIndex = 3;

                        // 让购物车下滑
                        cart.classList.add('slide');
                    } else {
                        nav.style.position = '';
                        cart.classList.remove('slide');
                    }
                })
            },
            setkeywords() {
                location.href = '/#/search?key=' + this.keywords;
                // 保存至本地存储中
                localStorage.setItem('keywords', this.keywords)
                // 保存至仓库中
                this.$store.commit('getSearchKeywords', this.keywords)
            },

            showUserCard() {
                this.userCardFlag = !this.userCardFlag;
            },

            hideUserCard() {
                if (this.userCardFlag) {
                    this.userCardFlag = !this.userCardFlag;
                }
            },
            // 删除购物车卡片里的商品
            delGoods(id, i) {
                // 删除car中的商品信息
                this.$store.commit('removeFormCar', id);
            },
            // 失去焦点时，重置搜索栏
            resetInput () {
                this.keywords = ''
            }
        }
    }
</script>
<style scoped lang="scss" rel="stylesheet/scss">
    .header-container {
        width: 100%;
        background: #333;
        // 顶部logo部分

        .top-header {
            color: #c8c8c8;
            height: 100px;
            line-height: 100px;
            padding: 0 40px 0 20px;
            .logo {
                height: 46px;
                .icon-logo {
                    font-size: 30px;
                    color: #fff;
                }
            }
            .search-box {
                .search-form {
                    float: left;
                    position: relative;
                    margin-right: 40px;
                    input[name="search"] {
                        width: 250px;
                        height: 34px;
                        padding: 4px 8px;
                        border-radius:5px;
                        font-size: 14px;
                    }
                    .icon-search {
                        position: absolute;
                        top: 0;
                        right: 10px;
                        color: #bfcbd9;
                        font-weight: 700;
                        &:hover {
                            color: #666;
                        }
                    }
                }
                .nav-list {
                    font-size: 14px;
                    li {
                        float: left;
                        width: 80px;
                        a {
                            color: #c8c8c8;
                        }
                        .iconfont {
                            font-weight: 700;
                        }
                    }
                }
                .cart-box {
                    float: right;
                    position: relative;
                    .user,.cart {
                        display: inline-block;
                        font-weight: 700;
                        color: #c8c8c8;
                        position: relative;
                        &:hover {
                            color: #e2e2e2;
                        }
                    }
                    .user {
                        width: 30px;
                        margin-left: 30px;
                    }
                    .cart {
                        .iconnum {
                            display: inline-block;
                            width: 20px;
                            height: 20px; 
                            background: #e03939; 
                            border-radius: 50%;
                            font-size: 12px;
                            position: absolute; 
                            top: 35px;
                            left: 9px;
                            line-height: 20px;
                            text-align: center;
                            color: #fff;
                        }
                        &:hover {
                            .car-card {
                                display: block;
                            }
                        }
                    }

                    // 加入购物车卡

                    .car-card, .user-card {
                        background: #fff; 
                        border-radius: 5px; 
                        box-shadow: 1px 8px 10px 1px rgba(0,0,0,.07); 
                        position: absolute;
                        line-height: 2.4;
                        z-index: 7;
                        &:before {
                                content: ''; 
                                display: block; 
                                width: 0px; 
                                height: 0px; 
                                border: 10px solid #fff; 
                                border-color: transparent transparent #fff transparent;
                                position: absolute; 
                            }
                    }
                    .car-card {
                            width: 330px;
                            top: 80px; 
                            left: -290px;
                            display: none;
                             &:before {
                                top: -20px; 
                                left: 300px;
                                transform: translateX(-50%);
                            }
                            .card-content {
                                .item {
                                    border-bottom: 1px solid #eee;
                                    position: relative;
                                    a {
                                        display: block;
                                        width: 100%; 
                                        cursor: pointer; 
                                        padding-bottom: 14px;
                                        padding: 20px 20px 30px;
                                        .product-img {
                                            width: 80px; 
                                            height: 80px; 
                                            border-radius: 5px; 
                                            border: 1px solid #eee; 
                                            float: left; 
                                            img {
                                                width: 100%; 
                                                height: 100%; 
                                            }
                                        }

                                        .product-info {
                                            margin-left: 100px;
                                            h5 {
                                                font-size: 14px; 
                                                color: #668ee7;
                                            }
                                            .price {
                                                color: #e03939; 
                                                font-weight: 700;
                                            }
                                            .count {
                                                color: #ddd; 
                                                font-size: 12px; 
                                                padding-left: 10px;
                                            }
                                        }

                                        &:hover {
                                            background: rgba(0,0,0,.02);
                                        }
                                    }
                                }
                            }

                            .card-bottom {
                                padding: 20px;
                                line-height: 1;
                                .total-num {
                                    font-size: 12px; 
                                    font-weight: normal;
                                }
                                .total-price {
                                    font-weight: 500; 
                                    color: #999; 
                                    margin-top: 6px;
                                    em {
                                        color: #e03939; 
                                        font-size: 12px; 
                                        i {
                                            font-size: 18px;
                                        }
                                    }

                                }
                                .goTo-car-btn {
                                    display: block;
                                    width: 80px;
                                    height: 40px; 
                                    line-height: 40px;
                                    color: #fff; 
                                    background-color: #678ee7;
                                    background-image: linear-gradient(180deg,#678ee7,#5078df);
                                    border: 1px solid #5c81e3; 
                                    border-radius: 4px;
                                    margin-left: 220px;
                                    text-align: center;
                                }

                            }

                            .del {
                                position: absolute;
                                top: 56px; 
                                right: 20px;
                                font-weight: 500;
                                .del-btn {
                                    width: 20px; 
                                    height: 20px; 
                                    border-radius: 50%; 
                                    border-color: #ddd;
                                    text-align: center; 
                                    font-size: 14px; 
                                    color: #ddd;
                                }
                            }

                            // 空的购物车

                            .empty-cart {
                                text-align: center; 
                                padding: 50px 0;
                                img {
                                    width: 50px; 
                                    height: 40px; 
                                }
                                p {
                                    font-weight: normal; 
                                    margin-top: 10px;
                                }
                            }

                        }

                    .user-card {
                        width: 170px; 
                        padding: 20px 0 0; 
                        top: 75px; 
                        left: -86px;
                        text-align: center;
                        color: #333;

                        &:before {
                            top: -20px; 
                            left: 50%;
                        }
                        .user-info {
                            img {
                                width: 50px; 
                                height: 50px; 
                                border-radius: 50%; 
                                border: 1px solid #eee; 
                                padding: 2px;
                                display: block;
                                margin: 0 auto;
                            }
                            p {
                                margin-top: 10px;
                            }
                        }

                        .user-list {
                            color: #333; 
                            margin-top: 10px;
                            li.item {
                                height: 40px; 
                                line-height: 40px; 
                                a {
                                    display: block; 
                                    height: 100%; 
                                    border: 1px solid #eee; 
                                    border-width: 1px 0 0;
                                    color: #333; 
                                    font-size: 12px; 
                                    font-weight: normal;
                                    &:hover {
                                        background: rgba(0,0,0,.02);
                                    }
                                }
                            }
                        }
                    }

                }
                .cart-box.slide {
                        position: fixed;
                        right: 100px; 
                        top: -14px;
                        z-index: 4;
                        transition: all 0.2s ease-in-out;
                        a {
                            color: #666;
                        }
                    }
            }
        }
        // 导航栏
        .nav {
            width: 100%;
            height: 70px; 
            line-height: 50px; 
            background: #f7f7f7;
            box-shadow: 0 2px 4px rgba(0,0,0,.04);
            width: 100%;
            transition: all 0.2s ease-in-out;
            .nav-list {
                height: 100%; 
                padding: 10px 0; 
                li {
                    height: 100%;
                    width: 100px;
                    float: left;
                    margin: 0 10px;
                    a {
                        display: block;
                        height: 100%;
                        width: 100%; 
                        text-align: center;
                        position: relative;
                        color: #666;
                        // &:before {
                        //     content: ''; 
                        //     width: 4px; 
                        //     height: 4px; 
                        //     border-radius: 50%;
                        //     background: #dbdbdb;
                        //     position: absolute; 
                        //     top: 33px; 
                        //     left: 0;
                        // }

                    }
                    a.active {
                        color: #b37272;
                        background: #dcdcdc;
                        border-radius: 5px;
                    }

                }
            }
        }
    }
</style>