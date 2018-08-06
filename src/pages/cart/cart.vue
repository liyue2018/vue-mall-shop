<template>
    <div>
        <mall-header class="cart-header"></mall-header>
        <div class="shopping-list w">
            <h2 class="title">购物清单</h2>
            <div v-if="$store.getters.getAllCount != 0">
                <div class="list-header">
                    <span class="name">商品信息</span>
                    <p class="fr">
                        <span>单价</span>
                        <span>数量</span>
                        <span>小计</span>
                        <span>操作</span>
                    </p>
                </div>
                <div class="cart-table" v-for="(item,i) in goodsList" :key="item.id">
                    <div class="items-choose">
                        <div>
                            <input type="checkbox" ref="checkbox" name="" class="selected" :checked="item.selected" @change="selectedChanged(item.id,i)" />
                        </div>
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
                            <buynum :initcount="$store.getters.getGoodsCount[item.id]" :goodsId="item.id"></buynum>
                        </div>
                        <div>￥{{ item.count * item.productPrice }}</div>
                        <div>
                            <a href="javascript" class="iconfont icon-wrong items-del-btn" @click.prevent="delCarGoods(item.id, i)"></a>
                        </div>
                    </div>
                </div>
                <div class="cart-bottom clearfix">
                    <div class="fl all-check-box">
                        <input type="checkbox" name="" class="selected" :checked="allSelected" @click="checkedAll">
                        <label>全选</label>
                        <a href="javascript:;" class="delete-choose-goods">删除选中的商品</a>
                    </div>
                    <div class="fr shopping">
                        <div class="shopping-total shopping-num">
                            <h4 class="">已选择 <span class="num">{{ $store.getters.getTotal.count }}</span> 件商品</h4>
                            <h6 class="shopping-tips">共计 {{ $store.getters.getAllCount }} 件商品</h6>
                        </div>
                        <div class="shopping-total shopping-price">
                            <h4 class="">应付总额: <span class="price">￥{{ $store.getters.getTotal.amount }}</span></h4>
                            <h6 class="shopping-tips">应付总额不含运费</h6>
                        </div>
                        <div class="fl">
                            <router-link to="/checkout">
                                <input type="button" readonly="readonly" value="现在结算" name="" class="now-buy-btn" />
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="$store.getters.getAllCount == 0">
                <div class="no-goods">
                    <img src="/static/images/cart-empty.png" alt="" />
                    <p>你的购物车空空如也</p>
                    <router-link to="/goods" tag="a" class="go-buy-btn">现在选购</router-link>
                </div>
            </div>
        </div>
        <mall-footer></mall-footer>
    </div>
</template>

<script>
    import mallHeader from '../common/header.vue'
    import mallFooter from '../common/footer.vue'
    import buynum from '../components/buynum.vue'

    export default {
        data: function() {
            return {
                goodsList: '',
                allSelected: this.$store.getters.goodsPerSelected
            }
        },
        created() {
            this.getGoodsList();
        },
        methods: {
            getGoodsList() {
                this.goodsList = this.$store.state.car;
            },

            // 删除购物车中的商品
            delCarGoods (id, index) {
                this.goodsList.splice(index,1);
                this.$store.commit('removeFormCar',id);
            },
            
            selectedChanged (id, i) {
                var goodsSelected = { 
                    id: id, 
                    selected: this.$refs.checkbox[i].checked 
                };

                // 更新仓库里 购物车选中的状态
                this.$store.commit ('updateSelected', goodsSelected);

                // 当购物车商品的选中状态改变时，检测全选状态
                this.allSelected = this.$store.getters.goodsPerSelected;
            },

            // 全选
            checkedAll() {

                var that = this,
                    goodschecked;

                this.allSelected = !this.allSelected;

                this.goodsList.forEach (item => {
                    item.selected = that.allSelected;
                });

                this.$refs.checkbox.checked = this.allSelected;
                goodschecked = this.$refs.checkbox.checked;
                this.$store.commit('updateSelected', goodschecked);
            }
        },
        components: {
            "mall-header": mallHeader,
            "mall-footer": mallFooter,
            "buynum": buynum
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .cart-header {
        height: 100px;
        .nav {
            opacity: 0;
            height: 0 !important;
        }
        .cart-box.slide {
            z-index: -1 !important;
        }
    }
    .shopping-list {
        margin-top: 30px;
        z-index: 5;
        position: relative;
        padding-bottom: 91px;
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
        .list-header {
            height: 38px; 
            line-height: 38px; 
            font-size: 12px;
            color: #838383;
            background: #eee;
            padding-left: 50px;
            border: {
                left: 1px solid #dbdbdb;
                right: 1px solid #dbdbdb;
            }
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
        .cart-table {
            height: 140px; 
            line-height: 6;
            background: #fff;
            padding-top: 26px;
            padding-left: 26px;
            .items-choose {
                float: left;
                >div {
                    float: left;
                }
                .selected {
                    transition: all 0.5 ease;
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
            height: 90px; 
            padding: 20px;
            width: 100%;
            background: #fdfdfd;
            background: linear-gradient(#fdfdfd,#f9f9f9);
            border: 1px solid #e9e9e9; 
            box-shadow: 0 -4px 10px 1px rgba(0, 0, 0, 0.06);
            border-radius: 5px;
            position: absolute; 
            bottom: 0;
            .all-check-box {
                padding-top: 12px;
                .delete-choose-goods {
                    color: #bbb;
                    font-size: 12px;
                    padding-left: 10px;
                }

            }
            .shopping {
                .shopping-total {
                    width: 170px;
                    color: #323232; 
                    line-height: 1.4285;
                    font-size: 16px;
                    float: left;
                    .shopping-tips {
                        color: #959595;
                        font-size: 12px;
                    }
                }
                .shopping-num {
                    text-align: right;
                    padding-right: 20px; 
                    border-right: 1px solid #e1e1e1;
                    .num {
                        color: #d44d44; 
                        padding: 0 6px;
                        font-size: 20px; 
                        font-weight: 500;
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

                }
            }
        }
    }

    .no-goods {
        background: #fff; 
        padding: 60px 0; 
        text-align: center; 
        color: rgb(141, 141, 141);
        border-radius: 0 0 5px 5px;
        border: 1px solid #ddd;
        p {
            font-weight: bold;
            font-size: 16px;
            margin: 20px 0;
        }
        .go-buy-btn {
            display: inline-block; 
            width: 120px; 
            text-align: center; 
            padding: 6px 0; 
            border: 1px solid #ddd; 
            border-radius: 5px;
            color: #666;
            &:hover {
                background: #f5f4f4;
            }
        }
    }
</style>