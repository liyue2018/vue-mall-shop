<template>
    <panel :title="supportTitle">
        <div slot="content" class="support-content">
            <div class="">
                <img src="/static/images/support.png" alt="">
                <h2 class="tips">如有疑问请联系邮箱 1059869380@qq.com</h2>
            </div>
        </div>
    </panel>
</template>

<script>
    import panel from '../../components/panel.vue'
    export default {
        data: function() {
            return {
                supportTitle: '售后服务'
            }
        },
        components: {
            panel
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .support-content {
        height: 420px; 
        text-align: center; 
        padding:40px 0;
        img {
            width: 200px; 
            height: 200px; 
            margin: 0 auto;
        }
        .tips {
            font-size: 22px; 
            color: #999; 
            margin-top: 20px;
        }
    }
</style>