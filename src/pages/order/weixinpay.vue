<template>
    <div class="wechat">
        <h1 class="title">
            <img src="static/images/weixinpay.png" alt="">
        </h1>
        <p>扫一扫千万 <strong>别</strong> 付钱啊</p>
        <h2 class="money">1.00</h2>
        <div class="wechat-img">
            <div class="code-img">
                <img src="static/images/weichat.png" alt="微信">
            </div>
            <div class="explain-img">
                <img src="static/images/wechat-explain.png" alt="">
            </div>
        </div>
        <countdown @time-end="message = '倒计时结束'" :endTime="endTime"></countdown>
        <!-- <div class="time-down">
            请于 01 分 18 秒 内支付
        </div> -->
    </div>
</template>

<script>
    import countdown from '../components/countdown.vue'
    export default {
        data: function() {
            return {
                message: '正在倒计时',
                endTime : '2018-08-08 10:06:00'
            }
        },
        components: {
            countdown
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss">
    .wechat {
        padding-bottom: 100px;
        h1.title {
            width: 160px; 
            height: 40px;
            margin: 0 auto;
            img {
                width: 160px; 
                height: 40px;
            }
        }
        .money {
            font-size: 30px; 
            font-weight: 700; 
            color: #d44d44;
        }
        .wechat-img {
            .code-img {
                width: 200px; 
                height: 200px;
                border: 1px solid #ddd; 
                border-radius: 5px; 
                padding: 10px;
                margin: 20px auto;
                img {
                    width: 180px; 
                    height: 180px; 
                }

            }
            .explain-img {
                width: 200px; 
                margin: 10px auto;
                img {
                    width: 200px; 
                    height: 60px; 
                }
            }
        }
        .time-down {
            position: absolute;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
        }
        

    }
</style>
