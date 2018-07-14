<template>
    <div>
        <div class="search-result">
            <p class="w">
                <em>搜索结果</em>共为您找到<em>{{ productLength }}</em>款商品
            </p>

        </div>
        <!-- 排序开始 -->
        <!-- <div class="sort-box w">
            <a href="javascript:;" class="active">综合排序</a>
            <a href="javascript:;">价格从低到高</a>
            <a href="javascript:;">价格从高到低</a>
            <div class="price-interval">
                <input type="text" name="min-price" class="price" placeholder="价格" />
                <span class="line">-</span>
                <input type="text" name="max-price" class="price" placeholder="价格" />
                <button type="button" class="sure-btn">确定</button>
            </div>
        </div> -->
        <!-- 排序结束 -->

        <!-- 进入搜索页面时 -->
        <div class="loading" v-show="isLoad">
            <img src="static/images/error.png" alt="">
            <h3>正在努力加载中...</h3>
        </div>
        <!-- 搜索结果 -->
        <div class="goods w" v-show="showFlag">
            <product :product='goodsList'></product>
        </div>

         <!-- 为您推荐开始 -->
        <div v-show="!showFlag" class="w">
            <div class="no-product">
                <img src="static/images/no-search.png" alt="">
                <h3>抱歉！没有为您找到相关的商品</h3>
            </div>
            <panel :title="recommendtitle">
                <ul slot="content" class="product-nav">
                    <li class="item" v-for="(item, index) in navList" :key="index">
                        <img :src="item.img" alt="">
                        <a :href="item.url">
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
                // keywords: '',
                productLength: 0,
                showFlag: true,
                recommendtitle: "为您推荐",
                navList: [],
                isLoad: false
            }
        },
        filters: {
        },
        computed: {
            resultGoodsList: function () {
                return this.$store.state.keywords
            }
        },
        watch: {
            resultGoodsList (newValue, oldValue) {
                var that = this
                this.$axios.get('/products').then(function (res) {
                    console.log('success')
                    that.goodsList = res.data.data
                    var searchResultChangeList = []
                    // 循环商品数组，得到包含关键字的新数组
                    that.goodsList.forEach(item => {
                        if (item.productName.indexOf(newValue) != -1) {
                            searchResultChangeList.push(item)
                            return true
                        }
                        return searchResultChangeList
                    })
                    that.goodsList = searchResultChangeList
                    that.productLength = that.goodsList.length

                    if (that.productLength != 0) {
                        that.showFlag = true;
                    }
                    if (that.productLength == 0) {
                        that.showFlag = false
                    }
                    that.isLoad = false
                    return that.goodsList
                }).catch(function (err) {
                    console.log('error' + err)
                })
            }
        },
        created() {
            this.beforeLoad ()
            this.searchResult()
            this.getNavImg ()
        },
        mounted() {
        },
        beforeUpdate () {
        },
        methods: {
            // 获取商品数据

            // getAllGoods() {
            //     var that = this
            //     this.$axios.get('/products').then(function (res) {
            //         console.log('success')
            //         that.goodsList = res.data.data
            //     }).catch(function (err) {
            //         console.log('error' + err)
            //     })
            // },
            searchResult() {
                var that = this
                this.$axios.get('/products').then(function (res) {
                    that.goodsList = res.data.data 
                    var searchResultList = []
                    that.goodsList.forEach(item => {
                        if (item.productName.indexOf(that.$store.state.keywords) != -1) {
                            searchResultList.push(item)
                            return true
                        }
                        return searchResultList
                    })
                    that.goodsList = searchResultList || []
                    that.productLength = that.goodsList.length
                    that.isLoad = false
                    // that.searchResultLength (that.productLength)
                    if (that.productLength != 0) {
                        that.showFlag = true;
                    }
                    if (that.productLength == 0) {
                        that.showFlag = false
                    }
                    return that.goodsList

                }).catch (function (err) {
                    console.log('error' +err)
                })
            },
            //获取商品导航的图片

            getNavImg () {
                var that = this 
                this.$axios.get('/navImg').then(function (res) {
                    console.log('success')
                    that.navList = res.data.data
                }).catch(function (err) {
                    console.log('error' + err)
                })
            },

            // // 判断搜索结果的长度

            // searchResultLength (len) {
            //     if (that.len != 0) {
            //         that.showFlag = true;
            //     }
            //     if (that.len == 0) {
            //         that.showFlag = false
            //     }
            // },

            // 显示正在加载提示
            beforeLoad () {
                this.isLoad = true
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

    .no-product, .loading {
        text-align: center; 
        padding: 100px 0; 
        font-size: 20px;
        height: 500px;
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