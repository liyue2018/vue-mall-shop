<template>
    <div>
        <mall-header class="checkout-header"></mall-header>
        <div class="w">
            <!-- 收货信息开始 -->
            <panel :title="addressTit" class="address-info">
                <div slot="content">
                    <transition-group mode="out-in" tag="div">
                        <div class="card" :class="{selected: item.checked}" v-for="item in ($store.state.address)" :key="item.id">
                            <ul class="user-info">
                                <li>收货人: {{ item.username }}</li>
                                <li>收货地址: {{ item.detailAddress }}</li>
                                <li>手机号码: {{ item.tel }}</li>
                            </ul>
                            <div class="checked" v-if="item.checked">
                                <span class="iconfont icon-selected"></span>
                            </div>
                            <div class="operation-section">
                                <a class="update-btn" @click.prevent='revise' @click='resiveInfo (item)'>修改</a>
                                <a class="del-btn" @click.prevent="del (item.id)">删除</a>
                            </div>
                        </div>
                    </transition-group>
                    <a href="javascript:;" class="card" @click.prevent="addNewAddress">
                        <div class="new-address">
                            <span class="add-icon">+</span>
                            <span>添加新地址</span>
                        </div>
                    </a>
                </div>
            </panel>
            <!-- 收货信息结束 -->
            <!-- 购物清单开始 -->
            <panel :title="shoppingTit" class="shopping-list">
                <div slot="content">
                    <div class="list-header">
                        <span class="name">商品信息</span>
                        <p class="fr">
                            <span>单价</span>
                            <span>数量</span>
                            <span>小计</span>
                        </p>
                    </div>
                    <div class="list-body">
                        <div class="cart-table" v-for="item in ($store.getters.getSelectedGoods)" :key="item.id">
                            <div class="items-choose">
                                <div class="items-img">
                                    <img :src="item.productImgUrl" alt="" />
                                </div>
                                <div>
                                    <a href="#" class="items-name">{{ item.productName }}</a>
                                </div>
                            </div>
                            <div class="fr items-info">
                                <div>￥{{ item.productPrice }}</div>
                                <div>
                                    {{ item.count }}
                                </div>
                                <div>￥{{ item.productPrice * item.count }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="cart-bottom clearfix">
                        <div class="fr shopping">
                            <div class="shopping-total shopping-price">
                                <h4 class="">应付总额: <span class="price">￥{{ $store.getters.getTotal.amount }}</span></h4>
                                <h6 class="shopping-tips">应付总额不含运费</h6>
                            </div>
                            <div class="fl">
                                <a href="javascript:;">
                                    <input type="button" readonly="readonly" value="提交订单" name="" class="now-buy-btn" :class="{'disable-btn': isDisable}" ref="nowBuyBtn" :disable="disable" @click.prevent="nowBuy" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </panel>
            <!-- 购物清单结束 -->
        </div>
        <!-- 新增收货地址的弹窗 -->
        <popup v-if="isPopup" @getPopupState="addNewAddress" @getResive="revise" :title="title" :addressInfo="addressinfo" :isResive="isResive"></popup>
        <mall-footer></mall-footer>
    </div>
</template>

<script>

import mallHeader from '../common/header.vue'
import mallFooter from '../common/footer.vue'
import buynum from '../components/buynum.vue'
import popup from '../components/popup.vue'
import panel from '../components/panel.vue'

    export default {
        data: function() {
            return {
                isPopup: false,
                addressTit: '收货信息',
                shoppingTit: '购物清单',
                isDisable: false, 
                disable: false,
                title: '',
                addressinfo: '',
                isResive: ''
            }
        },
        created() {
        },
        methods: {
            // 添加新地址
            addNewAddress (popupState) {
                // 显示添加新地址弹窗
                this.title = '新增收货地址'
                this.isPopup = popupState,
                this.isResive = 1
            },
            del(id) {
                // 删除仓库中的地址信息
                this.$store.commit ('delAddress', id)
            },
            // 修改地址
            revise(popupState) {
                this.title = '修改收货地址'
                this.isPopup = popupState
                this.isResive = -1


                // console.log (item)
            },
            // 传递修改地址的信息
            resiveInfo (obj) {
                // console.log (obj)
                this.addressinfo = obj
                // this.addressinfo.isResive = true
            },
            // 提交订单
            nowBuy () {
                this.disable = true
                this.isDisable = true
                this.$refs.nowBuyBtn.value = '正在提交订单中'
                setTimeout(function () {
                    location.href = '#/order/payment'
                }, 1500)
            }
        },
        components: {
            mallHeader,
            mallFooter,
            buynum,
            popup,
            panel
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .checkout-header {
        height: 100px;
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
    // 收货信息

    .address-info {
        padding-bottom: 10px;
        margin-top: 30px;
        .content {
            background: #fff; 
            padding: 30px 20px;
            border-radius: 0 0 8px 8px;

             // 路由动画

            .v-enter, 
            .v-leave-to {
                opacity: 0; 
                transform: translateY(50px);
            }

            .v-move {
                transition: all 0.6s ease;
            }

            .v-enter-active, 
            .v-leave-active {
                transition: all 0.5s ease;
            }


            .card {
                width: 266px; 
                height: 158px;
                border: 1px solid #e5e5e5; 
                background: #fafafa; 
                border-radius: 4px; 
                padding: 20px; 
                position: relative;
                float: left;
                margin: {
                    bottom: 20px; 
                    left: 20px;
                }
                .user-info {
                    line-height: 2;
                }
                .checked {
                    color: rgb(106, 143, 229); 
                    position: absolute; 
                    right: 20px; 
                    top: 10px;
                    span {
                        font-size: 26px;
                        font-weight: 700;
                    }
                }
                .operation-section {
                    width: 100%; 
                    height: 30px; 
                    line-height: 30px; 
                    position: absolute; 
                    bottom: -30px;
                    left: 0;
                    display: none;
                    a {
                        display: inline-block; 
                        width: 50%; 
                        text-align: center;
                        float: left;
                        background: #fff; 
                        border: 1px solid #e1e1e1;
                        border-width: 1px 0;
                        &:hover {
                            background: #fafafa;
                        }
                    }
                    a.update-btn {
                        border-right: 1px solid #e1e1e1;
                    }
                }

                .new-address {
                    margin-top: 30px;
                    text-align: center;
                    opacity: 0.8;
                    .add-icon {
                        display: block;
                        width: 28px; 
                        height: 28px; 
                        border-radius: 50%;
                        background: #666; 
                        color: #fff; 
                        text-align: center;
                        font-size: 18px;
                        margin: 0 auto 10px;
                        opacity: 1;
                    }
                }
                &:hover {
                    background: #efeeee;
                    cursor: pointer;
                    .operation-section {
                        bottom: 2px; 
                        transition: all 0.5s ease-in-out;
                        display: block;
                    }
                }


            }
            .card.selected {
                border-color: #6a8fe5; 
                background: #fff;
                &:hover {
                    background: #fff;
                }
            }


        }
    }

    // 购物清单

    .shopping-list {
        position: relative; 
        overflow: hidden;
          .list-header {
            height: 38px; 
            line-height: 38px; 
            font-size: 12px;
            color: #838383;
            background: #eee;
            padding-left: 50px;
            border: 1px solid #dbdbdb;
            span.name {
                float: left;
            }
            p {
                span {
                    display: inline-block; 
                    width: 137px; 
                    text-align: center;
                }
            }

        }
        .list-body {
            padding-bottom: 50px;
        }
        .cart-table {
            height: 140px; 
            line-height: 6;
            background: #fff;
            padding-top: 26px;
            padding-left: 26px;
            border: 1px solid #eee;
            .items-choose {
                float: left;
                >div {
                    float: left;
                }
                .items-img {
                    display: inline-block;
                    width: 80px; 
                    height: 80px; 
                    border: 1px solid #eee;
                    border-radius: 3px;
                    overflow: hidden;
                    margin: 0 20px;
                    img {
                        width: 80px; 
                        height: 80px;
                        vertical-align: middle;
                    }
                }

                .items-name {
                    color: #333;
                    font-size: 14px;
                }
            }
            .items-info {
                font-weight: 500;
                height: 85px;
                line-height: 4;
                >div {
                    display: inline-block; 
                    width: 137px; 
                    text-align: center;
                    .items-del-btn {
                        font-size: 18px; 
                        font-weight: 700; 
                        color: rgba(0,0,0,.6);
                        opacity: 0.5;
                        &:hover {
                            opacity: 1;
                        }
                    }
                }
            }
        }

        .cart-bottom {
            height: 110px; 
            padding: 20px;
            width: 100%;
            background: #fdfdfd;
            background: linear-gradient(#fdfdfd,#f9f9f9);
            border: 1px solid #e9e9e9; 
            box-shadow: 0 -4px 10px 1px rgba(0, 0, 0, 0.06);
            border-radius: 0 0 8px 8px;
            position: absolute; 
            bottom: 0;
            .shopping {
                .shopping-total {
                    width: 200px;
                    color: #323232; 
                    line-height: 1.4285;
                    font-size: 16px;
                    float: left;
                    margin-top: 6px;
                    .shopping-tips {
                        color: #959595;
                        font-size: 12px;
                    }
                }
                .shopping-price {
                    text-align: left;
                    padding-left: 20px;
                    margin-right: 20px;
                    .price {
                        color: #d44d44; 
                        padding: 0 6px;
                        font-size: 20px; 
                        font-weight: 500;
                    }
                }
                .now-buy-btn {
                    color: #fff; 
                     background-color: #678ee7;
                     background-image: linear-gradient(180deg,#678ee7,#5078df);
                     border-radius: 4px;
                     border: 1px solid #5c81e3;
                     width: 140px; 
                     text-align: center; 
                     padding: 14px 0;
                     font-size: 16px;
                     &:hover {
                        background: #2b53bb;
                        background-image: linear-gradient(180deg,#5078df,#2b53bb);
                     }
                }
                .disable-btn {
                    cursor: not-allowed;
                    opacity: 0.6;
                }
            }
        }
    }
</style>