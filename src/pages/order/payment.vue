<template>
    <div>
        <h1>提交订单成功,请选择支付方式</h1>
        <p class="tips">请在 24 小时内完成支付，超时订单将自动取消。</p>
        <p class="tips">我们不会在您完成支付后的 72 小时内发货，所以不要支付了</p>
        <div class="payment-way">
            <a href="javascript:;"  v-for="(item, i) in payMethodsList" @click.prevent="choicePayMethods (item, i)" :class="{ 'active': item.isActive }">
              <img :src="item.imgUrl" :alt="item.alt" />
            </a>
        </div>
    </div>
</template>

<script>
  export default {
    data: function() {
      return {
        selectedType: '',
        payMethodsList: [
          { id: 1, imgUrl: 'static/images/alipay.png', alt: '支付宝支付', isActive: true },
          { id: 2, imgUrl: 'static/images/qqpay.png', alt: ' qq支付', isActive: false },
          { id: 3, imgUrl: 'static/images/weixinpay.png', alt: '微信支付', isActive: false }
        ]
      }
    },
    methods: {
      choicePayMethods (item, i) {
        // 添加选中状态
        this.payMethodsList.forEach (payItem => {
          payItem.isActive = false
          if (payItem.id === item.id) {
            payItem.isActive = true
            return true
          }
        })
        // 给父组件传递选中的类型值
        switch(item.id) {
          case 1:
            this.selectedType = 1

            // 选中的状态保存到本地存储中 
            localStorage.setItem ('selectType', JSON.stringify (this.selectedType))
            this.$emit ('selectedtype', this.selectedType)
            break;
          case 2:
            this.selectedType = 2

            // 选中的状态保存到本地存储中 
            localStorage.setItem ('selectType', JSON.stringify(this.selectedType))
            this.$emit ('selectedtype', this.selectedType)
            break;
          case 3:
            this.selectedType = 3

            // 选中的状态保存到本地存储中 
            localStorage.setItem ('selectType', JSON.stringify(this.selectedType))
            this.$emit ('selectedtype', this.selectedType)
            break;
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .payment-way {
        height: 130px;
        margin: 50px auto; 
        a {
            display: inline-block; 
            width: 174px; 
            height: 50px; 
            line-height: 50px;
            text-align: center;
            margin: 0 10px;
            border: 1px solid #e5e5e5;
            border-radius: 5px;
            background: #fafafa;
            img {
                width: 144px; 
                height: 34px;
            }
        }
        a.active {
            border-color: #6a8fe5; 
            background: #fff;
        }
    }
</style>