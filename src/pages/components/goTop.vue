<template>

    <!--置顶按钮-->
    <input type="button" readonly="readonly" class="set-top" v-show="goTopShow" @click="goTop" />
</template>

<script>
    export default {
        name: "goTop",
        data () {
            return {
                scrollTop: '', // 滚动到顶部的距离
                goTopShow: false, // 按钮的显示标识
            }
        },
        methods: {
            handleScroll () {
                this.scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
                if (this.scrollTop > 500) {
                    this.goTopShow = true;
                }
            },
            goTop () {
                let timer = null, _this = this;
                cancelAnimationFrame(timer);
                timer = requestAnimationFrame(function fn() {
                    if (_this.scrollTop > 0) {
                        _this.scrollTop -= 50;
                        document.body.scrollTop = document.documentElement.scrollTop = _this.scrollTop;
                        timer = requestAnimationFrame(fn);
                    } else {
                        cancelAnimationFrame(timer);
                        _this.goTopShow = false;
                    }
                })
            }
        },
        mounted () {
            window.addEventListener("scroll", this.handleScroll);
        },
        destroyed () {
            window.removeEventListener("scroll", this.handleScroll);
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped media="screen">

    /*置顶按钮*/
    .set-top {
        width: 42px;
        height: 38px;
        border-radius: 3px;
        background: url(/static/images/set_top.png) center center no-repeat #48ABFF;
        box-shadow: 0 3px 8px rgba(0, 138, 255, 0.3);
        z-index: 2;
        position: fixed;
        bottom: 100px;
        right: 50px;
    }
</style>