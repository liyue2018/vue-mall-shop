<template>
    <div>
        <!-- 排序开始 -->
        <div class="sort-box w">
            <a href="javascript:;" class="active">综合排序</a>
            <a href="javascript:;">价格从低到高</a>
            <a href="javascript:;">价格从高到低</a>
            <div class="price-interval">
                <input type="text" name="min-price" class="price" placeholder="价格" />
                <span class="line">-</span>
                <input type="text" name="max-price" class="price" placeholder="价格" />
                <button type="button" class="sure-btn">确定</button>
            </div>
        </div>
        <!-- 排序结束 -->
        <div class="goods w">
            <product :product='goodsList'></product>
        </div>
    </div>
</template>

<script>
import product from '../components/product.vue';
    export default {
        data: function() {
            return {
                goodsList: []
            }
        },
        created() {
            this.getAllGoods();
        },
        methods: {
            // 获取商品数据

            getAllGoods() {
                this.$http.get('../../../static/js/productData.json').then((res) => {
                    this.goodsList = res.body;
                }, err => {
                    console.log(err)
                })
            }
        },
        components: {
            product
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .sort-box {
        font-size: 12px; 
        height: 70px; 
        line-height: 70px; 
        padding-left: 10px;
        // margin-top: 20px;
        a {
            color: #999;
            display: inline-block; 
            padding-right: 30px; 
            float: left;
        }
        a.active {
            color: #5683ea;
        }
        .price-interval {
            input.price {
                width: 80px; 
                padding: 6px 0; 
                border: 1px solid #ddd; 
                border-radius: 5px; 
                text-align: center; 
                background: transparent;
                &::-webkit-input-placeholder {
                    color: #c3c3c3;
                }
                &::-moz-placeholder {
                    color: #c3c3c3;
                }
            }
            span.line {
                padding: 0 2px; 
                color: #333;
            }
            button.sure-btn {
                display: inline-block; 
                width: 80px; 
                background: #678ee7; 
                padding: 4px 0; 
                color: #fff;
                border-radius: 5px;
                border-color: #678ee7;
                margin-left: 10px;
            }

        }
    }

    .goods {
        overflow: hidden;
        padding: 7px 0;
        background: #fff;
        border-radius: 5px;
        .product-box {
            height: 430px;
            float: left;
            border: 1px solid #efefef;
        }
    }
</style>