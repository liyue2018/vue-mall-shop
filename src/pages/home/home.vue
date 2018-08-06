<template>
    <div>
        <div class="main-content w">
            <!-- 轮播图开始 -->
                <swiper :options="swiperOption" ref="homeSwiper" class="home-swiper">
                    <!-- slides -->
                    <swiper-slide v-for="(item, index) in swiperItems" :key="index">
                        <img :src="item.src" alt="" />
                    </swiper-slide>
                    <!-- Optional controls -->
                    <div class="swiper-pagination"  slot="pagination"></div>
                    <div class="swiper-button-prev" slot="button-prev"></div>
                    <div class="swiper-button-next" slot="button-next"></div>
                </swiper>
            <!-- 轮播图结束 -->

            <!-- 商品导航开始 -->
            <ul class="product-nav">
                <li class="item" v-for="(item, i) in navList" :key="i">
                    <img :src="item.img" alt="">
                    <a :href="item.url">
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
                <li class="item" v-for="(item, i) in navList" :key="i">
                    <img :src="item.img" alt="">
                    <a :href="item.url">
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
import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import $ from 'jquery';
import '../../mock/banner-mock.js'


var count = 0;

export default {
    data: function() {
        return {
            timerId: null,
            hotP: [],
            choiceP: [],
            choiceImg: 'static/images/choice.jpg',
            brandP: [],
            brandImg: 'static/images/brand01.jpg', 
            wellChosenP: [],
            wellChosenImg: 'static/images/brand02.jpg',
            hotTitle: '热门商品',
            choiceTitle: '官方精选',
            brandTitle: '品牌周边',
            wellChosenTitle: '品牌精选',
            bannerList:[],
            navList: [],
            swiperOption: {
                notNextTick: true,
                loop: true,
                autoplay: true,
                speed: 1000,
                grabCursor: true,
                observeParents: true,
                debugger: true,
                pagination: {
                    el: '.swiper-pagination',
                },
                paginationClickable: true,
                navigation: {
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev'
                }
            },
            swiperItems: [
                { src: "/static/images/R1PC1.png" },
                { src: "/static/images/pro2tebieban1.png" },
                { src: "/static/images/20180802244011081.png" },
            ]
        }
    },
    computed: {
        swiper() {
            return this.$res.homeSwiper.swiper
        }
    },
    created() {

        // 获取首页商品的数据
        this.getProductData();
        this.getBannerImg();
        this.getNavImg ();
    },
    mounted() {},
    methods: {

        // 获取首页商品的数据
        getProductData() {
            var that = this

            // axios请求
            this.$axios.get('/products').then(function (res) {
            // this.$axiox.default
            // this.$axios({
            //     method: 'get',
            //     // data: json,
            //     // dataType: 'jsonp',
            //     baseURL: '/api',
            //     url: '/7568/productData'
            // }).then(function (res) {
                console.log('连接成功')
                var products = res.data.data 
                that.hotP = products.slice(0,4);
                that.choiceP = products.slice(4,10);
                that.brandP = products.slice(10,16);
                that.wellChosenP = products.slice(16, 22);
            })
            .catch(function (err) {
                console.log('连接失败' + err);
            })
        },

        // 获取轮播图
        getBannerImg() {
            var that = this

            this.$axios.get('/bannerImg').then(function (res) {
                console.log('success');
                that.bannerList = res.data.data;
            }).catch(function (err) {
                console.log('error' + err);
            })
        },

        //获取商品导航的图片
        getNavImg() {
            var that = this; 
            this.$axios.get('/navImg').then(function (res) {
                console.log('success');
                that.navList = res.data.data;
            }).catch(function (err) {
                console.log('error' + err);
            })
        }
    },
    components: {
        product,
        panel, 
        swiper,
        swiperSlide
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
        .home-swiper {
            height: 460px;
            border: 1px solid #ddd;
            border-radius: 5px;
                img {
                    width: 100%;
                    height: 460px;
                    transform: scaleY(1.1);
                }
            .swiper-pagination {
                span {
                    width: 10px;
                    height: 10px;
                }
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