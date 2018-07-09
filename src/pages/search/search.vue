<template>
    <div>
        <div class="search-result">
            <p class="w">
                <em>搜索结果</em>共为您找到<em>{{ productLength }}</em>款商品
            </p>

        </div>
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
        <div class="goods w" v-show="showFlag">
            <product :product='goodsList'></product>
        </div>

         <!-- 为您推荐开始 -->
        <div v-show="!showFlag" class="w">
            <div class="no-product">
                <img src="/assets/images/no-search.png" alt="">
                <h3>抱歉！没有为您找到相关的商品</h3>
            </div>
            <panel :title="recommendtitle">
                <ul slot="content" class="product-nav">
                    <li class="item">
                        <img src="/static/images/product-nav01.jpg" alt="">
                        <a href="#">
                        </a>
                    </li>
                    <li class="item">
                        <img src="/static/images/product-nav02.jpg" alt="">
                        <a href="#">
                        </a>
                    </li>
                    <li class="item">
                        <img src="/static/images/product-nav03.png" alt="">
                        <a href="#">
                        </a>
                    </li>
                    <li class="item">
                        <img src="/static/images/product-nav04.jpg" alt="">
                        <a href="#">
                        </a>
                    </li>
                </ul>
            </panel>
        </div>
        <!-- 为您推荐结束 -->

    </div>
</template>

<script>
import mallHeader from '../common/header.vue'
import mallFooter from '../common/footer.vue'
import product from '../components/product.vue';
import panel from '../components/panel.vue'
    export default {
        data: function() {
            return {
                goodsList: [],
                keywords: '',
                productLength: 0,
                showFlag: true,
                recommendtitle: "为您推荐"
            }
        },
        created() {
            this.searchResult();
        },
        mounted() {
        },
        methods: {
            // 获取商品数据

            getAllGoods() {
                this.$http.get('../../../static/js/productData.json').then((res) => {
                    var newList = [];
                    this.goodsList = res.body;
                    this.goodsList.forEach(item => {
                            if (item.productName.indexOf(this.keywords) != -1) {
                                newList.push(item)
                        }
                    });
                    this.goodsList = newList;
                    this.productLength = newList.length;

                    // var showFlag;


                    if (this.productLength != 0) {
                        this.showFlag = true;

                    }

                    if (this.productLength == 0) {
                        this.showFlag = false
                    }
                }, err => {
                    console.log(err)
                });
            },
            getKeyWords() {
                this.keywords = this.$route.query.key;
            },

            searchResult() {
                this.getKeyWords();
                this.getAllGoods();
            }
        },
        components: {
            mallHeader,
            mallFooter,
            product,
            panel
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .search-result {
        background: #fff; 
        height: 50px; 
        line-height: 50px; 
        padding-left: 15px;
        box-shadow: 0 -1px 6px 1px rgba(0,0,0,.1);
        em {
            font-weight: 700;
            padding: 0 5px;
        }
    }
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

    .no-product {
        text-align: center; 
        padding: 100px 0; 
        font-size: 20px;
    }

    .product-nav {
            height: 200px;
            margin: 30px 0;
            border: 1px solid #ddd;
            border-radius: 6px;
            overflow: hidden;
            .item {
                float: left; 
                width: 25%; 
                height: 100%;
                position: relative;
                img {
                        width: 100%; 
                        height: 100%;
                    }
                > a {
                    height: 100%;
                    width: 100%;
                    display: block;
                    position: absolute; 
                    top: 0; 
                    left: 0;
                    border-right: 1px solid #ddd;
                    &:hover {
                        box-shadow: 1px 1px 8px 2px rgba(0,0,0,.1) inset;
                    }
                }
            }

        }

</style>