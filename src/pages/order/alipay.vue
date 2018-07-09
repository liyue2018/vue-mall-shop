<template>
    <div class="alipay">
        <h1 class="title">
            <img src="/static/images/alipay.png" alt="">
        </h1>
        <p>扫一扫千万 <strong>别</strong> 付钱啊</p>
        <h2 class="money">1.00</h2>
        <div class="alipay-img">
            <div class="code-img">
                <img src="static/images/ali.jpeg" alt="">
                <div class="qr-img">
                    <img src="static/images/qr.png" alt="">
                    <span>打开支付宝</span>
                    <span>扫一扫付款</span>
                </div>
            </div>
        </div>
        <a  href="https://mobile.alipay.com/index.htm" target="_blank" class="download-alipay">首次使用请下载手机支付宝</a>
        <countdown @time-end="message = '倒计时结束'" :endTime="endTime"></countdown>
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
    .alipay {
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
        .alipay-img {
            .code-img {
                width: 200px; 
                height: 266px;
                border: 1px solid #ddd; 
                border-radius: 5px; 
                padding: 10px;
                margin: 20px auto;
                img {
                    width: 180px; 
                    height: 180px; 
                }
                span {
                    display: inline-block; 
                    margin-top: 2px;
                }

            }
            .qr-img {
                width: 130px; 
                height: 50px;
                margin: 10px auto;
                color: #999;
                img {
                    width: 50px; 
                    height: 100%; 
                    float: left;
                }
            }
        }
        .download-alipay {
            color: #999; 
            text-decoration: underline;
            font-size: 12px;
            display: inline-block;
            margin: 10px 0;
        }
        .time-down {
            position: absolute;
            bottom: 100px;
            left: 50%;
            transform: translateX(-50%);
        }

    }
</style>
