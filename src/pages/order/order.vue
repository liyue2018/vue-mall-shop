<template>
    <div>
        <mall-header class="order-header"></mall-header>
        <div class="order-container w">
            <div class="order-content">
                <h3 class="title">支付订单</h3>
                <div class="main">
                    <transition mode="out-in" tag="div">
                        <router-view @selectedtype="getSelectedType"></router-view>
                    </transition>
                    <div class="payment-info">
                        <span>订单金额:<em>￥{{ $store.getters.getTotal.amount }}</em></span>
                        <span>实际应付金额:<em>￥{{ $store.getters.getTotal.amount }}</em></span>

                        <router-link :to="locationHref" type="button" disabled="disabled" class="disabled-btn">立即支付
                       </router-link>
                        <!-- <button type="button" disabled="disabled" class="disabled-btn">立即支付</button> -->
                    </div>
                </div>
            </div>
            <div class="address-info">
                <div class="header">
                    <span>收货信息</span>
                </div>
                <div class="content">
                    <p>姓名: 朝阳群众</p>
                    <p>联系电话: 12345678900</p>
                    <p>详细地址：北京市朝阳区</p>
                </div>
            </div>
            <div class="goods-info">
                <div class="head">
                    <span>商品信息</span>
                    <div class="fr">
                        <span>单价</span>
                        <span>数量</span>
                        <span>小计</span>
                    </div>
                </div>
                <div>
                    <div class="body" v-for="item in $store.getters.getSelectedGoods">
                        <span>{{ item.productName }}</span>
                        <div class="fr">
                            <span>￥{{ item.productPrice }}</span>
                            <span>{{ item.count }}</span>
                            <span>￥{{ item.productPrice * item.count }}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="order-discount-line">
                <p class="price-total">
                    <span>商品总计：</span>
                    <span>¥ {{ $store.getters.getTotal.amount }}</span>
                </p>
                <p>运费：+ ¥ 0.00</p>
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
                locationHref: '',
                selectedtype: ''

            }
        },
        created() {
        },
        methods: {
            getSelectedType(selectedtype){
                this.selectedtype = selectedtype;
            },

            // 判断 selectedtype,进行跳转

            judgeSelectedType() {
                
            }

        },
        components: {
            "mallHeader": mallHeader,
            "mallFooter": mallFooter
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .order-header {
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

    .order-container {
        .order-content {
            margin: 60px auto;
            border: 1px solid #d4d4d4;
            border-radius: 5px; 
            overflow: hidden;
            h3.title {
                height: 60px; 
                line-height: 60px; 
                background: #f3f3f3; 
                background: linear-gradient(#fbfbfb,#ececec); 
                padding-left: 20px;
                font-size: 20px;
            }
            .main {
                background: #fff; 
                text-align: center; 
                padding: 20px;
                position: relative;
                overflow: hidden;
                h1 {
                    font-size: 24px;
                    margin-bottom: 10px;
                }
                .tips {
                    color: #928f91;
                }

                // .time-down {
                //     position: absolute;
                //     bottom: 100px;
                //     left: 50%;
                //     transform: translateX(-50%);
                // }
                .payment-info {
                    border-top: 1px solid #e5e5e5; 
                    background: #f9f9f9; 
                    position: absolute; 
                    bottom: 0; 
                    left: 0; 
                    right: 0; 
                    height: 80px; 
                    line-height: 80px;
                    text-align: right;
                    padding-right: 20px;
                    span {
                        padding-right: 10px;
                        em {
                            color: #d44d44; 
                            font-size: 20px; 
                            font-weight: 700;
                        }
                    }
                    .disabled-btn {
                        border: 1px solid #afafaf; 
                        border-radius: 4px; 
                        background: #a9a9a9; 
                        background-image: linear-gradient(180deg,#b8b8b8,#a9a9a9);
                        cursor: not-allowed;
                        padding: 10px 26px;
                        color: #fff;
                        font-size: 14px;
                    }
                }

                // 路由动画

                .v-enter, 
                .v-leave-to {
                    opacity: 0; 
                    transform: translateX(50px);
                }

                .v-enter-active, 
                .v-leave-active {
                    transition: all 0.5s ease;
                }
            }
        }

        .order-discount-line {
            padding: 20px 40px; 
            text-align: right;
            line-height: 38px;
            .price-total {
                font-weight: 700;
                font-size: 16px;
            }

            .pay {
                font-size: 18px; 
                .pay-money {
                    color: #d44d44; 
                    font-weight: 700;
                }

            }
        }

        .address-info {
            border-top: 1px solid #ddd;
            padding: 20px;
            .header {
                height: 38px; 
                line-height: 38px; 
                background: #eee; 
                font-weight: 700;
                font-size: 14px;
            }
            .content {
                line-height: 26px;
            }
        }

        .goods-info {
            .head {
                border-top: 1px solid #ddd; 
                padding: 0 20px; 
                height: 60px; 
                line-height: 60px; 
                font-weight: 700;
                .fr {
                    span {
                        display: inline-block;
                        width: 150px; 
                        text-align: center;
                    }
                }
            }
            .body {
                height: 80px; 
                line-height: 80px; 
                padding: 0 20px;
                border: {
                    bottom: 1px solid #ddd;
                    top: 1px solid #ddd;
                }
                .fr {
                    span {
                        display: inline-block;
                        width: 150px; 
                        text-align: center;
                        font-weight: 700;
                    }
                }
            }
        }
    }

</style>