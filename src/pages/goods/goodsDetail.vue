<template>
    <div class="goods-detail w">
        <div class="goods-panel clearfix">
            <div class="img-box">
                <ul class="small-img" ref="imgList">
                    <li class="item on" v-for="(item, index) in imgLists" :key="index" ref="imgItem" @click="getSmallImg(item.src)">
                        <img :src="item.src" :alt="item.alt" :title="item.alt" />
                    </li>
                </ul>
                <div class="big-img">
                    <img :src="bigImgUrl" ref="bigImgUrl" alt="">
                </div>
            </div>
            <div class="info-box">
                <div class="goods-info">
                    <h4 class="name">{{ product.productName }}</h4>
                    <h6 class="title">
                        <span>{{ product.productTitle }}</span>
                        <span class="price">￥<i>{{ product.productPrice }}</i></span>
                    </h6>
                </div>
                <div class="buy-num">
                    <span>数量</span>
                    <buynum style="margin-left: 50px" @getcount="getBuyNum"></buynum>
                </div>
                <div class="buttons">
                    <y-button text="加入购物车"
                              style="margin: 0 5px"
                              classStyle="main-btn"
                              @btnClick="addToShopCar(product.id, product.productName, product.productPrice, product.productImgUrl)"
                              >
                    </y-button>
                    <y-button text="现在购买"></y-button>
                </div>

                <!-- 加入购物车动画 -->
                <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @afterEnter="afterEnter">
                    <div class="ball" v-show="ballFlag"></div>
                </transition>
            </div>
        </div>
        <!-- 产品信息 -->
        <div class="item-info">
            <h4 class="title">产品信息</h4>
            <div class="product-detail-img">
                <img src="" v-lazy="product.productDetailImg" alt="">
            </div>
        </div>
    </div>
</template>

