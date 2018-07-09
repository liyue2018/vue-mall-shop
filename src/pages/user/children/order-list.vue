<template>
    <panel :title="orderListTit">
        <div slot="content" class="orderList-content">
            <div class="lists">
                <div class="table-title">
                    <div class="l-box">
                        <span class="date">2018-06-27 18:57</span>
                        <span class="order-id">订单号: 153009703723327</span>
                        <div class="fr">
                            <span class="price">单价</span>
                            <span class="num">数量</span>
                            <span class="operation">商品操作</span>
                        </div>
                    </div>
                    <div class="r-box">
                        <span class="sub-total">实付金额</span>
                        <router-link to="/user/orderDetail" class="order-detail">查看详情 ></router-link>
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
                            <span class="operation">删除此订单</span>
                        </div>
                    </div>
                    <div class="r-box">
                        <span class="sub-total">￥ 1.00</span>
                        <a href="javascript:;" class="order-btn">现在付款</a>
                    </div>
                </div>
            </div>
            <div class="lists">
                <div class="table-title">
                    <div class="l-box">
                        <span class="date">2018-06-27 18:57</span>
                        <span class="order-id">订单号: 153009703723327</span>
                        <div class="fr">
                            <span class="price">单价</span>
                            <span class="num">数量</span>
                            <span class="operation">商品操作</span>
                        </div>
                    </div>
                    <div class="r-box">
                        <span class="sub-total">实付金额</span>
                        <router-link to="/user/orderDetail" class="order-detail">查看详情 ></router-link>
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
                            <span class="operation">删除此订单</span>
                        </div>
                    </div>
                    <div class="r-box">
                        <span class="sub-total">￥ 1.00</span>
                        <span>支付审核中</span>
                    </div>
                </div>
            </div>
            <div class="lists">
                <div class="table-title">
                    <div class="l-box">
                        <span class="date">2018-06-27 18:57</span>
                        <span class="order-id">订单号: 153009703723327</span>
                        <div class="fr">
                            <span class="price">单价</span>
                            <span class="num">数量</span>
                            <span class="operation">商品操作</span>
                        </div>
                    </div>
                    <div class="r-box">
                        <span class="sub-total">实付金额</span>
                        <router-link to="/user/orderDetail" class="order-detail">查看详情 ></router-link>
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
                            <span class="operation">删除此订单</span>
                        </div>
                    </div>
                    <div class="r-box">
                        <span class="sub-total">￥ 1.00</span>
                        <span>交易关闭</span>
                    </div>
                </div>
            </div>
        </div>
    </panel>
</template>

<script>
    import panel from '../../components/panel.vue'
    export default {
        data: function() {
            return {
                orderListTit: '我的订单'
            }
        },
        components: {
            panel
        }
    }
</script>


<style lang="scss" rel="stylesheet/scss" scoped>

    .orderList-content {
        .lists {
            .table-title{
                font-size: 12px; 
                height: 38px;
                border: 1px solid #ddd;
                border-width: 0 1px 0 1px;
                .l-box {
                    width: 760px;
                    float: left;
                    background: #eee;
                    height: 38px; 
                    line-height: 38px; 
                    padding-left: 20px;
                    border-right: 1px solid #ddd;
                    .fr {
                        span {
                            width: 100px;
                        }
                    }
                    .order-id {
                        color: #5079d9;
                    }
                }
                .r-box {
                    background: #eee; 
                    width: 228px;
                    height: 38px;
                    line-height: 38px; 
                    float: left;
                    text-align: center;
                    .sub-total, .order-detail {
                        display: inline-block;
                        width: 49%;
                    }
                }
            }

            .list-content {
                background: #fff;
                height: 112px; 
                position: relative;
                .l-box {
                    width: 760px;
                    float: left;
                    overflow: hidden;
                    height: 100%; 
                    border-right: 1px solid #f3f3f3;
                    padding: 10px 30px;
                    line-height: 6;
                    .fr {
                        span {
                            display: inline-block; 
                            width: 100px;
                        }
                    }
                }
                .r-box {
                    position: absolute;
                    right: 0;
                    width: 228px;
                    line-height: 8;
                    .sub-total {
                        display: inline-block; 
                        width: 50%;
                        text-align: center;
                    }

                    .order-btn {
                        background: #20a0ff; 
                        border: 1px sloid #20a0ff;
                        color: #fff; 
                        padding: 4px 10px;
                        border-radius: 4px;
                    }
                }
                .goods-img {
                    width: 80px; 
                    height: 80px; 
                    line-height: 80px;
                    border-radius: 4px; 
                    border: 1px solid #ddd; 
                    text-align: center;
                    img {
                        width: 60px; 
                        height: 60px;
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
        
    }
</style>