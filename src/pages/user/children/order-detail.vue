<template>
    <div>
        <div>
            <h1 class="title">
                订单号: 153009679584979
            </h1>
            <div class="status">
                <div class="orderStatus">
                    <el-steps :space="200" :active="orderStatus" finish-status="success">
                      <el-step title="下单" v-bind:description="createTime"></el-step>
                      <el-step title="付款" v-bind:description="payTime"></el-step>
                      <el-step title="配货" description=""></el-step>
                      <el-step title="出库" description=""></el-step>
                      <el-step title="交易成功" v-bind:description="finishTime"></el-step>
                    </el-steps>
                </div>
                <div class="status-now">
                    <div class="status-now-head">
                        <span class="big-font">订单状态: 待付款</span>
                        <div class="btns">
                            <router-link to="/order/payment" tag="button" type="button" class="">现在付款</router-link>
                            <button type="button" class="cancel-btn">取消订单</button>
                        </div>
                    </div>
                    <div class="time">
                        您的付款时间还有 23 小时 55 分 26 秒 ，超时后订单将自动取消。
                    </div>
                </div>
            </div>
            <div class="orderDetail-content">
                <div class="lists">

                    <div class="table-title">
                        <div class="l-box">
                            <span class="date">商品名称</span>
                            <div class="fr">
                                <span class="price">单价</span>
                                <span class="num">数量</span>
                                <span class="operation">小计</span>
                            </div>
                        </div>
                    </div>
                    <div class="list-content">
                        <div class="l-box">
                            <span class="goods-img">
                                <img src="/static/images/product01.png" alt="" />
                            </span>
                            <span class="order-id">捐赠商品</span>
                            <div class="fr">
                                <span class="price">￥ 1.00</span>
                                <span class="num">1</span>
                                <span class="price">￥ 1.00</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="order-discount-line">
                    <p class="price-total">
                        <span>商品总计：</span>
                        <span>¥ 2700</span>
                    </p>
                    <p>运费：+ ¥ 0.00</p>
                    <p class="pay">应付金额：<span class="pay-money">¥ 2700</span></p>
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
            </div>
        </div>
    </div>
</template>

<script>
import { Steps } from 'element-ui'
    export default {
        data: function() {
            return {
                orderStatus:1,
                createTime:'2018-06-27 12:09:00',
                payTime: '2018-06-27 12:09:00',
                finishTime:'2018-06-27 12:09:00'
            }
        },
        conpoments: {
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    .status {
        background: #fff; 
        padding: 30px;
        .orderStatus {
            width: 900px;
            margin: 30px auto;
        }
        .status-now {
            border: 1px solid #dadada; 
            background: #f6f6f6; 
            width: 100%; 
            line-height: 38px;
            padding: 30px 20px;
            border-radius: 5px;
            .status-now-head {
                position: relative; 
                border-bottom: 1px solid #dadada;
                padding-bottom: 20px;
                .big-font {
                    font-size: 18px;
                }
                .btns {
                    position: absolute; 
                    right: 10px;
                    top: 0;
                    button {
                        padding: 5px 12px;
                        border-radius: 5px;
                        margin-left: 14px;
                        &:first-child {
                            background: #20a0ff; 
                            border-color: #20a0ff;
                            color: #fff;
                        }

                    }
                    .cancel-btn {
                            &:hover {
                                color: #20a0ff;
                                border-color: #20a0ff;
                            }
                        }
                }
            }

            .time {
                margin-top: 30px;
            }
        }
    }

    .orderDetail-content {
        background: #fff;
        border-bottom-right-radius: 4px; 
        border-bottom-left-radius: 4px; 
        .lists {
            border-bottom: 1px solid #f5f5f5;
            .table-title{
                font-size: 12px; 
                height: 38px;
                border: {
                    top: 1px solid #dbdbdb;
                    bottom: 1px solid #dbdbdb;
                }
                .l-box {
                    background: #eee;
                    height: 38px; 
                    line-height: 38px; 
                    padding-left: 20px;
                    .fr {
                        span {
                            width: 100px;
                        }
                    }
                    .order-id {
                        color: #5079d9;
                    }
                }
            }

            .list-content {
                background: #fff;
                height: 112px; 
                .l-box {
                    padding: 10px 30px;
                    line-height: 6;
                    .fr {
                        span {
                            display: inline-block; 
                            width: 100px;
                        }
                    }
                }
                .goods-img {
                    width: 80px; 
                    height: 80px; 
                    border-radius: 4px; 
                    padding: 10px; 
                    border: 1px solid #ddd; 
                    vertical-align: middle;
                    img {
                        width: 60px; 
                        height: 60px;
                        vertical-align: top;
                    }
                }
                .order-id {
                    padding-left: 20px;
                }
            }

            
            span {
                display: inline-block; 
            }
            .table-title > .l-box {
                .order-id {
                    padding-left: 20px;
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
            .header {
                height: 38px; 
                line-height: 38px; 
                background: #eee; 
                padding-left: 20px;
                border: {
                    top: 1px solid #ddd;
                    bottom: 1px solid #ddd;
                }
                span {
                    font-size: 12px; 
                }
            }
            .content {
                // background: #fff; 
                padding: 30px; 
                line-height: 30px;
            }
        }
        
    }
</style>