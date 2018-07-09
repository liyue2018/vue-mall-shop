<template>
    <panel :title="couponTitle">
        <div slot="content" class="coupon-content">
            <div class="no-coupon">
                <img src="static/images/no-search.png" alt="">
                <h2 class="discount">您目前还没有优惠券</h2>
            </div>
        </div>
    </panel>
</template>

<script>
    import panel from '../../components/panel.vue'
    export default {
        data: function() {
            return {
                couponTitle: '我的优惠'
            }
        },
        components: {
            panel
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .coupon-content {
        height: 420px; 
        .no-coupon {
            text-align: center; 
            padding: 40px 0;
            img {
                width: 320px; 
                height: 200px; 
                margin: 0 auto;
            }
            .discount {
                font-size: 22px; 
                color: #999; 
                margin-top: 20px;
            }
        }
    }
</style>