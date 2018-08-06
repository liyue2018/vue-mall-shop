<template>
    <div>
        <!-- <div class="loading" v-if="loading">
            Loading...
        </div>
        <div v-if="error" class="error">
            {{ error }}
        </div> -->
        <!-- 排序开始 -->
        <div class="sort-box w">
            <a href="javascript:;" :class="{active:sortType===1}" @click="reset">综合排序</a>
            <a @click.prevent='sortByPrice(1)' :class="{active:sortType===2}">价格从低到高</a>
            <a href="javascript:;" @click.prevent="sortByPrice(-1)" :class="{active:sortType===3}">价格从高到低</a>
            <div class="price-interval">
                <input type="number" name="min-price" class="price" placeholder="价格" v-model="minPrice" @keyup="inputValueChange" />
                <span class="line">-</span>
                <input type="number" name="max-price" class="price" placeholder="价格" v-model="maxPrice" @keyup="inputValueChange" />
                <button type="button" class="sure-btn" @click="makeSure" :disabled="isDisabled" :class="{disabled: isDisabled}">确定</button>
                <span>&nbsp;&nbsp;为您搜索价格范围内 <em>{{ goodsList | filterPrice(minPrice, maxPrice) | filterLength }}</em> 件商品</span>
            </div>
        </div>
        <!-- 排序结束 -->
        <div v-if="goodsList.length != 0">
            <!-- 综合排序 -->
            <div class="goods w">
                <product :product="goodsList" v-if="sort === 0"></product>
            </div>
            <!-- 价格从低到高 -->
            <div class="goods w">
                <product :product='goodsList1' v-if="sort === 1"></product>
            </div>
            <!-- 价格从高到低 -->
            <div class="goods w">
                <product :product='goodsList2' v-if="sort === -1"></product>
            </div>

            <!-- 价格范围内排序 -->
            <div class="goods w">
                <product :product="goodsList | filterPrice(minPrice, maxPrice)" v-if="sort === -2"></product>
            </div>
        </div>
        <!-- 正在加载商品信息时 -->
        <div class="goods no-product w" v-show="showFlag">
            <img src="/static/images/no-search.png" alt="加载失败了" />
            <h6>正在努力加载商品信息...</h6>
        </div>
        <!-- 没有搜索到价格范围内的商品信息时 -->
        <!-- <div class="goods no-product w">
            <img src="/static/images/no-search.png" alt="加载失败了" />
            <h6>没有搜索到价格 <em>{{ minPrice }}</em> 到 <em>{{ maxPrice }}</em> 范围内的商品信息...</h6>
        </div> -->
    </div>
</template>

<script>
import product from '../components/product.vue';
    export default {
        data: function() {
            return {
                loading: true,
                error: null,
                goodsList: [],
                sortType: 1,
                sort: 0,
                minPrice: '',
                maxPrice: '', 
                showFlag: false,
                isDisabled: true
            }
        },
        computed: {
            goodsList1: function() {
                return this.sortPriceToHigh (this.goodsList, 'productPrice')
            },
            goodsList2: function() {
                return this.sortPriceToLow (this.goodsList, 'productPrice')
            }
        },
        filters: {
            filterPrice: function (value, min, max) {
                let newList = [];

                if (!min || !max) {
                    return value;
                }

                if (max - min < 0 || max === min) {
                    return value;
                }

                value.forEach ( item => {

                    if (item.productPrice > min && item.productPrice < max) {
                        newList.push(item);
                        return true;
                    }
                })

                if (newList.length === 0) {
                    return value;
                }

                return newList;
            },
            filterLength: function (value) {
                return value.length;
            }
        },
        created() {
            this.getAllGoods();
        },
        beforeUpdate() {
        },
        methods: {

            // 获取商品数据
            getAllGoods() {
                var that = this;

                if (this.goodsList.length === 0) {
                    this.showFlag = true;
                }

                this.$axios.get('/products').then(function (res) {
                    that.loading = false;
                    console.log('success');
                    that.showFlag = false;
                    that.goodsList = res.data.data;
                }).catch(function (err) {
                    console.log('error' + err);
                    that.showFlag = false;
                })
            },

            // 价格排序
            sortByPrice (v) {
                v === 1 ? this.sortType = 2 : this.sortType = 3;
                this.sort = v ;
                this.minPrice = this.maxPrice = '';
            },

            // 重置
            reset() {
                this.sortType = 1;
                this.sort = 0;
                this.minPrice = this.maxPrice = '';
            },

            // 点击确认按钮
            makeSure() {
                this.sort = -2; 
                this.sortType = '';
                this.isDisabled = true;
            },

            // 输入框的值改变时，执行
            inputValueChange() {

                if (this.minPrice && this.maxPrice && this.maxPrice - this.minPrice > 0) {
                    this.isDisabled = false;
                }
            },

            // 价格从低到高排序
            sortPriceToHigh (array, key) {
                return array.sort(function (a, b) {
                    var x = a[key];
                    var y = b[key];
                    return ((x < y) ? -1 : (x > y) ? 1 : 0);
                });
            },

            // 价格从高到低排序
            sortPriceToLow (array, key) {
                return array.sort(function (a, b) {
                    var x = a[key];
                    var y = b[key];
                    return ((x > y) ? -1 : (x < y) ? 1 : 0);
                });
            }
        },
        components: {
            product
        }
    }
    // 价格从低到高排序

    // function sortPriceToHigh (key) {
    //     return function (a, b) {
    //         var x = a[key], 
    //             y = b[key]; 

    //         if (x < y) {
    //             return -1; 
    //         } else if (x > y) {
    //             return 1;
    //         } else {
    //             return 0;
    //         }
    //     }
    // }
    // function sortPriceToHigh (array, key) {
    //     return array.sort(function (a, b) {
    //         var x = a[key];
    //         var y = b[key];
    //         return ((x < y) ? -1 : (x > y) ? 1 : 0);
    //     });
    // }
    // // 价格从高到低排序
    // function sortPriceToLow (array, key) {
    //     return array.sort(function (a, b) {
    //         var x = a[key];
    //         var y = b[key];
    //         return ((x > y) ? -1 : (x < y) ? 1 : 0);
    //     });
    // }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .sort-box {
        font-size: 12px; 
        height: 70px; 
        line-height: 70px; 
        padding-left: 10px;
        a {
            color: #999;
            display: inline-block; 
            padding-right: 30px; 
            float: left;
            cursor: pointer
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
            .down-disabled {
                cursor: not-allowed; 
                opacity: 0.7;
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
            .disabled {
                opacity: 0.5; 
                cursor: not-allowed;
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

    .no-product {
        text-align: center; 
        font-size: 16px; 
        color: #ddd;
        padding: 40px 0;
        img {
            width: 300px; 
            height: 260px;
            margin-bottom: 20px;
        }
    }
</style>