<script>

    // import $ from 'jquery'
    import buynum from '../components/buynum.vue'
    import YButton from "../components/button.vue"
    export default {
        data: function() {
            return {
                bigImgUrl: '',
                product:'',
                ballFlag: false,
                buyNum: 1,
                imgLists: [
                    { src: "static/images/product-detail01.jpg", alt: "详情图片1" },
                    { src: "static/images/product-detail02.jpg", alt: "详情图片2" },
                    { src: "static/images/product-detail03.jpg", alt: "详情图片3" },
                    { src: "static/images/product-detail04.jpg", alt: "详情图片4" },
                    { src: "static/images/product-detail05.jpg", alt: "详情图片5" },
                ]
            }
        },
        created() {

            // 获取本地存储中的商品信息
            this.getLocalProduct();
        },
        mounted() {
            // this.changeImg();
        },
        methods: {

            // 点击小图片切换对应的大图片
            getSmallImg(src) {
                this.bigImgUrl = src;
            },
            getLocalProduct() {

                // 从本地请求商品数据
                this.product = JSON.parse(localStorage.getItem('products'));
                this.bigImgUrl = this.product.productImgUrl;
            }, 

            // 加入购物车效果
            // addCart (id, price, name, img) {
            //     if (!this.showMoveImg) {     // 动画是否在运动
            //       if (this.login) { // 登录了 直接存在用户名下
            //         addCart({userId: getStore('userId'), productId: id, productNum: 1}).then(res => {
            //           // 并不重新请求数据
            //           this.ADD_CART({productId: id, salePrice: price, productName: name, productImg: img})
            //         })
            //       } else { // 未登录 vuex
            //         this.ADD_CART({productId: id, salePrice: price, productName: name, productImg: img})
            //       }
            //       // 加入购物车动画
            //       var dom = event.target
            //       // 获取点击的坐标
            //       let elLeft = dom.getBoundingClientRect().left + (dom.offsetWidth / 2)
            //       let elTop = dom.getBoundingClientRect().top + (dom.offsetHeight / 2)
            //       // 需要触发
            //       this.ADD_ANIMATION({moveShow: true, elLeft: elLeft, elTop: elTop, img: img})
            //       if (!this.showCart) {
            //         this.SHOW_CART({showCart: true})
            //       }
            //     }
            //   }
            // },
            addToShopCar(id, name, price, img) {
                this.ballFlag = !this.ballFlag;
                
                var goodsinfo = { 
                                  id: id, 
                                  productName: name, 
                                  productPrice: price,
                                  productImgUrl: img,
                                  count: this.buyNum,
                                  selected: true
                              }
                this.$store.commit("addToCar", goodsinfo);
            },
            
            beforeEnter (el) {
                el.style.transform = "translate(0,0)";
            },
            enter (el, done) {
                el.offsetWidth;
                el.innerHTML = this.buyNum;

                // 获取小球的位置
                const ballPosition = el.getBoundingClientRect();

                // 获取购物车徽标位置
                const bagePosition = document.getElementById('bage').getBoundingClientRect();

                // 计算小球移动的距离
                const xDist = bagePosition.right - ballPosition.right; 
                const yDist = bagePosition.top - ballPosition.top;

                // 偏移的距离
                el.style.transform = `translate(${xDist}px,${yDist}px)`;
                el.style.transition = "all 1s cubic-bezier(.4,-0.3,1,.68)";
                done();
            },
            afterEnter (el) {
                this.ballFlag = !this.ballFlag;
            },

            // 加入购物车的数量
            getBuyNum (count) {
                this.buyNum = count;
            }
        },
        components: {
            buynum,
            YButton
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .goods-detail {
        overflow: hidden;
        margin: 20px auto 50px;
    }
    .goods-panel {
        height: 600px;
        border: 1px solid #cdcdcd;
        border-radius: 5px; 
        background: #fff; 
        padding: 60px;
        .img-box {
            float: left;
            height: 460px;
            .small-img {
                width: 80px;
                float: left;
                .item {
                    width: 80px; 
                    height: 80px; 
                    line-height: 80px;
                    border-radius: 5px; 
                    border: 1px solid rgba(0,0,0,.06); 
                    margin-bottom: 10px;
                    text-align: center;
                    cursor: pointer;
                    img {
                        width: 54px; 
                        height: 54px;
                        vertical-align: middle;
                    }

                }
                .item.on {
                    border: 3px solid rgba(0,0,0,.2);
                }

            }
            .big-img {
                width: 440px; 
                height: 440px;
                margin-left: 100px; 
                img {
                    width: 100%; 
                    height: 100%;
                }
            }
        }
        .info-box {
            margin-left: 560px;
            width: 450px;
            .goods-info {
                padding-bottom: 20px; 
                border-bottom: 1px solid #ddd;
                .name {
                    font-size: 24px;
                    color: #333;
                    font-weight: normal; 
                    margin-bottom: 10px;
                }
                .title {
                    color: #dbdbdb;
                    width: 430px;
                    font-size: 14px;
                    font-weight: normal;
                    position: relative;
                    .price {
                        color: #d44d44;
                        font-weight: 700;
                        position: absolute; 
                        right: 0;
                        i {
                            font-size: 20px; 
                        }
                    }
                }
            }
            .buy-num {
                position: relative; 
                margin: 30px 0;
                span {
                    position: absolute; 
                    left: 0; 
                    top: 2px; 
                    color: #999;
                }
            }
            .buttons {
                padding-top: 30px; 
                border-top: 1px solid #ddd;
                // input[type='button'] {
                //     display: inline-block; 
                //     width: 145px; 
                //     height: 50px; 
                //     line-height: 50px; 
                //     text-align: center;
                //     border-radius: 5px;
                //     margin-right: 10px;
                //     &:first-child {
                //         background: #678ee7;
                //         background-image: linear-gradient(180deg,#678ee7,#5078df);
                //         border: 1px solid #5c81e3; 
                //         color: #fff;
                //         opacity: 0.94;
                //         &:hover {
                //             opacity: 1;
                //         }
                //     }
                //     &:last-child {
                //         border: 1px solid #e1e1e1;
                //         color: #646464;
                //         background: #f9f9f9;
                //         background-image: linear-gradient(180deg,#fff,#f9f9f9);
                //         opacity: 0.9;
                //         &:hover {
                //             opacity: 1;
                //         }
                //     }

                // }
            }

            .ball {
                display: flex;
                width: 20px; 
                height: 20px; 
                border-radius: 50%; 
                background: red; 
                position: absolute; 
                justify-content: center;
                align-items: center;
                color: #fff;
                top: 370px; 
                right: 498px;
                z-index: 6;
            }
        }
    }

    .item-info {
        margin-top: 30px;
        h4.title {
            height: 60px; 
            line-height: 60px; 
            padding-left: 20px;
            font-size: 18px; 
            font-weight: normal;
            background: #f3f3f3; 
            background-image: linear-gradient(#fbfbfb,#ececec);
            border: 1px solid #d4d4d4;
            border-radius: 8px 8px 0 0;
        }
        .product-detail-img {
            img {
                width: 100%; 
                height: 100%;
            }
        }
    }
</style>