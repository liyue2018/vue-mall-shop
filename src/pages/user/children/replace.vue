<template>
    <panel :title="replaceTitle">
        <div slot="content" class="replace-content">
            <div class="">
                 <img src="/static/images/smile.png" alt="">
                <h2 class="tips">请问您拿什么和我换新</h2>
            </div>
        </div>
    </panel>
</template>

<script>
    import panel from '../../components/panel.vue'
    export default {
        data: function() {
            return {
                replaceTitle: '以旧换新'
            }
        },
        components: {
            panel
        }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .replace-content {
        height: 420px; 
        text-align: center; 
        padding: 40px 0;
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