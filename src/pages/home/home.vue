<template>
    <div>
        <div class="main-content w">
            <!-- 轮播图开始 -->
            <div class="swiper" @mouseenter='stop' @mouseleave='start'>
                <div class="swiper-container">
                    <div class="swiper-item">
                        <a href="#">
                            <img src="/static/images/banner01.jpeg" alt="">
                        </a>
                    </div>
                    <div class="swiper-item">
                        <a href="#">
                            <img src="/static/images/banner02.png" alt="">
                        </a>
                    </div>
                </div>
                <!-- 小圆点 -->
                <ol class="indicators">
                    <li></li>
                    <li></li>
                </ol>
                <!-- 左右箭头 -->
                <div class="arrow w">
                    <a href="#" class="iconfont icon-back" @click='prev'></a>
                    <a href="#" class="iconfont icon-more" @click='next'></a>
                </div>
            </div>
            <!-- 轮播图结束 -->

            <!-- 商品导航开始 -->
            <ul class="product-nav">
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
            <!-- 商品导航结束 -->

            <!-- 热门商品开始 -->
            <panel :title="hotTitle">
                <div slot="content">
                    <product :product="hotP"></product>
                </div>
            </panel>
            <!-- 热门商品结束 -->
            <!-- 官方精选开始 -->

            <panel :title="choiceTitle">
                <div slot="content" class="content">
                    <div class="imgbanner">
                        <img src="" v-lazy="choiceImg" alt="">
                        <a href="#" class="link-cover"></a>
                    </div>
                    <product :product="choiceP"></product>
                </div>
            </panel>
            <!-- 官方精选结束 -->
            <!-- 品牌周边开始 -->

            <panel :title="brandTitle">
                <div slot="content" class="content">
                     <div class="imgbanner">
                        <img src="" v-lazy="brandImg" alt="">
                        <a href="#" class="link-cover"></a>
                    </div>
                    <product :product="brandP"></product>
                </div>
            </panel>
            <!-- 品牌周边结束 -->
            <!-- 品牌精选开始 -->

            <panel :title="wellChosenTitle">
                <div slot="content" class="content">
                    <div class="imgbanner">
                        <img src="" v-lazy="wellChosenImg" alt="">
                        <a href="#" class="link-cover"></a>
                    </div>
                    <product :product="wellChosenP"></product>
                </div>
            </panel>
            <!-- 品牌精选结束 -->
            <!-- 商品导航开始 -->
            <ul class="product-nav">
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
            <!-- 商品导航结束 -->
        </div>
    </div>
</template>

<script>

import panel from '../components/panel.vue'

import product from '../components/product.vue'

import $ from 'jquery';

var count = 0;

    export default {
        data: function () {
            return {
                timerId: null,
                hotP: [],
                choiceP: [],
                choiceImg: '/static/images/choice.jpg',
                brandP: [],
                brandImg: '/static/images/brand01.jpg', 
                wellChosenP: [],
                wellChosenImg: '/static/images/brand02.jpg',
                hotTitle: '热门商品',
                choiceTitle: '官方精选',
                brandTitle: '品牌周边',
                wellChosenTitle: '品牌精选'

            }
        },
        created() {
            // 获取首页商品的数据
            this.getProductData();
        },
        mounted () {
            var count = 0;
            var that = this;

            var auto = function() {
                that.next();
            }
            this.timerId = setInterval(auto, 2000);
        },
        methods: {
            next() {
                var $swiper = $('.swiper-container .swiper-item');
                count++;

                if (count == $swiper.length) {
                    count = 0;
                }
                $swiper.eq(count).fadeIn().siblings().fadeOut();
            },
            prev() {
                var $swiper = $('.swiper-container .swiper-item');
                count --;
                if (count == -1) {
                    count = $swiper.length - 1;
                }
                $swiper.eq(count).fadeIn().siblings().fadeOut();
            },
            stop() {
                clearInterval(this.timerId);
            },
            start() {
                setInterval(this.auto, 3000);
            },

            // 获取首页商品的数据

            getProductData() {
                this.$http.get('../../../static/js/productData.json').then((res) => {
                    var products = res.body;
                    this.hotP = products.slice(0,4);
                    this.choiceP = products.slice(4,10);
                    console.log(this.choiceP);
                    this.brandP = products.slice(10,16);
                    this.wellChosenP = products.slice(16, 22);
                }, err => {
                    console.log(err)
                });
            }

        },
        components: {
            product,
            panel
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

    .main-content {
        overflow: hidden;
        margin-top: 20px;
        .swiper {
            position: relative;
            transition: all 0.5s ease;
            border-radius: 6px;
            overflow: hidden;
            margin-top: 20px;
        }
        .swiper-container {
            height: 460px; 
            background: #fff;
            position: relative;
            .swiper-item {
                height: 100%;
                position: absolute; 
                top: 0; 
                left: 0;
                display: none;
                img {
                    display: block; 
                    width: 100%; 
                    height: 100%;
                }
                &:first-child {
                    display: block;
                }
            }
        }
        .arrow {
            padding: 0 10px;
            position: absolute;
            transform: translateY(-50%);
            top: 50%;
            z-index: 2;
            a {
                display: block;
                width: 50px; 
                height: 50px; 
                line-height: 50px;
                border-radius: 50%;
                text-align: center;
                background: rgba(255,255,255,0.2);
                transition: all 0.5s ease;
                &:hover {
                    background: rgba(255,255,255,1);
                }
            }
            a.icon-back {
                float: left;
            }
            a.icon-more {
                float: right;
            }
        }
        .indicators {
            position: absolute; 
            bottom: 10px;
            left: 50%;
            transform: translateX(-50%);
            z-index: 2;
            > li {
                display: inline-block; 
                width: 10px; 
                height: 10px;
                border-radius: 50%;
                background: #ddd;
            }
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
        .content {
            background: #fff;
            .imgbanner {
                position: relative;
                width: 609px; 
                height: 100%; 
                float: left;
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
                        box-shadow: 1px 1px 8px 3px rgba(0,0,0,0.1) inset;
                    }
                }
            }
        }
    }
  
</style>