<template>
    <div class="num-count">
        <button type="button" class="count-down" :class="{'down-disabled': downDisable}" @click="countDown" ref="down">-</button>
        <!-- <input type="text" class="num" v-model="productNum" readonly="readonly" :value="initcount" />{{ productNum }} -->
        <span class="num" v-model="productNum">{{ productNum }}</span>
        <button type="button" class="count-up" @click="countUp">+</button>
    </div>
</template>

<script>
    export default {
        data: function() {
            return {
                productNum: 1,
                downDisable: true
            }
        },
        created() {
            this.getInitCount();

        },
        methods: {
            countDown() {
                var down = this.$refs.down;
                if (this.productNum == 1) {
                    this.downDisable = 'true';
                    this.productNum = 1;

                } else {
                    if (this.downDisable) {
                        this.downDisable = !this.downDisable;
                    }
                    this.productNum --;
                }
            },
            countUp() {
                this.productNum ++;
                if (this.downDisable) {
                    this.downDisable = !this.downDisable;
                }
            },
            getInitCount() {
                this.productNum = this.initcount || 1;
            }
        },
        watch: {
            'productNum': function (newVal) {
                this.$emit('getcount', newVal);
                var goodsinfo = {
                        id: this.goodsId,
                        count: this.productNum
                }
                this.$store.commit('updateCarNum', goodsinfo)
            }
        },

        props: ['initcount','goodsId']
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.num-count {
        color: #8d8d8d; 
        width: 160px;
        position: relative;
        display: inline-block;
        span {
            width: 30px; 
            text-align: center; 
            display: inline-block;

        }
        button {
            width: 24px; 
            height: 24px; 
            display: inline-block;
            line-height: 0.8; 
            border-radius: 50%;
            box-shadow: 1px 1px 14px 1px rgba(0, 0, 0, 0.2);
            color: rgba(0,0,0,.7);
            font-size: 18px;
        }
        .down-disabled {
            cursor: not-allowed;
            opacity: 0.5;
        }
    }
</style>
